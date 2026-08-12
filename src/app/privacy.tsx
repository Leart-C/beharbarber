import { LegalScreen } from "@/features/legal/screens/legal-screen";
import { useTranslation } from "@/features/localization/hooks/use-translation";

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <LegalScreen
      title={t("legal.privacyTitle")}
      description={t("legal.privacyDescription")}
      sections={[
        {
          title: t("legal.dataCollectedTitle"),
          body: t("legal.dataCollectedBody"),
        },
        {
          title: t("legal.dataUsageTitle"),
          body: t("legal.dataUsageBody"),
        },
        {
          title: t("legal.dataProtectionTitle"),
          body: t("legal.dataProtectionBody"),
        },
        {
          title: t("legal.userChoicesTitle"),
          body: t("legal.userChoicesBody"),
        },
      ]}
    />
  );
}