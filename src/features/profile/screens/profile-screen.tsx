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
import { ProfileMenuRow } from "../components/profile-menu-row";
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

          <View>
            <Text style={styles.sectionTitle}>
              {t("profile.information")}
            </Text>

            <View style={styles.menuCard}>
              <ProfileMenuRow
                icon={{
                  ios: "storefront",
                  android: "storefront",
                  web: "storefront",
                }}
                label={t("profile.aboutShop")}
                value={t("profile.aboutShopDescription")}
                accessibilityLabel={t(
                  "profile.openAboutShop",
                )}
                showChevron
                onPress={openShop}
              />
            </View>
          </View>

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