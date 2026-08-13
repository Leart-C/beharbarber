import { router } from "expo-router";
import { useMemo, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { rescheduleAppointment } from "@/features/appointments/api/reschedule-appointment";
import { SuccessConfirmation } from "@/components/feedback/success-confirmation";
import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { createAppointment } from "@/features/appointments/api/create-appointment";
import { useAppointments } from "@/features/appointments/hooks/use-appointments";
import { useServices } from "@/features/services/hooks/use-services";
import { useAuthenticatedApi } from "@/hooks/use-authenticated-api";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import { ApiError } from "@/lib/api/api-client";
import { brandColors } from "@/theme/colors";
import { useWorkingDays } from "@/features/schedule/hooks/use-working-days";
import { useTranslation } from "@/features/localization/hooks/use-translation";
import { BookingSummary } from "../components/booking-summary";
import { DateSelector } from "../components/date-selector";
import { SelectedServiceCard } from "../components/selected-service-card";
import { TimeSlotSelector } from "../components/time-slot-selector";
import { useAvailability } from "../hooks/use-availability";
import { createBookingDates } from "../utils/create-booking-dates";
import { styles } from "./booking-screen.styles";

type BookingMode = "create" | "reschedule";

type BookingScreenProps = {
  serviceId: string;
  appointmentId?: string;
  mode?: BookingMode;
};

export function BookingScreen({ serviceId, appointmentId, mode = "create" }: BookingScreenProps) {
  const { language, serviceName, t } = useTranslation();
  const {
    addAppointment,
    updateAppointment,
    refreshAppointments,
  } = useAppointments();
  const { authenticatedRequest } = useAuthenticatedApi();

  const {
    categories,
    services,
    isLoading: areServicesLoading,
    error: servicesError,
  } = useServices();

  const isRescheduling =
    mode === "reschedule" &&
    Boolean(appointmentId);

  const {
    workingDays,
    isLoading: isScheduleLoading,
    error: scheduleError,
  } = useWorkingDays();

  const {
    scrollViewRef: bookingScrollViewRef,
    handleSectionLayout: handleBookingSummaryLayout,
    scrollToSection: scrollToBookingSummary,
  } = useScrollToSection({ offset: 20 });

  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const bookingDates = useMemo(
  () =>
    createBookingDates(
      workingDays,
      7,
      language,
    ),
  [language, workingDays],
);
  const [selectedDateId, setSelectedDateId] = useState(
    bookingDates[0]?.id ?? "",
  );
  const [selectedTimeId, setSelectedTimeId] = useState("");

  const {
    timeSlots,
    isLoading: isAvailabilityLoading,
    error: availabilityError,
  } = useAvailability({
    serviceId,
    date: selectedDateId,
    appointmentId: isRescheduling
      ? appointmentId
      : undefined,
    authenticatedRequest,
  });

  const service = services.find((item) => item.id === serviceId);

  const category = service
    ? categories.find((item) => item.id === service.categoryId)
    : undefined;

  const selectedDate = bookingDates.find(
    (date) => date.id === selectedDateId,
  );

  const selectedTime = timeSlots.find(
    (timeSlot) => timeSlot.id === selectedTimeId,
  );

  useEffect(() => {
    const selectedDateStillExists =
      bookingDates.some(
        (date) =>
          date.id === selectedDateId,
      );

    if (
      !selectedDateStillExists &&
      bookingDates[0]
    ) {
      setSelectedDateId(
        bookingDates[0].id,
      );
      setSelectedTimeId("");
    }
  }, [bookingDates, selectedDateId]);

  const handleSelectDate = (dateId: string) => {
    setSelectedDateId(dateId);
    setSelectedTimeId("");
  };

  const handleSelectTime = (timeSlotId: string) => {
    setSelectedTimeId(timeSlotId);
    scrollToBookingSummary();
  };

  const handleConfirmBooking = async () => {
  if (
    !service ||
    !selectedDate ||
    !selectedTime ||
    isCreatingAppointment
  ) {
    return;
  }

  try {
    setIsCreatingAppointment(true);

    if (isRescheduling && appointmentId) {
      const response = await rescheduleAppointment({
        authenticatedRequest,
        appointmentId,
        input: {
          startsAt: selectedTime.startsAt,
        },
      });

      const updatedAppointment = response.appointment;

      updateAppointment({
        id: updatedAppointment.id,
        serviceId: updatedAppointment.serviceId,
        startsAt: updatedAppointment.startsAt,
        serviceName: updatedAppointment.serviceName,
        durationMinutes: updatedAppointment.durationMinutes,
        price: updatedAppointment.priceCents / 100,
        currency: updatedAppointment.currency,
      });

      refreshAppointments();
    } else {
      const response = await createAppointment({
        authenticatedRequest,
        input: {
          serviceId: service.id,
          startsAt: selectedTime.startsAt,
        },
      });

      const createdAppointment = response.appointment;

      addAppointment({
        id: createdAppointment.id,
        serviceId: createdAppointment.serviceId,
        startsAt: createdAppointment.startsAt,
        serviceName: createdAppointment.serviceName,
        durationMinutes: createdAppointment.durationMinutes,
        price: createdAppointment.priceCents / 100,
        currency: createdAppointment.currency,
      });
    }

    setIsConfirmationVisible(true);
  } catch (error) {
    console.error(
      isRescheduling
        ? "Appointment rescheduling failed:"
        : "Appointment creation failed:",
      error,
    );

    if (
      error instanceof ApiError &&
      error.status === 409
    ) {
      Alert.alert(
        t("booking.unavailableTitle"),
        error.message,
      );

      return;
    }

    Alert.alert(
      isRescheduling
        ? t("booking.rescheduleFailedTitle")
        : t("booking.failedTitle"),
      isRescheduling
        ? t("booking.rescheduleFailedMessage")
        : t("booking.failedMessage"),
    );
  } finally {
    setIsCreatingAppointment(false);
  }
};

  if (areServicesLoading || isScheduleLoading) {
    return (
      <SafeAreaScreen>
        <View style={styles.stateContainer}>
          <ActivityIndicator size="large" color={brandColors.blue} />
          <Text style={styles.stateMessage}>
            {t("booking.loading")}
          </Text>
        </View>
      </SafeAreaScreen>
    );
  }

  if (servicesError || scheduleError) {
    return (
      <SafeAreaScreen>
        <View style={styles.stateContainer}>
          <Text style={styles.stateMessage}>
            {t("booking.loadError")}
          </Text>

          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>{t("common.back")}</Text>
          </Pressable>
        </View>
      </SafeAreaScreen>
    );
  }

  if (!service) {
    return (
      <SafeAreaScreen>
        <View style={styles.stateContainer}>
          <Text style={styles.title}>{t("booking.serviceNotFound")}</Text>

          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>{t("common.back")}</Text>
          </Pressable>
        </View>
      </SafeAreaScreen>
    );
  }

  return (
    <SafeAreaScreen>
      <ScrollView
        ref={bookingScrollViewRef}
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => router.back()}
          style={styles.backLink}
        >
          <Text style={styles.backLinkText}>‹ {t("common.back")}</Text>
        </Pressable>

        <Text style={styles.eyebrow}>
          {isRescheduling
            ? t("booking.rescheduleEyebrow")
            : t("booking.eyebrow")}
        </Text>

        <Text style={styles.title}>
          {isRescheduling
            ? t("booking.rescheduleTitle")
            : t("booking.title")}
        </Text>

        <View style={styles.selectedService}>
          <SelectedServiceCard
            service={service}
            iconName={category?.iconName ?? "scissors"}
            onChange={() => router.back()}
          />
        </View>

        <View style={styles.dateSelector}>
          <DateSelector
            dates={bookingDates}
            selectedDateId={selectedDateId}
            onSelectDate={(date) => handleSelectDate(date.id)}
          />
        </View>

        <View style={styles.timeSelector}>
          {isAvailabilityLoading ? (
            <View style={styles.availabilityState}>
              <ActivityIndicator color={brandColors.blue} />
              <Text style={styles.availabilityMessage}>
                {t("booking.availabilityChecking")}
              </Text>
            </View>
          ) : availabilityError ? (
            <View style={styles.availabilityState}>
              <Text style={styles.availabilityMessage}>
                {t("booking.availabilityError")}
              </Text>
            </View>
          ) : timeSlots.length === 0 ? (
            <View style={styles.availabilityState}>
              <Text style={styles.availabilityMessage}>
                {t("booking.noAvailability")}
              </Text>
            </View>
          ) : (
            <TimeSlotSelector
              timeSlots={timeSlots}
              selectedTimeId={selectedTimeId}
              onSelectTime={(timeSlot) =>
                handleSelectTime(timeSlot.id)
              }
            />
          )}
        </View>

        <View
          style={styles.summary}
          onLayout={handleBookingSummaryLayout}
        >
          <BookingSummary
            service={service}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onConfirm={handleConfirmBooking}
            isConfirming={isCreatingAppointment}
          />
        </View>
      </ScrollView>

      <SuccessConfirmation
        visible={isConfirmationVisible}
        title={
          isRescheduling
            ? t("booking.rescheduleConfirmationTitle")
            : t("booking.confirmationTitle")
        }
        message={
          selectedDate && selectedTime
            ? `${serviceName(service.name)} · ${selectedDate.compactWeekdayLabel}, ${selectedDate.dayLabel} ${selectedDate.monthLabel} · ${selectedTime.label}`
            : undefined
        }
        onFinished={() => {
          setIsConfirmationVisible(false);
          router.replace("/(tabs)/appointments");
        }}
      />
    </SafeAreaScreen>
  );
}
