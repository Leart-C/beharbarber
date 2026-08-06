export type AvailabilityResponse = {
  date: string;
  timeSlots: {
    startsAt: string;
    available: boolean;
  }[];
};