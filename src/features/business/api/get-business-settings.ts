import { apiRequest } from "@/lib/api/api-client";

import type { BusinessSettingsResponse } from "../types/business-settings";

type GetBusinessSettingsOptions = {
    signal?: AbortSignal;
};

export function getBusinessSettings({signal}:GetBusinessSettingsOptions={}){
    return apiRequest<BusinessSettingsResponse>(
        "/api/v1/business",
        {
            method: "GET",
            signal,
        },
    );
}