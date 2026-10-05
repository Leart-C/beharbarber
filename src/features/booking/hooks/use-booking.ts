import { useMemo, useState } from "react";
import { useAppointments } from "@/features/appointments/hooks/use-appointments";
import { useServices } from "@/features/services/hooks/use-services";
import { useWorkingDays } from "@/features/schedule/hooks/use-working-days";
import { useTranslation } from "@/features/localization/hooks/use-translation";
import { useAuthenticatedApi } from "@/hooks/use-authenticated-api";
import { useCurrentTime } from "@/hooks/use-current-time";
import { createBookingDates } from "../utils/create-booking-dates";
import { useAvailability } from "./use-availability";
import { useBookingSubmission } from "./use-booking-submission";
import type { BookingScreenProps } from "../types/booking-screen";

export function useBooking(options: BookingScreenProps) {
  const { serviceId, appointmentId, mode = "create" } = options;
  const { language } = useTranslation();
  const { authenticatedRequest } = useAuthenticatedApi();
  const catalog = useServices();
  const schedule = useWorkingDays();
  const {
    appointments,
    isLoading: appointmentsLoading,
    error: appointmentsError,
  } = useAppointments();
  const now = useCurrentTime();
  const dates = useMemo(
    () => createBookingDates(schedule.workingDays, 7, language, new Date(now)),
    [schedule.workingDays, language, now],
  );
  const [dateId, setDateId] = useState("");
  const [timeId, setTimeId] = useState("");
  const selectedDate = dates.find((date) => date.id === dateId) ?? dates[0];
  const isRescheduling = mode === "reschedule";
  const availability = useAvailability({
    serviceId,
    date: selectedDate?.id ?? "",
    appointmentId: isRescheduling ? appointmentId : undefined,
    authenticatedRequest,
  });
  const timeSlots = useMemo(
    () =>
      availability.timeSlots.map((slot) => ({
        ...slot,
        isAvailable: slot.isAvailable && Date.parse(slot.startsAt) > now,
      })),
    [availability.timeSlots, now],
  );
  const selectedTime = timeSlots.find(
    (slot) => slot.id === timeId && slot.isAvailable,
  );
  const catalogService = catalog.services.find((item) => item.id === serviceId);
  const existing = isRescheduling
    ? appointments.find((item) => item.id === appointmentId)
    : undefined;
  // Rescheduling retains the booked price and duration, even after catalog edits.
  const service =
    catalogService && existing
      ? {
          ...catalogService,
          name: existing.serviceName,
          price: existing.price,
          durationMinutes: existing.durationMinutes,
        }
      : catalogService;
  const category = catalog.categories.find(
    (item) => item.id === service?.categoryId,
  );

  function selectDate(id: string) {
    setDateId(id);
    setTimeId("");
  }
  function refreshAvailability() {
    setTimeId("");
    availability.refreshAvailability();
  }
  const submission = useBookingSubmission({
    ...options,
    mode,
    authenticatedRequest,
    selectedTime,
    onConflict: refreshAvailability,
  });
  return {
    service,
    category,
    dates,
    selectedDate,
    selectedTime,
    selectedTimeId: selectedTime?.id ?? "",
    selectDate,
    selectTime: setTimeId,
    isRescheduling,
    isLoading:
      catalog.isLoading ||
      schedule.isLoading ||
      (isRescheduling && !existing && appointmentsLoading),
    error:
      (!catalogService ? catalog.error : null) ??
      schedule.error ??
      (isRescheduling && !existing ? appointmentsError : null),
    invalidRoute: isRescheduling && (!appointmentId || !existing),
    availability: { ...availability, timeSlots },
    submission,
  };
}
