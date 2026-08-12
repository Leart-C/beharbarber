import { useClerk } from "@clerk/expo";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { useBusinessSettings } from "@/features/business/hooks/use-business-settings";
import { useTranslation } from "@/features/localization/hooks/use-translation";
import { brandColors } from "@/theme/colors";

import { BusinessContactCard } from "@/features/business/components/business-contact-card";
import { styles } from "./profile-screen.styles";

export function ProfileScreen() {
  const { signOut } = useClerk();
  const { t } = useTranslation();

  const {
    businessSettings,
    isLoading,
    error,
    refreshBusinessSettings,
  } = useBusinessSettings();

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

        {isLoading && !businessSettings ? (
          <View style={styles.stateCard}>
            <ActivityIndicator
              color={brandColors.blue}
              size="small"
            />

            <Text style={styles.stateText}>
              {t("profile.businessLoading")}
            </Text>
          </View>
        ) : null}

        {!isLoading && error && !businessSettings ? (
          <View style={styles.stateCard}>
            <Text style={styles.errorTitle}>
              {t("profile.businessLoadError")}
            </Text>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("profile.retry")}
              onPress={refreshBusinessSettings}
            >
              {({ pressed }) => (
                <View
                  style={[
                    styles.retryButton,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <Text style={styles.retryButtonText}>
                    {t("profile.retry")}
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        ) : null}

        {businessSettings ? (
          <BusinessContactCard
            businessSettings={businessSettings}
          />
        ) : null}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("profile.signOut")}
          onPress={() => void signOut()}
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
      </ScrollView>
    </SafeAreaScreen>
  );
}