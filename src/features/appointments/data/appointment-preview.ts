import type { Appointment } from "../types/appointment";

export const appointmentPreview = {
  id: "appointment-preview",
  startsAt: "2026-08-07T10:30:00+02:00",
  serviceName: "Qethje + Mjekër",
  durationMinutes: 45,
  price: 9,
  currency: "EUR",
} satisfies Appointment;