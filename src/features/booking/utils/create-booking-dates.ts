import type { BookingDate } from "../types/booking-date";

function createDateId(date: Date): string {
  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1,
  ).padStart(2, "0");
  const day = String(
    date.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function capitalizeFirst(value: string): string {
  if (!value) {
    return value;
  }

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

export function createBookingDates(
  numberOfDays = 7,
): BookingDate[] {
  const today = new Date();

  today.setHours(12, 0, 0, 0);

  return Array.from(
    { length: numberOfDays },
    (_, index) => {
      const date = new Date(today);

      date.setDate(today.getDate() + index);

      const weekdayLabel = capitalizeFirst(
        new Intl.DateTimeFormat("sq-AL", {
          weekday: "long",
        }).format(date),
      );

      return {
        id: createDateId(date),
        date,
        weekdayLabel,

        compactWeekdayLabel: capitalizeFirst(
          weekdayLabel.replace(/^E\s+/i, ""),
        ),
        
        dayLabel: new Intl.DateTimeFormat(
          "sq-AL",
          {
            day: "numeric",
          },
        ).format(date),

        monthLabel: capitalizeFirst(
          new Intl.DateTimeFormat("sq-AL", {
            month: "long",
          }).format(date),
        ),

        isToday: index === 0,
      };
    },
  );
}