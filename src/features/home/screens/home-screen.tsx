import { useState } from "react";
import {
  Alert,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
} from "react-native";

import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { UpcomingAppointmentCard } from "@/features/appointments/components/upcoming-appointment-card";
import { BarberAlert } from "../components/barber-alert";
import { HomeHeader } from "../components/home-header";
import {type AppLanguage,LanguageToggle,} from "../components/language-toggle";
import { styles } from "./home-screen.styles";
import { ServiceCategorySelector } from "@/features/services/components/service-category-selector";
import type { ServiceCategoryId } from "@/features/services/types/service-category";
import { ServiceList } from "@/features/services/components/service-list";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import { ConfirmationDialog } from "@/components/feedback/confirmation-dialog";
import { useAppointments } from "@/features/appointments/hooks/use-appointments";
import { useNextAppointment } from "@/features/appointments/hooks/use-next-appointment";
import { useServices } from "@/features/services/hooks/use-services";
import type { Appointment } from "@/features/appointments/types/appointment";
import { useCurrentAnnouncement } from "@/features/announcements/hooks/use-current-announcement";
import { router } from "expo-router";


export function HomeScreen() {
  const { cancelAppointment,cancellingAppointmentId, } = useAppointments();

  const nextAppointment = useNextAppointment();
  const [appointmentToCancel,setAppointmentToCancel] = useState<Appointment | null>(null);
  const isCancelling = appointmentToCancel?.id === cancellingAppointmentId;

  const {categories,services,isLoading: areServicesLoading,error: servicesError} = useServices()

  const {
    scrollViewRef: homeScrollViewRef,
    handleSectionLayout: handleServiceListLayout,
    scrollToSection: scrollToServiceList,
  } = useScrollToSection({
    offset: 20,
  });

  const [language, setLanguage] = useState<AppLanguage>("sq");

  const { announcement } = useCurrentAnnouncement();

  const [dismissedAnnouncementId, setDismissedAnnouncementId] =
    useState<string | null>(null);

  const announcementMessage = announcement
    ? language === "en"
      ? announcement.messageEn ?? announcement.messageSq
      : announcement.messageSq
    : null;

  const shouldShowAnnouncement =
    announcement !== null &&
    announcement.id !== dismissedAnnouncementId;

  const [selectedCategoryId,setSelectedCategoryId] = useState<ServiceCategoryId>("haircut");

  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId,
  );

  const filteredServices = services.filter(
    (service) => service.categoryId === selectedCategoryId,
  );

  const handleEditAppointment = () => {
    Alert.alert(
      "Ndrysho terminin",
      "Ndryshimi i terminit do të ndërtohet në hapin e rezervimeve.",
    );
  };


  const handleSelectCategory = (
    categoryId: ServiceCategoryId,
  ) => {
    setSelectedCategoryId(categoryId);
    scrollToServiceList();
  };

  const handleConfirmCancellation =
  async () => {
    if (
      !appointmentToCancel ||
      isCancelling
    ) {
      return;
    }

    try {
      await cancelAppointment(
        appointmentToCancel.id,
      );

      setAppointmentToCancel(null);
    } catch (error) {
      console.error(
        "Appointment cancellation failed:",
        error,
      );

      Alert.alert(
        "Anulimi dështoi",
        "Nuk mundëm ta anulonim terminin. Provo përsëri.",
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
          {shouldShowAnnouncement && announcementMessage ? (
            <BarberAlert
              message={announcementMessage}
              onDismiss={() => setDismissedAnnouncementId(announcement.id)}
            />
          ) : null}

          {nextAppointment ? (
            <UpcomingAppointmentCard
              appointment={nextAppointment}
              onEdit={handleEditAppointment}
              onCancel={() => {
                setAppointmentToCancel(nextAppointment);
              }}
            />
          ) : null}

          {areServicesLoading ? (
          <View style={styles.serviceState}>
              <ActivityIndicator color="#4E84E5" />

              <Text style={styles.serviceStateText}>
                Duke ngarkuar shërbimet...
              </Text>
            </View>
          ) : servicesError ? (
            <View style={styles.serviceState}>
              <Text style={styles.serviceStateText}>
                Shërbimet nuk mund të ngarkohen.
              </Text>
            </View>
          ) : (
            <>
              <ServiceCategorySelector
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={handleSelectCategory}
              />

              <View style={styles.servicesList} onLayout={handleServiceListLayout}
              >
                <ServiceList
                  title={
                    selectedCategory?.label ??
                    "Shërbimet"
                  }
                  symbol={selectedCategory?.symbol ?? ""}
                  services={filteredServices}
                  onAddService={(service) => {
                    router.push({
                      pathname: "/booking/[serviceId]",
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
        title="Anulo terminin?"
        message={
          appointmentToCancel
            ? `A je i sigurt që dëshiron të anulosh ${appointmentToCancel.serviceName}?`
            : ""
        }
        confirmLabel="Anulo"
        cancelLabel="Jo"
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