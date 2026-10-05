import type { RemoteAppointment } from "@/features/appointments/api/get-appointments";

export const remoteAppointment: RemoteAppointment = {
  id: "appointment-1",
  serviceId: "service-1",
  serviceName: "Fade",
  durationMinutes: 30,
  bufferMinutes: 5,
  priceCents: 700,
  currency: "EUR",
  startsAt: "2030-08-13T09:30:00.000Z",
  endsAt: "2030-08-13T10:00:00.000Z",
  occupiedEndsAt: "2030-08-13T10:05:00.000Z",
  status: "confirmed",
  cancelledAt: null,
};
