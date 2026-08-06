import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";

import { ConfirmationDialog } from "@/components/feedback/confirmation-dialog";
import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { useCurrentAnnouncement } from "@/features/announcements/hooks/use-current-announcement";
import { UpcomingAppointmentCard } from "@/features/appointments/components/upcoming-appointment-card";
import { useAppointments } from "@/features/appointments/hooks/use-appointments";
import { useNextAppointment } from "@/features/appointments/hooks/use-next-appointment";
import type { Appointment } from "@/features/appointments/types/appointment";
import { useTranslation } from "@/features/localization/hooks/use-translation";
import { ServiceCategorySelector } from "@/features/services/components/service-category-selector";
import { ServiceList } from "@/features/services/components/service-list";
import { useServices } from "@/features/services/hooks/use-services";
import type { ServiceCategoryId } from "@/features/services/types/service-category";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";

import { BarberAlert } from "../components/barber-alert";
import { HomeHeader } from "../components/home-header";
import { LanguageToggle } from "../components/language-toggle";
import { styles } from "./home-screen.styles";

export function HomeScreen() {
  const {
    cancelAppointment,
    cancellingAppointmentId,
  } = useAppointments();

  const nextAppointment = useNextAppointment();
  const { announcement } = useCurrentAnnouncement();
  const { language, serviceName, setLanguage, t } = useTranslation();

  const {
    categories,
    services,
    isLoading: areServicesLoading,
    error: servicesError,
  } = useServices();

  const [appointmentToCancel, setAppointmentToCancel] =
    useState<Appointment | null>(null);
  const [dismissedAnnouncementId, setDismissedAnnouncementId] =
    useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<ServiceCategoryId>("haircut");

  const isCancelling =
    appointmentToCancel?.id === cancellingAppointmentId;

  const {
    scrollViewRef: homeScrollViewRef,
    handleSectionLayout: handleServiceListLayout,
    scrollToSection: scrollToServiceList,
  } = useScrollToSection({
    offset: 20,
  });

  const announcementMessage = announcement
    ? language === "en"
      ? announcement.messageEn ?? announcement.messageSq
      : announcement.messageSq
    : null;

  const shouldShowAnnouncement =
    announcement !== null &&
    announcement.id !== dismissedAnnouncementId;

  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId,
  );

  const filteredServices = services.filter(
    (service) =>
      service.categoryId === selectedCategoryId,
  );

  const handleEditAppointment = () => {
    Alert.alert(
      t("home.editAppointmentTitle"),
      t("home.editAppointmentMessage"),
    );
  };

  const handleSelectCategory = (
    categoryId: ServiceCategoryId,
  ) => {
    setSelectedCategoryId(categoryId);
    scrollToServiceList();
  };

  const handleConfirmCancellation = async () => {
    if (!appointmentToCancel || isCancelling) {
      return;
    }

    try {
      await cancelAppointment(appointmentToCancel.id);
      setAppointmentToCancel(null);
    } catch (error) {
      console.error(
        "Appointment cancellation failed:",
        error,
      );

      Alert.alert(
        t("home.cancellationFailedTitle"),
        t("home.cancellationFailedMessage"),
      );
    }
  };

  return (
    <SafeAreaScreen
      edges={["left", "right"]}
      className="bg-background"
    >
      <ScrollView
        ref={homeScrollViewRef}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
      >
        <HomeHeader
          rightAccessory={
            <LanguageToggle
              value={language}
              onChange={setLanguage}
            />
          }
        />

        <View style={styles.content}>
          {shouldShowAnnouncement &&
          announcementMessage ? (
            <BarberAlert
              message={announcementMessage}
              onDismiss={() =>
                setDismissedAnnouncementId(
                  announcement.id,
                )
              }
            />
          ) : null}

          {nextAppointment ? (
            <UpcomingAppointmentCard
              appointment={nextAppointment}
              onEdit={handleEditAppointment}
              onCancel={() =>
                setAppointmentToCancel(
                  nextAppointment,
                )
              }
            />
          ) : null}

          {areServicesLoading ? (
            <View style={styles.serviceState}>
              <ActivityIndicator color="#4E84E5" />

              <Text style={styles.serviceStateText}>
                {t("home.loadingServices")}
              </Text>
            </View>
          ) : servicesError ? (
            <View style={styles.serviceState}>
              <Text style={styles.serviceStateText}>
                {t("home.servicesError")}
              </Text>
            </View>
          ) : (
            <>
              <ServiceCategorySelector
                categories={categories}
                selectedCategoryId={
                  selectedCategoryId
                }
                onSelectCategory={
                  handleSelectCategory
                }
              />

              <View
                style={styles.servicesList}
                onLayout={handleServiceListLayout}
              >
                <ServiceList
                  title={
                    selectedCategory
                      ? t(`serviceCategories.${selectedCategory.id}`)
                      : t("home.services")
                  }
                  symbol={
                    selectedCategory?.symbol ?? ""
                  }
                  services={filteredServices}
                  onAddService={(service) => {
                    router.push({
                      pathname:
                        "/booking/[serviceId]",
                      params: {
                        serviceId: service.id,
                      },
                    });
                  }}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <ConfirmationDialog
        visible={appointmentToCancel !== null}
        title={t("home.cancellationTitle")}
        message={
          appointmentToCancel
            ? t("home.cancellationMessage", {
                name: serviceName(appointmentToCancel.serviceName),
              })
            : ""
        }
        confirmLabel={t("common.cancel")}
        cancelLabel={t("common.no")}
        variant="destructive"
        isLoading={isCancelling}
        onCancel={() => {
          if (!isCancelling) {
            setAppointmentToCancel(null);
          }
        }}
        onConfirm={handleConfirmCancellation}
      />
    </SafeAreaScreen>
  );
}
