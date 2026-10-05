import { useAuth } from "@clerk/expo";
import { router, useRootNavigationState } from "expo-router";
import { AppState, Platform } from "react-native";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { useAuthenticatedApi } from "@/hooks/use-authenticated-api";
import { useLanguage } from "@/features/localization/hooks/use-language";
import { useAppointments } from "@/features/appointments/hooks/use-appointments";
import {
  getInstallationId,
  getNativeNotifications,
  getPushProjectId,
  permitsNotifications,
  saveInstallationId,
} from "../utils/native-notifications";
import { ownNotificationId } from "../utils/notification-target";

type PushStatus = "off" | "enabled" | "denied" | "unavailable" | "error";
type NotificationContext = {
  status: PushStatus;
  busy: boolean;
  revision: number;
  enable: () => Promise<void>;
  prepareSignOut: () => Promise<void>;
  cancelSignOut: () => Promise<void>;
};
const Context = createContext<NotificationContext | null>(null);

export function NotificationsProvider({ children }: PropsWithChildren) {
  const { userId, isSignedIn } = useAuth();
  const { authenticatedRequest } = useAuthenticatedApi();
  const { language } = useLanguage();
  const { refreshAppointments } = useAppointments();
  const navigation = useRootNavigationState();
  const [status, setStatus] = useState<PushStatus>("off");
  const [busy, setBusy] = useState(false);
  const [revision, setRevision] = useState(0);
  const current = useRef<AbortController | null>(null);
  const stopping = useRef(false);

  const register = useCallback(
    async (prompt: boolean) => {
      if (!isSignedIn || stopping.current) return;
      current.current?.abort();
      const controller = new AbortController();
      current.current = controller;
      try {
        const notifications = await getNativeNotifications();
        if (controller.signal.aborted) return;
        setBusy(true);
        const projectId = getPushProjectId();
        if (!notifications || !projectId) {
          if (!controller.signal.aborted) setStatus("unavailable");
          return;
        }
        if (Platform.OS === "android")
          await notifications.setNotificationChannelAsync("appointments", {
            name: "Appointments",
            importance: notifications.AndroidImportance.HIGH,
          });
        let permission = await notifications.getPermissionsAsync();
        if (
          prompt &&
          permission.canAskAgain &&
          !permitsNotifications(permission)
        ) {
          permission = await notifications.requestPermissionsAsync({
            ios: { allowAlert: true, allowSound: true, allowBadge: true },
          });
        }
        if (controller.signal.aborted) return;
        if (!permitsNotifications(permission)) {
          setStatus(permission.canAskAgain ? "off" : "denied");
          const installationId = await getInstallationId();
          await authenticatedRequest("/api/v1/notifications/devices", {
            method: "DELETE",
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ installationId }),
          });
          return;
        }
        const token = (await notifications.getExpoPushTokenAsync({ projectId }))
          .data;
        if (controller.signal.aborted) return;
        const installationId = await getInstallationId();
        const registered = await authenticatedRequest<{
          installationId: string;
        }>("/api/v1/notifications/devices", {
          method: "PUT",
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ installationId, token, language }),
        });
        if (controller.signal.aborted) return;
        await saveInstallationId(registered.installationId);
        setStatus("enabled");
      } catch {
        if (!controller.signal.aborted) setStatus("error");
      } finally {
        if (!controller.signal.aborted) setBusy(false);
      }
    },
    [authenticatedRequest, isSignedIn, language],
  );

  useEffect(() => {
    let disposed = false;
    // Defer the initial registration until the provider has finished mounting.
    void Promise.resolve().then(() => {
      if (!disposed) void register(false);
    });
    const listener = AppState.addEventListener("change", (state) => {
      if (state === "active") void register(false);
    });
    return () => {
      disposed = true;
      listener.remove();
      current.current?.abort();
    };
  }, [register]);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    void getNativeNotifications()
      .then((notifications) => {
        if (!notifications || disposed) return;
        notifications.setNotificationHandler({
          handleNotification: async (notification) => {
            const own = Boolean(
              ownNotificationId(notification.request.content.data, userId),
            );
            return {
              shouldShowBanner: own,
              shouldShowList: own,
              shouldPlaySound: own,
              shouldSetBadge: false,
            };
          },
        });
        function onResponse(
          response: import("expo-notifications").NotificationResponse,
        ) {
          if (!userId || !navigation?.key) return;
          const own = ownNotificationId(
            response.notification.request.content.data,
            userId,
          );
          if (own) {
            refreshAppointments();
            setRevision((value) => value + 1);
            router.push("/notifications");
          }
          notifications!.clearLastNotificationResponse();
        }
        const received = notifications.addNotificationReceivedListener(
          (notification) => {
            if (ownNotificationId(notification.request.content.data, userId)) {
              refreshAppointments();
              setRevision((value) => value + 1);
            }
          },
        );
        const response =
          notifications.addNotificationResponseReceivedListener(onResponse);
        const token = notifications.addPushTokenListener(() => {
          void register(false);
        });
        const last = notifications.getLastNotificationResponse();
        if (last) onResponse(last);
        cleanup = () => {
          received.remove();
          response.remove();
          token.remove();
          notifications.setNotificationHandler(null);
        };
      })
      .catch(() => {
        /* The inbox remains usable before a native rebuild. */
      });
    return () => {
      disposed = true;
      cleanup();
    };
  }, [navigation?.key, refreshAppointments, register, userId]);

  const prepareSignOut = useCallback(async () => {
    stopping.current = true;
    current.current?.abort();
    try {
      if (Platform.OS !== "web") {
        const installationId = await getInstallationId();
        await authenticatedRequest("/api/v1/notifications/devices", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ installationId }),
          signal: AbortSignal.timeout(5000),
        });
      }
    } finally {
      const notifications = await getNativeNotifications();
      await notifications?.dismissAllNotificationsAsync();
      notifications?.clearLastNotificationResponse();
    }
  }, [authenticatedRequest]);

  return (
    <Context.Provider
      value={{
        status,
        busy,
        revision,
        enable: () => register(true),
        prepareSignOut,
        cancelSignOut: async () => {
          stopping.current = false;
          await register(false);
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useNotifications() {
  const value = useContext(Context);
  if (!value) throw new Error("NotificationsProvider is missing");
  return value;
}
