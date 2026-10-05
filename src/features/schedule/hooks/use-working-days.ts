import { useFocusedQuery } from "@/hooks/use-focused-query";
import { getSchedule } from "../api/get-schedule";

const emptyDays: number[] = [];
export function useWorkingDays() {
  const { data, error, isLoading } = useFocusedQuery(getSchedule);
  return { workingDays: data?.workingDays ?? emptyDays, isLoading, error };
}
