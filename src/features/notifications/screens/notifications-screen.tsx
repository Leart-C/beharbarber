import { useAuth } from "@clerk/expo";
import { Redirect, router } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { useLanguage } from "@/features/localization/hooks/use-language";
import { useAuthenticatedApi } from "@/hooks/use-authenticated-api";
import { useFocusedQuery } from "@/hooks/use-focused-query";
import {
  getPreferences,
  savePreferences,
  type InboxNotification,
  type NotificationPreferences,
} from "../api/notifications-api";
import { useNotifications } from "../context/notifications-context";
import { useNotificationInbox } from "../hooks/use-notification-inbox";
import { styles } from "./notifications-screen.styles";

export function NotificationsScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />;
  return <SignedInNotificationsScreen />;
}
function SignedInNotificationsScreen() {
  const { language } = useLanguage();
  const english = language === "en";
  const { authenticatedRequest } = useAuthenticatedApi();
  const push = useNotifications();
  const inbox = useNotificationInbox();
  const query = useCallback(
    ({ signal }: { signal: AbortSignal }) =>
      getPreferences(authenticatedRequest, signal),
    [authenticatedRequest],
  );
  const preferences = useFocusedQuery(query);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  async function update(field: keyof NotificationPreferences, value: boolean) {
    if (!preferences.data || saving) return;
    setSaving(true);
    setSaveError(false);
    try {
      await savePreferences(authenticatedRequest, {
        ...preferences.data.preferences,
        [field]: value,
      });
      preferences.refresh();
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  }
  async function open(item: InboxNotification) {
    if (!(await inbox.read(item.id))) return;
    router.push(
      item.kind === "announcement" ? "/(tabs)" : "/(tabs)/appointments",
    );
  }
  const permissionText = {
    enabled: english
      ? "Notifications are enabled on this device."
      : "Njoftimet janë aktivizuar në këtë pajisje.",
    off: english
      ? "Get appointment updates on your lock screen."
      : "Merr përditësimet e termineve edhe kur telefoni është i kyçur.",
    denied: english
      ? "Allow notifications in your phone settings."
      : "Lejo njoftimet në cilësimet e telefonit.",
    unavailable: english
      ? "Push notifications are not available in this version yet. Your inbox still works."
      : "Njoftimet në telefon nuk janë ende të disponueshme në këtë version. Mesazhet shfaqen këtu.",
    error: english
      ? "Could not enable notifications. Please try again."
      : "Njoftimet nuk mund të aktivizoheshin. Provo përsëri.",
  };
  return (
    <SafeAreaScreen edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            router.canGoBack()
              ? router.back()
              : router.replace("/(tabs)/profile")
          }
        >
          <Text style={styles.link}>{english ? "Back" : "Kthehu"}</Text>
        </Pressable>
        <Text style={styles.title}>
          {english ? "Notifications" : "Njoftimet"}
        </Text>
        <View style={styles.card}>
          <Text style={styles.heading}>
            {english ? "Stay up to date" : "Qëndro i informuar"}
          </Text>
          <Text style={styles.body}>{permissionText[push.status]}</Text>
          {push.status !== "enabled" && push.status !== "unavailable" && (
            <Pressable
              accessibilityRole="button"
              disabled={push.busy}
              style={[styles.button, push.busy && styles.disabled]}
              onPress={() => {
                void (push.status === "denied"
                  ? Linking.openSettings()
                  : push.enable());
              }}
            >
              <Text style={styles.buttonText}>
                {push.busy
                  ? english
                    ? "Enabling…"
                    : "Duke aktivizuar…"
                  : push.status === "denied"
                    ? english
                      ? "Open settings"
                      : "Hap cilësimet"
                    : english
                      ? "Enable notifications"
                      : "Aktivizo njoftimet"}
              </Text>
            </Pressable>
          )}
          {(["reminders", "announcements"] as const).map((field) => (
            <View style={styles.row} key={field}>
              <View style={styles.rowText}>
                <Text style={styles.heading}>
                  {field === "reminders"
                    ? english
                      ? "Appointment reminders"
                      : "Kujtesat e termineve"
                    : english
                      ? "Shop announcements"
                      : "Njoftimet e dyqanit"}
                </Text>
                {field === "reminders" && (
                  <Text style={styles.body}>
                    {english
                      ? "Two hours before your appointment"
                      : "Dy orë para terminit"}
                  </Text>
                )}
              </View>
              <Switch
                accessibilityLabel={
                  field === "reminders"
                    ? english
                      ? "Appointment reminders"
                      : "Kujtesat e termineve"
                    : english
                      ? "Shop announcements"
                      : "Njoftimet e dyqanit"
                }
                value={preferences.data?.preferences[field] ?? false}
                disabled={!preferences.data || saving || preferences.isLoading}
                onValueChange={(value) => {
                  void update(field, value);
                }}
                trackColor={{ true: "#4F83E1" }}
              />
            </View>
          ))}
          {(saveError || preferences.error) && (
            <Text accessibilityRole="alert" style={styles.error}>
              {english
                ? "Could not save or load preferences. Try again."
                : "Cilësimet nuk mund të ruhen ose ngarkohen. Provo përsëri."}
            </Text>
          )}
        </View>
        <View style={styles.row}>
          <Text style={styles.heading}>
            {english ? "Your inbox" : "Mesazhet e tua"}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              inbox.refresh();
              preferences.refresh();
            }}
          >
            <Text style={styles.link}>{english ? "Refresh" : "Përditëso"}</Text>
          </Pressable>
        </View>
        {inbox.isLoading && <ActivityIndicator color="#4F83E1" />}
        {(inbox.error || inbox.actionError) && (
          <Text accessibilityRole="alert" style={styles.error}>
            {english
              ? "Notifications could not be updated. Try again."
              : "Njoftimet nuk mund të përditësohen. Provo përsëri."}
          </Text>
        )}
        {!inbox.isLoading &&
          !inbox.error &&
          inbox.notifications.length === 0 && (
            <Text style={styles.body}>
              {english
                ? "You're all caught up. Appointment updates will appear here."
                : "Nuk ke njoftime të reja. Përditësimet e termineve do të shfaqen këtu."}
            </Text>
          )}
        {inbox.notifications.map((item) => (
          <Pressable
            key={item.id}
            accessibilityRole="button"
            style={[styles.card, !item.readAt && styles.unread]}
            onPress={() => {
              void open(item);
            }}
          >
            <Text style={styles.heading}>
              {!item.readAt ? "• " : ""}
              {item.title}
            </Text>
            <Text style={styles.body}>{item.body}</Text>
            <Text style={styles.date}>
              {new Date(item.createdAt).toLocaleString(
                english ? "en-GB" : "sq-AL",
              )}
            </Text>
          </Pressable>
        ))}
        {inbox.hasMore && (
          <Pressable
            accessibilityRole="button"
            disabled={inbox.loadingMore}
            onPress={() => {
              void inbox.loadMore();
            }}
          >
            <Text style={styles.link}>
              {inbox.loadingMore
                ? "…"
                : english
                  ? "Load older notifications"
                  : "Shfaq njoftimet më të vjetra"}
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaScreen>
  );
}
