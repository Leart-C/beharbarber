import { useLocalSearchParams } from "expo-router";

import { BookingScreen } from "@/features/booking/screens/booking-screen";

export default function BookingRoute(){
    const {serviceId} = useLocalSearchParams<{
        serviceId: string | string [];
    }>();

    const normalizedServiceId = Array.isArray(serviceId) ? serviceId[0] : serviceId;

    return(
        <BookingScreen serviceId={normalizedServiceId ?? ""}/>
    )
}