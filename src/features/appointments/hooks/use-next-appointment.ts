import { useMemo } from "react";
import { useAppointments } from "./use-appointments";

export function useNextAppointment(){
    const {appointments} = useAppointments();

    return useMemo(()=>{
        const currentTime = Date.now();

        const upcomingAppointments = appointments.filter((appointment) => new Date(appointment.startsAt).getTime() >= currentTime)
        .sort(
            (first,second) =>
                new Date(first.startsAt).getTime() - new Date(second.startsAt).getTime(),
        );

        return upcomingAppointments[0];
    },[appointments]);
}