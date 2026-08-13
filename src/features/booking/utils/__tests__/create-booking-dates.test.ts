import { createBookingDates } from "../create-booking-dates";

describe("createBookingDates", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 7, 9, 9, 0, 0));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns only configured working days", () => {
    const dates = createBookingDates([1, 2, 3, 4, 5, 6], 7, "sq");

    expect(dates).toHaveLength(7);
    expect(dates.map((item) => item.id)).toEqual([
      "2026-08-10",
      "2026-08-11",
      "2026-08-12",
      "2026-08-13",
      "2026-08-14",
      "2026-08-15",
      "2026-08-17",
    ]);
    expect(dates.every((item) => item.date.getDay() !== 0)).toBe(true);
    expect(dates.every((item) => item.isToday === false)).toBe(true);
  });

  it("marks today when today is a working day", () => {
    jest.setSystemTime(new Date(2026, 7, 10, 9, 0, 0));

    const [today] = createBookingDates([1], 1, "en");

    expect(today.id).toBe("2026-08-10");
    expect(today.isToday).toBe(true);
    expect(today.weekdayLabel).toBe("Monday");
  });

  it("returns no dates when the business has no working days", () => {
    expect(createBookingDates([], 7)).toEqual([]);
  });

  it("returns no dates when the requested count is not positive", () => {
    expect(createBookingDates([1, 2, 3], 0)).toEqual([]);
  });
});
