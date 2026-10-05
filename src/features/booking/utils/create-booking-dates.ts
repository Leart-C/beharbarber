import { SHOP_TIME_ZONE } from "@/config/shop";
import type { AppLanguage } from "@/features/localization/types/app-language";
import type { BookingDate } from "../types/booking-date";

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export function createBookingDates(
  workingDays: number[],
  numberOfDays = 7,
  language: AppLanguage = "sq",
  now = new Date(),
): BookingDate[] {
  const days = new Set(
    workingDays.filter((day) => Number.isInteger(day) && day >= 0 && day <= 6),
  );
  if (!days.size || !Number.isFinite(numberOfDays) || numberOfDays <= 0)
    return [];

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: SHOP_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) =>
    parts.find((item) => item.type === type)!.value;
  const todayId = `${part("year")}-${part("month")}-${part("day")}`;
  // Calendar dates are represented at UTC noon, avoiding device DST arithmetic.
  const today = new Date(`${todayId}T12:00:00Z`);
  const locale = language === "sq" ? "sq-AL" : "en-US";
  const weekday = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    timeZone: "UTC",
  });
  const month = new Intl.DateTimeFormat(locale, {
    month: "long",
    timeZone: "UTC",
  });
  const dates: BookingDate[] = [];

  for (
    let offset = 0;
    dates.length < Math.floor(numberOfDays) && offset < 366;
    offset++
  ) {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() + offset);
    if (!days.has(date.getUTCDay())) continue;
    const id = date.toISOString().slice(0, 10);
    const weekdayLabel = capitalize(weekday.format(date));
    dates.push({
      id,
      date,
      weekdayLabel,
      compactWeekdayLabel: capitalize(weekdayLabel.replace(/^E\s+/i, "")),
      dayLabel: String(date.getUTCDate()),
      monthLabel: capitalize(month.format(date)),
      isToday: id === todayId,
    });
  }
  return dates;
}
