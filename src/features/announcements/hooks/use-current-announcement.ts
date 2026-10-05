import { useFocusedQuery } from "@/hooks/use-focused-query";
import { getCurrentAnnouncement } from "../api/get-current-announcement";

export function useCurrentAnnouncement() {
  const { data, error, isLoading } = useFocusedQuery(getCurrentAnnouncement);
  return { announcement: data?.announcement ?? null, isLoading, error };
}
