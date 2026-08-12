import Constants from "expo-constants";
import {
  Text,
  View,
} from "react-native";

import { useTranslation } from "@/features/localization/hooks/use-translation";

import { ProfileMenuRow } from "./profile-menu-row";
import { styles } from "./profile-information-card.styles";

type ProfileInformationCardProps = {
  onOpenShop: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
};

export function ProfileInformationCard({
  onOpenShop,
  onOpenPrivacy,
  onOpenTerms,
}: ProfileInformationCardProps) {
  const { t } = useTranslation();

  const appVersion =
    Constants.expoConfig?.version ?? "1.0.0";

  return (
    <View>
      <Text style={styles.sectionTitle}>
        {t("profile.information")}
      </Text>

      <View style={styles.container}>
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
          onPress={onOpenShop}
        />

        <ProfileMenuRow
          icon={{
            ios: "hand.raised.fill",
            android: "privacy_tip",
            web: "privacy_tip",
          }}
          label={t("profile.privacy")}
          showChevron
          onPress={onOpenPrivacy}
        />

        <ProfileMenuRow
          icon={{
            ios: "doc.text.fill",
            android: "description",
            web: "description",
          }}
          label={t("profile.terms")}
          showChevron
          onPress={onOpenTerms}
        />

        <ProfileMenuRow
          icon={{
            ios: "info.circle.fill",
            android: "info",
            web: "info",
          }}
          label={t("profile.appVersion")}
          value={appVersion}
        />
      </View>
    </View>
  );
}