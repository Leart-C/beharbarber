import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { PropsWithChildren } from "react";

import { useRemoteAppointments } from "../hooks/use-remote-appointments";
import type { Appointment } from "../types/appointment";

type AppointmentsContextValue = {
  appointments: Appointment[];
  isLoading: boolean;
  error: Error | null;
  addAppointment: (appointment: Appointment) => void;
  removeAppointment: (appointmentId: string) => void;
  refreshAppointments: () => void;
};

export const AppointmentContext = createContext<
  AppointmentsContextValue | undefined
>(undefined);

export function AppointmentsProvider({
  children,
}: PropsWithChildren) {
  const {
    appointments: remoteAppointments,
    isLoading,
    error,
    refreshAppointments,
  } = useRemoteAppointments();

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (!isLoading && !error) {
      setAppointments(remoteAppointments);
    }
  }, [remoteAppointments, isLoading, error]);

  const addAppointment = useCallback(
    (appointment: Appointment) => {
      setAppointments((currentAppointments) => [
        appointment,
        ...currentAppointments.filter(
          (currentAppointment) =>
            currentAppointment.id !== appointment.id,
        ),
      ]);
    },
    [],
  );

  const removeAppointment = useCallback(
    (appointmentId: string) => {
      setAppointments((currentAppointments) =>
        currentAppointments.filter(
          (appointment) =>
            appointment.id !== appointmentId,
        ),
      );
    },
    [],
  );

  const value = useMemo(
    () => ({
      appointments,
      isLoading,
      error,
      addAppointment,
      removeAppointment,
      refreshAppointments,
    }),
    [
      appointments,
      isLoading,
      error,
      addAppointment,
      removeAppointment,
      refreshAppointments,
    ],
  );

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
}