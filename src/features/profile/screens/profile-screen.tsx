import { useClerk, useUser } from "@clerk/expo";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { useTranslation } from "@/features/localization/hooks/use-translation";

import { useNotifications } from "@/features/notifications/context/notifications-context";
import { ProfileAccountCard } from "../components/profile-account-card";
import { ProfileInformationCard } from "../components/profile-information-card";
import { ProfileSettingsCard } from "../components/profile-settings-card";
import { styles } from "./profile-screen.styles";

export function ProfileScreen() {
  const { signOut } = useClerk();
  const { prepareSignOut, cancelSignOut } = useNotifications();
  const { user, isLoaded } = useUser();
  const { t, language } = useTranslation();
  const [signingOut, setSigningOut] = useState(false);

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
        </View>
      </ScrollView>
    </SafeAreaScreen>
  );
}
