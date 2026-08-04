import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import type { PropsWithChildren } from "react";

import type { Appointment } from "../types/appointment";

type AppointmentsContextValue = {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  removeAppointment: (appointmentId: string) => void;
};

export const AppointmentContext = createContext<AppointmentsContextValue | undefined>(undefined);

export function AppointmentsProvider({children}:PropsWithChildren){
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const addAppointment = useCallback(
        (appointment: Appointment) => {
            setAppointments((currentAppointment) => [
                appointment,
                ...currentAppointment.filter(
                    (currentAppointment)=> currentAppointment.id !== appointment.id,
                ),
            ]);
        },
        [],
    );

    const removeAppointment = useCallback(
        (appointmentId: string)=>{
            setAppointments((currentAppointmes) =>
            currentAppointmes.filter(
                (appointment)=> 
                    appointment.id !== appointmentId
            ),
        );
        },
        [],
    );

    const value = useMemo(
        () => ({appointments,addAppointment,removeAppointment}),
        [appointments,addAppointment,removeAppointment],
    );

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    )
}