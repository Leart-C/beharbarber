import { apiRequest } from "@/lib/api/api-client";

import type { CurrentAnnouncementResponse } from "../types/announcement-response";

type GetCurrentAnnouncementOptions = {
    signal?: AbortSignal;
};

export function getCurrentAnnouncement({signal}:GetCurrentAnnouncementOptions){
    return apiRequest<CurrentAnnouncementResponse>("/api/v1/announcements/current",{
        method: "GET",
        signal,
    });
}

