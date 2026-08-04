import { useContext } from "react";

import { AppointmentContext } from "../context/appointments-context";

export function useAppointments(){
    const context = useContext(AppointmentContext);

    if(!context){
        throw new Error(
            "useAppointments must be used inside AppointmentsProvider"
        )
    }

    return context;
}