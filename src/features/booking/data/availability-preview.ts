import type { BookingTimeSlot } from "../types/booking-time-slot";

const times = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
];

export function getPreviewTimeSlots(
  dateId: string,
): BookingTimeSlot[] {
  const date = new Date(`${dateId}T12:00:00`);
  const weekday = date.getDay();

  return times.map((time, index) => ({
    id: time,
    label: time,

    // Temporary variation between dates
    isAvailable: (index + weekday) % 4 !== 0,
  }));
}