import type { Appointment } from "@/features/appointments/types/appointment";
import type { BarberService } from "@/features/services/types/service";

import type { BookingDate } from "../types/booking-date";
import type { BookingTimeSlot } from "../types/booking-time-slot";

type CreateAppointmentParams = {
    service: BarberService;
    date: BookingDate;
    timeSlot: BookingTimeSlot;
}

export function createAppointment({service,date,timeSlot}:CreateAppointmentParams):Appointment{
    const [hoursText = "0", minutesText = "0"] = timeSlot.id.split(':');

    const startsAt = new Date(date.date);

    startsAt.setHours(Number(hoursText), Number(minutesText), 0,0);

    return {
        id: `${service.id}-${date.id}-${timeSlot.id}-${Date.now()}`,
        startsAt: startsAt.toISOString(),
        serviceName: service.name,
        durationMinutes: service.durationMinutes,
        price: service.price,
        currency: service.currency,
    };
}