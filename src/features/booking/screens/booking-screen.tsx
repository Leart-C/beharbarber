import { useMemo, useState } from "react";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { SuccessConfirmation } from "@/components/feedback/success-confirmation";
import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { useAppointments } from "@/features/appointments/hooks/use-appointments";
import { useServices } from "@/features/services/hooks/use-services";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import { brandColors } from "@/theme/colors";

import { BookingSummary } from "../components/booking-summary";
import { DateSelector } from "../components/date-selector";
import { SelectedServiceCard } from "../components/selected-service-card";
import { TimeSlotSelector } from "../components/time-slot-selector";
import { getPreviewTimeSlots } from "../data/availability-preview";
import { createAppointment } from "../utils/create-appointment";
import { createBookingDates } from "../utils/create-booking-dates";
import { styles } from "./booking-screen.styles";

type BookingScreenProps = {
  serviceId: string;
};

export function BookingScreen({
  serviceId,
}: BookingScreenProps) {
  const { addAppointment } = useAppointments();

  const {
    categories,
    services,
    isLoading: areServicesLoading,
    error: servicesError,
  } = useServices();

  const {
    scrollViewRef: bookingScrollViewRef,
    handleSectionLayout:
      handleBookingSummaryLayout,
    scrollToSection: scrollToBookingSummary,
  } = useScrollToSection({
    offset: 20,
  });

  const [
    isConfirmationVisible,
    setIsConfirmationVisible,
  ] = useState(false);

  const bookingDates = useMemo(
    () => createBookingDates(7),
    [],
  );

  const [selectedDateId, setSelectedDateId] =
    useState(bookingDates[0]?.id ?? "");

  const [selectedTimeId, setSelectedTimeId] =
    useState("");

  const service = services.find(
    (item) => item.id === serviceId,
  );

  const category = service
    ? categories.find(
        (item) =>
          item.id === service.categoryId,
      )
    : undefined;

  const timeSlots = useMemo(
    () => getPreviewTimeSlots(selectedDateId),
    [selectedDateId],
  );

  const selectedDate = bookingDates.find(
    (date) => date.id === selectedDateId,
  );

  const selectedTime = timeSlots.find(
    (timeSlot) =>
      timeSlot.id === selectedTimeId,
  );

  const handleSelectDate = (dateId: string) => {
    setSelectedDateId(dateId);

    // A time selected for the previous date may
    // not be available on the newly selected date.
    setSelectedTimeId("");
  };

  const handleSelectTime = (
    timeSlotId: string,
  ) => {
    setSelectedTimeId(timeSlotId);
    scrollToBookingSummary();
  };

  const handleConfirmBooking = () => {
    if (
      !service ||
      !selectedDate ||
      !selectedTime
    ) {
      return;
    }

    const appointment = createAppointment({
      service,
      date: selectedDate,
      timeSlot: selectedTime,
    });

    addAppointment(appointment);
    setIsConfirmationVisible(true);
  };

  if (areServicesLoading) {
    return (
      <SafeAreaScreen>
        <View style={styles.stateContainer}>
          <ActivityIndicator
            size="large"
            color={brandColors.blue}
          />

          <Text style={styles.stateMessage}>
            Duke ngarkuar shërbimin...
          </Text>
        </View>
      </SafeAreaScreen>
    );
  }

  if (servicesError) {
    return (
      <SafeAreaScreen>
        <View style={styles.stateContainer}>
          <Text style={styles.stateMessage}>
            Shërbimi nuk mund të ngarkohet.
          </Text>

          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>
              Kthehu
            </Text>
          </Pressable>
        </View>
      </SafeAreaScreen>
    );
  }

  if (!service) {
    return (
      <SafeAreaScreen>
        <View style={styles.stateContainer}>
          <Text style={styles.title}>
            Shërbimi nuk u gjet
          </Text>

          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>
              Kthehu
            </Text>
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
          <Text style={styles.backLinkText}>
            ‹ Kthehu
          </Text>
        </Pressable>

        <Text style={styles.eyebrow}>
          REZERVO TERMININ
        </Text>

        <Text style={styles.title}>
          Zgjidh datën dhe orën
        </Text>

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
            onSelectDate={(date) => {
              handleSelectDate(date.id);
            }}
          />
        </View>

        <View style={styles.timeSelector}>
          <TimeSlotSelector
            timeSlots={timeSlots}
            selectedTimeId={selectedTimeId}
            onSelectTime={(timeSlot) => {
              handleSelectTime(timeSlot.id);
            }}
          />
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

          router.replace(
            "/(tabs)/appointments",
          );
        }}
      />
    </SafeAreaScreen>
  );
}