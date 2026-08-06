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
import { BookingSummary } from "../components/booking-summary";
import { DateSelector } from "../components/date-selector";
import { SelectedServiceCard } from "../components/selected-service-card";
import { TimeSlotSelector } from "../components/time-slot-selector";
import { useAvailability } from "../hooks/use-availability";
import { createBookingDates } from "../utils/create-booking-dates";
import { styles } from "./booking-screen.styles";

type BookingScreenProps = {
  serviceId: string;
};

export function BookingScreen({ serviceId }: BookingScreenProps) {
  const { addAppointment } = useAppointments();
  const { authenticatedRequest } = useAuthenticatedApi();

  const {
    categories,
    services,
    isLoading: areServicesLoading,
    error: servicesError,
  } = useServices();

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
    ),
  [workingDays],
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
        startsAt: createdAppointment.startsAt,
        serviceName: createdAppointment.serviceName,
        durationMinutes: createdAppointment.durationMinutes,
        price: createdAppointment.priceCents / 100,
        currency: createdAppointment.currency,
      });

      setIsConfirmationVisible(true);
    } catch (error) {
      console.error("Appointment creation failed:", error);

      if (error instanceof ApiError && error.status === 409) {
        Alert.alert(
          "Orari nuk është i disponueshëm",
          error.message,
        );
        return;
      }

      Alert.alert(
        "Rezervimi dështoi",
        "Nuk mundëm ta konfirmojmë rezervimin. Provo përsëri.",
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
            Duke ngarkuar shërbimin...
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
            Të dhënat e rezervimit nuk mund të ngarkohen.
          </Text>

          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Kthehu</Text>
          </Pressable>
        </View>
      </SafeAreaScreen>
    );
  }

  if (!service) {
    return (
      <SafeAreaScreen>
        <View style={styles.stateContainer}>
          <Text style={styles.title}>Shërbimi nuk u gjet</Text>

          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Kthehu</Text>
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
          <Text style={styles.backLinkText}>‹ Kthehu</Text>
        </Pressable>

        <Text style={styles.eyebrow}>REZERVO TERMININ</Text>
        <Text style={styles.title}>Zgjidh datën dhe orën</Text>

        <View style={styles.selectedService}>
          <SelectedServiceCard
            service={service}
            symbol={category?.symbol ?? ""}
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
                Duke kontrolluar oraret...
              </Text>
            </View>
          ) : availabilityError ? (
            <View style={styles.availabilityState}>
              <Text style={styles.availabilityMessage}>
                Oraret nuk mund të ngarkohen.
              </Text>
            </View>
          ) : timeSlots.length === 0 ? (
            <View style={styles.availabilityState}>
              <Text style={styles.availabilityMessage}>
                Nuk ka orare të disponueshme për këtë ditë.
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
        title="Rezervimi u konfirmua!"
        message={
          selectedDate && selectedTime
            ? `${service.name} · ${selectedDate.compactWeekdayLabel}, ${selectedDate.dayLabel} ${selectedDate.monthLabel} · ${selectedTime.label}`
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