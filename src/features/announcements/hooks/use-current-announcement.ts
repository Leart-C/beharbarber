import { useEffect, useState } from "react";

import { getCurrentAnnouncement } from "../api/get-current-announcement";
import type { CurrentAnnouncement } from "../types/announcement-response";

export function useCurrentAnnouncement(){
    const [announcement,setAnnouncement] = useState<CurrentAnnouncement | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(()=>{
        const abortController = new AbortController();

        async function loadAnnouncement(){
            try {
                setIsLoading(true);
                setError(null);

                const response = await getCurrentAnnouncement({signal: abortController.signal});

                if(!abortController.signal.aborted){
                    setAnnouncement(response.announcement);
                }
            } catch (requestError) {
                if(
                    abortController.signal.aborted || (requestError instanceof Error && requestError.name === "AbortError")
                ){
                return;
                }

                setError(
                    requestError instanceof Error ? requestError : new Error("An unknown announcement error occurred")
                );
            } finally{
                if(!abortController.signal.aborted){
                    setIsLoading(false);
                }
            }
        }

        void loadAnnouncement();

        return ()=> abortController.abort();
    }, []);

    return {announcement, isLoading, error};
}