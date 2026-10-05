import { act, renderHook } from "@testing-library/react-native";
import {
  NotificationsProvider,
  useNotifications,
} from "../context/notifications-context";
import { deferred } from "@/test-support/deferred";

const mockRequest = jest.fn();
const mockRefresh = jest.fn();
const mockPush = jest.fn();
const mockClear = jest.fn();
const mockPermission = jest.fn();
const mockRequestPermission = jest.fn();
const mockToken = jest.fn();
const mockRemove = jest.fn();
let mockProjectId: string | undefined = "project-one";
let mockReceived: (value: unknown) => void;
let mockResponse: (value: unknown) => void;
let mockHandler: { handleNotification: (value: unknown) => Promise<unknown> };
jest.mock("@clerk/expo", () => ({
  useAuth: () => ({ userId: "user-one", isSignedIn: true }),
}));
jest.mock("expo-router", () => ({
  router: { push: (path: string) => mockPush(path) },
  useRootNavigationState: () => ({ key: "ready" }),
}));
jest.mock("@/hooks/use-authenticated-api", () => ({
  useAuthenticatedApi: () => ({ authenticatedRequest: mockRequest }),
}));
jest.mock("@/features/localization/hooks/use-language", () => ({
  useLanguage: () => ({ language: "en" }),
}));
jest.mock("@/features/appointments/hooks/use-appointments", () => ({
  useAppointments: () => ({ refreshAppointments: mockRefresh }),
}));
jest.mock("../utils/native-notifications", () => ({
  getPushProjectId: () => mockProjectId,
  getInstallationId: async () => "installation-one",
  saveInstallationId: jest.fn(),
  permitsNotifications: (permission: { granted: boolean }) =>
    permission.granted,
  getNativeNotifications: async () => ({
    getPermissionsAsync: () => mockPermission(),
    requestPermissionsAsync: () => mockRequestPermission(),
    getExpoPushTokenAsync: () => mockToken(),
    setNotificationHandler: (value: typeof mockHandler) => {
      mockHandler = value;
    },
    addNotificationReceivedListener: (callback: typeof mockReceived) => {
      mockReceived = callback;
      return { remove: mockRemove };
    },
    addNotificationResponseReceivedListener: (
      callback: typeof mockResponse,
    ) => {
      mockResponse = callback;
      return { remove: mockRemove };
    },
    addPushTokenListener: () => ({ remove: mockRemove }),
    getLastNotificationResponse: () => null,
    clearLastNotificationResponse: mockClear,
    dismissAllNotificationsAsync: async () => {},
  }),
}));
const id = "00000000-0000-4000-8000-000000000001";
const notification = (recipientId: string) => ({
  request: { content: { data: { recipientId, notificationId: id } } },
});
beforeEach(() => {
  jest.clearAllMocks();
  mockProjectId = "project-one";
  mockPermission.mockResolvedValue({ granted: true, canAskAgain: true });
  mockToken.mockResolvedValue({ data: "ExpoPushToken[test]" });
  mockRequest.mockResolvedValue({ installationId: "installation-one" });
});

it("registers a permitted device to the authenticated API and refreshes only its user's notifications", async () => {
  const { result, unmount } = await renderHook(useNotifications, {
    wrapper: NotificationsProvider,
  });
  expect(result.current.status).toBe("enabled");
  const body = JSON.parse(mockRequest.mock.calls[0][1].body);
  expect(body).toEqual({
    installationId: "installation-one",
    token: "ExpoPushToken[test]",
    language: "en",
  });
  await act(() => mockReceived(notification("someone-else")));
  expect(mockRefresh).not.toHaveBeenCalled();
  await act(() => mockReceived(notification("user-one")));
  expect(mockRefresh).toHaveBeenCalledTimes(1);
  await act(() => mockResponse({ notification: notification("user-one") }));
  expect(mockPush).toHaveBeenCalledWith("/notifications");
  const foreign = await mockHandler.handleNotification(
    notification("someone-else"),
  );
  expect(foreign).toMatchObject({
    shouldShowBanner: false,
    shouldPlaySound: false,
  });
  await unmount();
  expect(mockRemove).toHaveBeenCalled();
  expect(mockHandler).toBeNull();
});
it("does not prompt automatically and requests permission only after Enable", async () => {
  mockPermission.mockResolvedValue({ granted: false, canAskAgain: true });
  mockRequestPermission.mockResolvedValue({ granted: true, canAskAgain: true });
  const { result } = await renderHook(useNotifications, {
    wrapper: NotificationsProvider,
  });
  expect(mockRequestPermission).not.toHaveBeenCalled();
  expect(result.current.status).toBe("off");
  await act(() => result.current.enable());
  expect(mockRequestPermission).toHaveBeenCalledTimes(1);
  expect(result.current.status).toBe("enabled");
});
it("keeps the inbox usable before the Expo project is configured", async () => {
  mockProjectId = undefined;
  const { result } = await renderHook(useNotifications, {
    wrapper: NotificationsProvider,
  });
  expect(result.current.status).toBe("unavailable");
  expect(mockToken).not.toHaveBeenCalled();
});
it("aborts pending registration and disables the device before sign-out", async () => {
  const pending = deferred<{ installationId: string }>();
  mockRequest.mockReturnValueOnce(pending.promise);
  const { result } = await renderHook(useNotifications, {
    wrapper: NotificationsProvider,
  });
  await act(() => result.current.prepareSignOut());
  expect(mockRequest.mock.calls[0][1].signal.aborted).toBe(true);
  expect(mockRequest.mock.calls[1][1].method).toBe("DELETE");
  await act(() => pending.resolve({ installationId: "installation-one" }));
  expect(result.current.status).not.toBe("enabled");
  expect(mockClear).toHaveBeenCalled();
  await act(() => result.current.cancelSignOut());
  expect(mockRequest.mock.calls[2][1].method).toBe("PUT");
  expect(result.current.status).toBe("enabled");
});
