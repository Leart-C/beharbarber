import { requireOptionalNativeModule } from "expo";
import { Platform } from "react-native";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { randomUUID } from "expo-crypto";

export type NativeNotifications = typeof import("expo-notifications");
export async function getNativeNotifications(): Promise<NativeNotifications | null> {
  if (
    Platform.OS === "web" ||
    !requireOptionalNativeModule("ExpoPushTokenManager")
  )
    return null;
  return import("expo-notifications");
}
export function getPushProjectId(): string | undefined {
  return (
    Constants.easConfig?.projectId ??
    Constants.expoConfig?.extra?.eas?.projectId
  );
}
export function permitsNotifications(permission: {
  granted: boolean;
  ios?: { status: number };
}) {
  // iOS authorized, provisional, or ephemeral permissions can receive notifications.
  return permission.granted || [2, 3, 4].includes(permission.ios?.status ?? -1);
}
const installationKey = "behar.push-installation";
export async function getInstallationId() {
  const stored = await SecureStore.getItemAsync(installationKey);
  if (stored) return stored;
  const id = randomUUID();
  await SecureStore.setItemAsync(installationKey, id);
  return id;
}
export async function saveInstallationId(id: string) {
  await SecureStore.setItemAsync(installationKey, id);
}
