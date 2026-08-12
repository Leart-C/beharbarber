import type { ComponentProps } from "react";
import {
  Text,
  View,
} from "react-native";
import { SymbolView } from "expo-symbols";

import { LanguageToggle } from "@/features/localization/components/language-toggle";
import { useLanguage } from "@/features/localization/hooks/use-language";
import { useTranslation } from "@/features/localization/hooks/use-translation";

import { ProfileMenuRow } from "./profile-menu-row";
import { styles } from "./profile-settings-card.styles";

const languageIcon: ComponentProps<
  typeof SymbolView
>["name"] = {
  ios: "globe",
  android: "language",
  web: "language",
};

export function ProfileSettingsCard() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <View>
      <Text style={styles.sectionTitle}>
        {t("profile.preferences")}
      </Text>

      <View style={styles.container}>
        <ProfileMenuRow
          icon={languageIcon}
          label={t("profile.language")}
          trailingContent={
            <LanguageToggle
              value={language}
              onChange={setLanguage}
            />
          }
        />
      </View>
    </View>
  );
}