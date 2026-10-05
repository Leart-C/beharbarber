import type { Appointment } from "../types/appointment";

type AppointmentPayload = Omit<Appointment, "price"> & { priceCents: number };

export function mapAppointment(appointment: AppointmentPayload): Appointment {
  return {
    id: appointment.id,
    serviceId: appointment.serviceId,
    startsAt: appointment.startsAt,
    serviceName: appointment.serviceName,
    durationMinutes: appointment.durationMinutes,
    price: appointment.priceCents / 100,
    currency: appointment.currency,
  };
}
