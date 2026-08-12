import { LegalScreen } from "@/features/legal/screens/legal-screen";
import { useTranslation } from "@/features/localization/hooks/use-translation";

export default function TermsPage() {
  const { t } = useTranslation();

  return (
    <LegalScreen
      title={t("legal.termsTitle")}
      description={t("legal.termsDescription")}
      sections={[
        {
          title: t("legal.bookingTitle"),
          body: t("legal.bookingBody"),
        },
        {
          title: t("legal.cancellationTitle"),
          body: t("legal.cancellationBody"),
        },
        {
          title: t("legal.availabilityTitle"),
          body: t("legal.availabilityBody"),
        },
        {
          title: t("legal.responsibleUseTitle"),
          body: t("legal.responsibleUseBody"),
        },
      ]}
    />
  );
}