import type { ComponentProps } from "react";
import {
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

import { styles } from "./legal-screen.styles";

type LegalSection = {
  title: string;
  body: string;
};

type LegalScreenProps = {
  title: string;
  description: string;
  sections: LegalSection[];
};

const backIcon: ComponentProps<
  typeof SymbolView
>["name"] = {
  ios: "chevron.left",
  android: "arrow_back",
  web: "arrow_back",
};

export function LegalScreen({
  title,
  description,
  sections,
}: LegalScreenProps) {
  const router = useRouter();
  const { t } = useTranslation();

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
            {title}
          </Text>

          <Text style={styles.description}>
            {description}
          </Text>
        </View>

        <View style={styles.card}>
          {sections.map((section, index) => (
            <View
              key={section.title}
              style={[
                styles.section,
                index < sections.length - 1 &&
                  styles.sectionWithDivider,
              ]}
            >
              <Text style={styles.sectionTitle}>
                {section.title}
              </Text>

              <Text style={styles.sectionBody}>
                {section.body}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaScreen>
  );
}