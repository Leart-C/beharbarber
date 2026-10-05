import { useCurrentTime } from "@/hooks/use-current-time";
import { useAppointments } from "./use-appointments";

export function useNextAppointment() {
  const { appointments } = useAppointments();
  const now = useCurrentTime();
  // Linear search; never sort or mutate the shared list.
  return appointments.reduce<(typeof appointments)[number] | undefined>(
    (next, item) => {
      const startsAt = Date.parse(item.startsAt);
      return startsAt >= now && (!next || startsAt < Date.parse(next.startsAt))
        ? item
        : next;
    },
    undefined,
  );
}
