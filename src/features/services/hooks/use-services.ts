import {
  useEffect,
  useState,
  useMemo
} from "react";

import { getServices } from "../api/get-services";
import type { ServicesResponse } from "../types/services-response";
import { mapServicesResponse } from "../mappers/map-services-response";

export function useServices(){
    const [data, setData] = useState<ServicesResponse | null>(null);

    const [error, setError] = useState<Error | null>(null);

    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();

        async function loadServices(){
            try {
                setIsLoading(true);
                setError(null);

                const response = await getServices({
                    signal: abortController.signal,
                });

                setData(response);
            } catch (requestError) {
                if(requestError instanceof Error && requestError.name === "AbortError")
                {
                    return;
                }

                setError(
                    requestError instanceof Error ? requestError : new Error("An unknown services error occurred."),
                );
            }finally{
                if(!abortController.signal.aborted){
                    setIsLoading(false);
                }
            }
        }

        void loadServices();

        return () =>{
            abortController.abort();
        };
    }, []);

    const catalog = useMemo(
        ()=> data?mapServicesResponse(data):{
            categories:[],
            services: [],
        },
        [data],
    )

    return{
        categories: catalog.categories,
        services: catalog.services,
        data,
        isLoading,
        error,
    };
}