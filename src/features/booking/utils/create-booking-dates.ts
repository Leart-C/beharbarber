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
  workingDays: number[],
  numberOfDays = 7,
): BookingDate[] {
  if (
    workingDays.length === 0 ||
    numberOfDays <= 0
  ) {
    return [];
  }

  const workingDaySet =
    new Set(workingDays);

  const today = new Date();
  today.setHours(12, 0, 0, 0);

  const bookingDates: BookingDate[] = [];
  let dayOffset = 0;

  while (
    bookingDates.length < numberOfDays &&
    dayOffset < 366
  ) {
    const date = new Date(today);
    date.setDate(
      today.getDate() + dayOffset,
    );

    dayOffset += 1;

    if (
      !workingDaySet.has(date.getDay())
    ) {
      continue;
    }

    const weekdayLabel = capitalizeFirst(
      new Intl.DateTimeFormat("sq-AL", {
        weekday: "long",
      }).format(date),
    );

    bookingDates.push({
      id: createDateId(date),
      date,
      weekdayLabel,
      compactWeekdayLabel:
        capitalizeFirst(
          weekdayLabel.replace(
            /^E\s+/i,
            "",
          ),
        ),
      dayLabel:
        new Intl.DateTimeFormat(
          "sq-AL",
          {
            day: "numeric",
          },
        ).format(date),
      monthLabel:
        capitalizeFirst(
          new Intl.DateTimeFormat(
            "sq-AL",
            {
              month: "long",
            },
          ).format(date),
        ),
      isToday:
        date.getTime() ===
        today.getTime(),
    });
  }

  return bookingDates;
}