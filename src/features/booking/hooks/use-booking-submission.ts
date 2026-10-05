import { useRef, useState } from "react";
import { Alert } from "react-native";
import { createAppointment } from "@/features/appointments/api/create-appointment";
import { rescheduleAppointment } from "@/features/appointments/api/reschedule-appointment";
import { useAppointments } from "@/features/appointments/hooks/use-appointments";
import { mapAppointment } from "@/features/appointments/mappers/map-appointment";
import { useTranslation } from "@/features/localization/hooks/use-translation";
import type { AuthenticatedRequest } from "@/hooks/use-authenticated-api";
import { ApiError } from "@/lib/api/api-client";
import type { BookingScreenProps } from "../types/booking-screen";
import type { BookingTimeSlot } from "../types/booking-time-slot";

type Options = BookingScreenProps & {
  authenticatedRequest: AuthenticatedRequest;
  selectedTime?: BookingTimeSlot;
  onConflict: () => void;
};

export function useBookingSubmission({
  serviceId,
  appointmentId,
  mode,
  authenticatedRequest,
  selectedTime,
  onConflict,
}: Options) {
  const { t } = useTranslation();
  const { addAppointment, updateAppointment } = useAppointments();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const locked = useRef(false);
  const isRescheduling = mode === "reschedule";

  async function submit() {
    const startsAt = selectedTime ? Date.parse(selectedTime.startsAt) : NaN;
    if (
      locked.current ||
      !serviceId ||
      !selectedTime?.isAvailable ||
      !Number.isFinite(startsAt) ||
      startsAt <= Date.now() ||
      (isRescheduling && !appointmentId)
    )
      return;
    // A ref closes the double-tap window before React renders the loading state.
    locked.current = true;
    setIsSubmitting(true);
    try {
      const response = isRescheduling
        ? await rescheduleAppointment({
            authenticatedRequest,
            appointmentId: appointmentId!,
            input: { startsAt: selectedTime.startsAt },
          })
        : await createAppointment({
            authenticatedRequest,
            input: { serviceId, startsAt: selectedTime.startsAt },
          });
      const appointment = mapAppointment(response.appointment);
      if (isRescheduling) updateAppointment(appointment);
      else addAppointment(appointment);
      setIsConfirmationVisible(true);
      // Keep locked until navigation completes; a successful request must not be repeated.
    } catch (error) {
      locked.current = false;
      if (error instanceof ApiError && error.status === 409) {
        onConflict();
        Alert.alert(t("booking.unavailableTitle"), error.message);
      } else {
        Alert.alert(
          t(
            isRescheduling
              ? "booking.rescheduleFailedTitle"
              : "booking.failedTitle",
          ),
          t(
            isRescheduling
              ? "booking.rescheduleFailedMessage"
              : "booking.failedMessage",
          ),
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submit, isSubmitting, isConfirmationVisible };
}
