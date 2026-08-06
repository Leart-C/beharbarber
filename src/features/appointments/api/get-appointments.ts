import type { AuthenticatedRequest } from "@/hooks/use-authenticated-api";

export type RemoteAppointment = {
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
  status:
    | "confirmed"
    | "cancelled"
    | "completed"
    | "no_show";
  cancelledAt: string | null;
};

export type GetAppointmentsResponse = {
    appointments: RemoteAppointment[];
}

type GetAppointmentsOptions = {
    authenticatedRequest: AuthenticatedRequest;
    signal?: AbortSignal;
}

export function getAppointments({authenticatedRequest,signal}:GetAppointmentsOptions){
    return authenticatedRequest<GetAppointmentsResponse>("/api/v1/appointments",
    {
        method:"GET",
        signal,
    });
}