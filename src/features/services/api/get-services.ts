import { env } from "@/config/env";

import type { ServicesResponse } from "../types/services-response";

type GetServicesOptions = {
  signal?: AbortSignal;
};

export async function getServices({signal}: GetServicesOptions={}){
    const response = await fetch(
        `${env.apiUrl}/api/v1/services`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            signal,
        },
    );

    if(! response.ok){
        throw new Error(
            `Unable to retrieve services: ${response.status}`,
        );
    }

    return response.json() as Promise<ServicesResponse>;
}