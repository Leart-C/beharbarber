import { useMemo } from "react";
import { useFocusedQuery } from "@/hooks/use-focused-query";
import { getServices } from "../api/get-services";
import { mapServicesResponse } from "../mappers/map-services-response";

export function useServices() {
  const { data, error, isLoading } = useFocusedQuery(getServices);
  const catalog = useMemo(
    () => (data ? mapServicesResponse(data) : { categories: [], services: [] }),
    [data],
  );
  return { ...catalog, data, isLoading, error };
}
