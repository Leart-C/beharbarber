import type { AuthenticatedRequest } from "@/hooks/use-authenticated-api";

type RescheduleAppointmentInput = {
  startsAt: string;
};

type RescheduledAppointment = {
  id: string;
  serviceId: string;
  serviceName: string;
  durationMinutes: number;
  bufferMinutes: number;
  priceCents: number;
  currency: "EUR";
  startsAt: string;
  endsAt: string;
  occupiedEndsAt: string;
  status: "confirmed";
  cancelledAt: string | null;
};

export type RescheduleAppointmentResponse = {
  appointment: RescheduledAppointment;
};

type RescheduleAppointmentOptions = {
  authenticatedRequest: AuthenticatedRequest;
  appointmentId: string;
  input: RescheduleAppointmentInput;
};

export function rescheduleAppointment({
  authenticatedRequest,
  appointmentId,
  input,
}: RescheduleAppointmentOptions) {
  return authenticatedRequest<RescheduleAppointmentResponse>(
    `/api/v1/appointments/${encodeURIComponent(appointmentId)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    },
  );
}