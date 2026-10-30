import { useClerk, useUser } from "@clerk/expo";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import { ConfirmationDialog } from "@/components/feedback/confirmation-dialog";
import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { useTranslation } from "@/features/localization/hooks/use-translation";
import { useAuthenticatedApi } from "@/hooks/use-authenticated-api";

import { useNotifications } from "@/features/notifications/context/notifications-context";
import { deleteAccount } from "../api/delete-account";
import { ProfileAccountCard } from "../components/profile-account-card";
import { ProfileInformationCard } from "../components/profile-information-card";
import { ProfileSettingsCard } from "../components/profile-settings-card";
import { styles } from "./profile-screen.styles";

export function ProfileScreen() {
  const { signOut } = useClerk();
  const { prepareSignOut, cancelSignOut } = useNotifications();
  const { user, isLoaded } = useUser();
  const { t, language } = useTranslation();
  const { authenticatedRequest } = useAuthenticatedApi();
  const [signingOut, setSigningOut] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  if (!isLoaded || !user) {
    return null;
  }

  const customerName = user.fullName ?? user.firstName ?? t("profile.customer");

  const customerEmail =
    user.primaryEmailAddress?.emailAddress ?? t("profile.emailUnavailable");

  function openShop() {
    router.push("/shop");
  }

  function openPrivacy() {
    router.push("/privacy");
  }

  function openTerms() {
    router.push("/terms");
  }

  function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    void prepareSignOut()
      .catch(() => {
        /* Clerk session revocation also disables worker delivery. */
      })
      .then(() => signOut())
      .catch(() => {
        setSigningOut(false);
        void cancelSignOut();
        Alert.alert(
          t("profile.signOut"),
          language === "en"
            ? "Could not sign out. Please try again."
            : "Dalja nga llogaria dështoi. Provo përsëri.",
        );
      });
  }

  async function handleDeleteAccount() {
    if (deletingAccount) return;
    setDeletingAccount(true);

    try {
      await deleteAccount({ authenticatedRequest });
    } catch {
      setDeletingAccount(false);
      setDeleteDialogVisible(false);
      Alert.alert(t("profile.deleteAccount"), t("profile.deleteAccountFailed"));
      return;
    }

    // The account no longer exists on the server, so these only clear local
    // state; failures here must not keep the person signed in.
    await prepareSignOut().catch(() => undefined);
    await signOut().catch(() => undefined);
    setDeleteDialogVisible(false);
    setDeletingAccount(false);
  }

  return (
    <SafeAreaScreen edges={["top", "left", "right"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View>
          <Text style={styles.title}>{t("profile.title")}</Text>

          <Text style={styles.description}>{t("profile.description")}</Text>
        </View>

        <View style={styles.sections}>
          <ProfileAccountCard
            name={customerName}
            email={customerEmail}
            imageUrl={user.imageUrl}
          />

          <ProfileSettingsCard />

          <ProfileInformationCard
            onOpenShop={openShop}
            onOpenPrivacy={openPrivacy}
            onOpenTerms={openTerms}
          />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("profile.signOut")}
            onPress={handleSignOut}
            disabled={signingOut}
            style={styles.signOutPressable}
          >
            {({ pressed }) => (
              <View
                style={[styles.signOutButton, pressed && styles.buttonPressed]}
              >
                <Text style={styles.signOutButtonText}>
                  {t("profile.signOut")}
                </Text>
              </View>
            )}
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("profile.deleteAccount")}
            onPress={() => setDeleteDialogVisible(true)}
            disabled={signingOut || deletingAccount}
            style={({ pressed }) => [
              styles.deleteAccountButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.deleteAccountButtonText}>
              {t("profile.deleteAccount")}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <ConfirmationDialog
        visible={deleteDialogVisible}
        variant="destructive"
        title={t("profile.deleteAccountTitle")}
        message={t("profile.deleteAccountMessage")}
        confirmLabel={t("profile.deleteAccountConfirm")}
        cancelLabel={t("common.cancel")}
        isLoading={deletingAccount}
        onConfirm={() => void handleDeleteAccount()}
        onCancel={() => setDeleteDialogVisible(false)}
      />
    </SafeAreaScreen>
  );
}
