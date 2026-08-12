import { useClerk, useUser } from "@clerk/expo";
import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { useTranslation } from "@/features/localization/hooks/use-translation";

import { ProfileAccountCard } from "../components/profile-account-card";
import { ProfileInformationCard } from "../components/profile-information-card";
import { ProfileSettingsCard } from "../components/profile-settings-card";
import { styles } from "./profile-screen.styles";

export function ProfileScreen() {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const { t } = useTranslation();

  if (!isLoaded || !user) {
    return null;
  }

  const customerName =
    user.fullName ??
    user.firstName ??
    t("profile.customer");

  const customerEmail =
    user.primaryEmailAddress?.emailAddress ??
    t("profile.emailUnavailable");

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
    void signOut();
  }

  return (
    <SafeAreaScreen edges={["top", "left", "right"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View>
          <Text style={styles.title}>
            {t("profile.title")}
          </Text>

          <Text style={styles.description}>
            {t("profile.description")}
          </Text>
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
            style={styles.signOutPressable}
          >
            {({ pressed }) => (
              <View
                style={[
                  styles.signOutButton,
                  pressed && styles.buttonPressed,
                ]}
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