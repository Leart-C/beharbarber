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
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00"
];

export function getPreviewTimeSlots(
  dateId: string,
): BookingTimeSlot[] {
  const date = new Date(`${dateId}T12:00:00`);
  const weekday = date.getDay();

  return times.map((time, index) => {
    const slotStartsAt = new Date(
      `${dateId}T${time}:00`,
    );

    const isInFuture =
      slotStartsAt.getTime() > Date.now();

    const isPreviewAvailable =
      (index + weekday) % 4 !== 0;

    return {
      id: time,
      label: time,
      isAvailable:
        isInFuture && isPreviewAvailable,
    };
  });
}