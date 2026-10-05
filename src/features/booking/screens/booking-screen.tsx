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
import { useTranslation } from "@/features/localization/hooks/use-translation";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import { brandColors } from "@/theme/colors";
import { BookingSummary } from "../components/booking-summary";
import { DateSelector } from "../components/date-selector";
import { SelectedServiceCard } from "../components/selected-service-card";
import { TimeSlotSelector } from "../components/time-slot-selector";
import { useBooking } from "../hooks/use-booking";
import type { BookingScreenProps } from "../types/booking-screen";
import { styles } from "./booking-screen.styles";

export function BookingScreen(props: BookingScreenProps) {
  const { serviceName, t } = useTranslation();
  const booking = useBooking(props);
  const {
    service,
    selectedDate,
    selectedTime,
    isRescheduling,
    availability,
    submission,
  } = booking;
  const { scrollViewRef, handleSectionLayout, scrollToSection } =
    useScrollToSection({ offset: 20 });

  if (booking.isLoading || booking.error || booking.invalidRoute || !service) {
    const message = booking.isLoading
      ? t("booking.loading")
      : booking.error
        ? t("booking.loadError")
        : t("booking.serviceNotFound");
    return (
      <SafeAreaScreen>
        <View style={styles.stateContainer}>
          {booking.isLoading && (
            <ActivityIndicator size="large" color={brandColors.blue} />
          )}
          <Text style={styles.stateMessage}>{message}</Text>
          {!booking.isLoading && (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <Text style={styles.backButtonText}>{t("common.back")}</Text>
            </Pressable>
          )}
        </View>
      </SafeAreaScreen>
    );
  }

  return (
    <SafeAreaScreen>
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>‹ {t("common.back")}</Text>
        </Pressable>
        <Text style={styles.eyebrow}>
          {t(isRescheduling ? "booking.rescheduleEyebrow" : "booking.eyebrow")}
        </Text>
        <Text style={styles.title}>
          {t(isRescheduling ? "booking.rescheduleTitle" : "booking.title")}
        </Text>
        <View style={styles.selectedService}>
          <SelectedServiceCard
            service={service}
            iconName={booking.category?.iconName ?? "scissors"}
            onChange={() => router.back()}
          />
        </View>
        <View style={styles.dateSelector}>
          <DateSelector
            dates={booking.dates}
            selectedDateId={selectedDate?.id ?? ""}
            onSelectDate={(date) => booking.selectDate(date.id)}
          />
        </View>
        <View style={styles.timeSelector}>
          {availability.isLoading ||
          availability.error ||
          !availability.timeSlots.length ? (
            <View style={styles.availabilityState}>
              {availability.isLoading && (
                <ActivityIndicator color={brandColors.blue} />
              )}
              <Text style={styles.availabilityMessage}>
                {t(
                  availability.isLoading
                    ? "booking.availabilityChecking"
                    : availability.error
                      ? "booking.availabilityError"
                      : "booking.noAvailability",
                )}
              </Text>
              {availability.error && (
                <Pressable
                  accessibilityRole="button"
                  onPress={availability.refreshAvailability}
                  style={styles.backButton}
                >
                  <Text style={styles.backButtonText}>
                    {t("business.retry")}
                  </Text>
                </Pressable>
              )}
            </View>
          ) : (
            <TimeSlotSelector
              timeSlots={availability.timeSlots}
              selectedTimeId={booking.selectedTimeId}
              onSelectTime={(slot) => {
                booking.selectTime(slot.id);
                scrollToSection();
              }}
            />
          )}
        </View>
        <View style={styles.summary} onLayout={handleSectionLayout}>
          <BookingSummary
            service={service}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onConfirm={submission.submit}
            isConfirming={
              submission.isSubmitting || submission.isConfirmationVisible
            }
          />
        </View>
      </ScrollView>
      <SuccessConfirmation
        visible={submission.isConfirmationVisible}
        title={t(
          isRescheduling
            ? "booking.rescheduleConfirmationTitle"
            : "booking.confirmationTitle",
        )}
        message={
          selectedDate && selectedTime
            ? `${serviceName(service.name)} · ${selectedDate.compactWeekdayLabel}, ${selectedDate.dayLabel} ${selectedDate.monthLabel} · ${selectedTime.label}`
            : undefined
        }
        onFinished={() => router.replace("/(tabs)/appointments")}
      />
    </SafeAreaScreen>
  );
}
