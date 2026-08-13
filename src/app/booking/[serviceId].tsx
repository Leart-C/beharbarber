import { useLocalSearchParams } from "expo-router";

import { BookingScreen } from "@/features/booking/screens/booking-screen";

type BookingMode = "create" | "reschedule";

function normalizeParameter(
  value: string | string[] | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default function BookingRoute() {
  const {
    serviceId,
    appointmentId,
    mode,
  } = useLocalSearchParams<{
    serviceId?: string | string[];
    appointmentId?: string | string[];
    mode?: string | string[];
  }>();

  const normalizedServiceId =
    normalizeParameter(serviceId) ?? "";

  const normalizedAppointmentId =
    normalizeParameter(appointmentId);

  const normalizedMode: BookingMode =
    normalizeParameter(mode) === "reschedule"
      ? "reschedule"
      : "create";

  return (
    <BookingScreen
      serviceId={normalizedServiceId}
      appointmentId={normalizedAppointmentId}
      mode={normalizedMode}
    />
  );
}