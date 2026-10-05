import { useFocusedQuery } from "@/hooks/use-focused-query";
import { getBusinessSettings } from "../api/get-business-settings";

export function useBusinessSettings() {
  const { data, error, isLoading, refresh } =
    useFocusedQuery(getBusinessSettings);
  return {
    businessSettings: data?.business ?? null,
    isLoading,
    error,
    refreshBusinessSettings: refresh,
  };
}
