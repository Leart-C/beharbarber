import { Alert, Text, View } from "react-native";
import * as Linking from "expo-linking";

import type { BusinessSettings } from "@/features/business/types/business-settings";
import { useTranslation } from "@/features/localization/hooks/use-translation";

import { BusinessContactRow } from "./business-contact-row";
import { styles } from "./business-contact-card.styles";

type BusinessContactCardProps = {
  businessSettings: BusinessSettings;
};

function createPhoneUrl(phone: string): string {
  const normalizedPhone = phone.replace(/[^\d+]/g, "");
  return `tel:${normalizedPhone}`;
}

function createLocationUrl(
  businessSettings: BusinessSettings,
): string | null {
  if (businessSettings.googleMapsUrl) {
    return businessSettings.googleMapsUrl;
  }

  if (businessSettings.address) {
    const query = encodeURIComponent(
      businessSettings.address,
    );

    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }

  return null;
}

function getInstagramDisplayValue(url: string): string {
  const username = url
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/\/+$/, "");

  return username ? `@${username}` : "Instagram";
}

export function BusinessContactCard({
  businessSettings,
}: BusinessContactCardProps) {
  const { t } = useTranslation();

  const locationUrl = createLocationUrl(businessSettings);

  const hasContactInformation = Boolean(
    locationUrl ||
      businessSettings.phone ||
      businessSettings.contactEmail ||
      businessSettings.instagramUrl,
  );

  function openUrl(url: string) {
    void Linking.openURL(url).catch(() => {
      Alert.alert(
        t("business.linkErrorTitle"),
        t("business.linkErrorMessage"),
      );
    });
  }

  const phone = businessSettings.phone;
  const contactEmail = businessSettings.contactEmail;
  const instagramUrl = businessSettings.instagramUrl;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.businessInitialContainer}>
          <Text style={styles.businessInitial}>
            {businessSettings.businessName
              .charAt(0)
              .toUpperCase()}
          </Text>
        </View>

        <View style={styles.businessInformation}>
          <Text numberOfLines={1} style={styles.businessName}>
            {businessSettings.businessName}
          </Text>

          <Text numberOfLines={1} style={styles.barberName}>
            {t("business.barber", {
              name: businessSettings.publicBarberName,
            })}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>
        {t("business.businessContact")}
      </Text>

      {hasContactInformation ? (
        <View style={styles.contactList}>
          {locationUrl ? (
            <BusinessContactRow
              icon={{
                ios: "mappin.and.ellipse",
                android: "location_on",
                web: "location_on",
              }}
              label={t("business.address")}
              value={
                businessSettings.address ??
                t("business.openLocation")
              }
              accessibilityLabel={t(
                "business.openContact",
                {
                  label: t("business.address"),
                  value:
                    businessSettings.address ??
                    t("business.openLocation"),
                },
              )}
              onPress={() => openUrl(locationUrl)}
            />
          ) : null}

          {phone ? (
            <BusinessContactRow
              icon={{
                ios: "phone.fill",
                android: "call",
                web: "call",
              }}
              label={t("business.phone")}
              value={phone}
              accessibilityLabel={t("business.openContact", {
                label: t("business.phone"),
                value: phone,
              })}
              onPress={() => openUrl(createPhoneUrl(phone))}
            />
          ) : null}

          {contactEmail ? (
            <BusinessContactRow
              icon={{
                ios: "envelope.fill",
                android: "mail",
                web: "mail",
              }}
              label={t("business.email")}
              value={contactEmail}
              accessibilityLabel={t("business.openContact", {
                label: t("business.email"),
                value: contactEmail,
              })}
              onPress={() => openUrl(`mailto:${contactEmail}`)}
            />
          ) : null}

          {instagramUrl ? (
            <BusinessContactRow
              icon={{
                ios: "camera.fill",
                android: "photo_camera",
                web: "photo_camera",
              }}
              label={t("business.instagram")}
              value={getInstagramDisplayValue(instagramUrl)}
              accessibilityLabel={t("business.openContact", {
                label: t("business.instagram"),
                value: getInstagramDisplayValue(instagramUrl),
              })}
              onPress={() => openUrl(instagramUrl)}
            />
          ) : null}
        </View>
      ) : (
        <Text style={styles.emptyText}>
          {t("business.noContactInformation")}
        </Text>
      )}
    </View>
  );
}
