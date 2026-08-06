import type { AuthenticatedRequest } from "@/hooks/use-authenticated-api";

type CreateAppointmentInput = {
    serviceId: string;
    startsAt: string;
};

type CreatedAppointment = {
  id: string;
  serviceId: string;
  serviceName: string;
  durationMinutes: number;
  priceCents: number;
  currency: "EUR";
  startsAt: string;
  endsAt: string;
  status: "confirmed";
};

export type CreateAppointmentResponse = {
    appointment: CreatedAppointment;
};

type CreateAppointmentOptions = {
    authenticatedRequest: AuthenticatedRequest;
    input: CreateAppointmentInput;
}

export function createAppointment({authenticatedRequest,input}: CreateAppointmentOptions){
    return authenticatedRequest<CreateAppointmentResponse>("/api/v1/appointments",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input)
    });
}

