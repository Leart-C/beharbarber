import type { AuthenticatedRequest } from "@/hooks/use-authenticated-api";

export type CancelAppointmentResponse = {
    appointment: {
        id: string;
        status: "cancelled";
        cancelledAt: string | null;
    };
};

type CancelAppointmentOptions = {
  authenticatedRequest: AuthenticatedRequest;
  appointmentId: string;
};

export function cancelAppointment({
  authenticatedRequest,
  appointmentId,
}: CancelAppointmentOptions) {
  return authenticatedRequest<CancelAppointmentResponse>(
    `/api/v1/appointments/${encodeURIComponent(
      appointmentId,
    )}/cancel`,
    {
      method: "PATCH",
    },
  );
}