import type { ComponentProps } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";

import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { useTranslation } from "@/features/localization/hooks/use-translation";
import { brandColors } from "@/theme/colors";

import { BusinessContactCard } from "../components/business-contact-card";
import { useBusinessSettings } from "../hooks/use-business-settings";
import { styles } from "./business-screen.styles";

const backIcon: ComponentProps<typeof SymbolView>["name"] = {
  ios: "chevron.left",
  android: "arrow_back",
  web: "arrow_back",
};

export function BusinessScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    businessSettings,
    isLoading,
    error,
    refreshBusinessSettings,
  } = useBusinessSettings();

  function handleBack() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/(tabs)/profile");
  }

  return (
    <SafeAreaScreen edges={["top", "left", "right"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("common.back")}
          onPress={handleBack}
          style={styles.backPressable}
        >
          {({ pressed }) => (
            <View
              style={[
                styles.backButton,
                pressed && styles.pressed,
              ]}
            >
              <SymbolView
                name={backIcon}
                size={17}
                tintColor={brandColors.white}
              />

              <Text style={styles.backButtonText}>
                {t("common.back")}
              </Text>
            </View>
          )}
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.title}>
            {t("business.title")}
          </Text>

          <Text style={styles.description}>
            {t("business.description")}
          </Text>
        </View>

        {isLoading && !businessSettings ? (
          <View style={styles.stateCard}>
            <ActivityIndicator
              color={brandColors.blue}
              size="small"
            />

            <Text style={styles.stateText}>
              {t("business.loading")}
            </Text>
          </View>
        ) : null}

        {!isLoading && error && !businessSettings ? (
          <View style={styles.stateCard}>
            <Text style={styles.errorTitle}>
              {t("business.loadError")}
            </Text>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("business.retry")}
              onPress={refreshBusinessSettings}
            >
              {({ pressed }) => (
                <View
                  style={[
                    styles.retryButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.retryButtonText}>
                    {t("business.retry")}
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
      </ScrollView>
    </SafeAreaScreen>
  );
}