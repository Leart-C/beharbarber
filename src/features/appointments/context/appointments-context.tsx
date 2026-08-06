import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { PropsWithChildren } from "react";

import { useAuthenticatedApi } from "@/hooks/use-authenticated-api";

import { cancelAppointment as cancelAppointmentRequest } from "../api/cancel-appointment";
import { useRemoteAppointments } from "../hooks/use-remote-appointments";
import type { Appointment } from "../types/appointment";

type AppointmentsContextValue = {
  appointments: Appointment[];
  isLoading: boolean;
  error: Error | null;
  cancellingAppointmentId: string | null;
  addAppointment: (appointment: Appointment) => void;
  removeAppointment: (appointmentId: string) => void;
  cancelAppointment: (appointmentId: string) => Promise<void>;
  refreshAppointments: () => void;
};

export const AppointmentContext = createContext<
  AppointmentsContextValue | undefined
>(undefined);

export function AppointmentsProvider({
  children,
}: PropsWithChildren) {
  const { authenticatedRequest } = useAuthenticatedApi();

  const {
    appointments: remoteAppointments,
    isLoading,
    error,
    refreshAppointments,
  } = useRemoteAppointments();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [cancellingAppointmentId, setCancellingAppointmentId] =
    useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !error) {
      setAppointments(remoteAppointments);
    }
  }, [remoteAppointments, isLoading, error]);

  const addAppointment = useCallback((appointment: Appointment) => {
    setAppointments((currentAppointments) => [
      appointment,
      ...currentAppointments.filter(
        (currentAppointment) =>
          currentAppointment.id !== appointment.id,
      ),
    ]);
  }, []);

  const removeAppointment = useCallback((appointmentId: string) => {
    setAppointments((currentAppointments) =>
      currentAppointments.filter(
        (appointment) => appointment.id !== appointmentId,
      ),
    );
  }, []);

  const cancelAppointment = useCallback(
    async (appointmentId: string) => {
      setCancellingAppointmentId(appointmentId);

      try {
        await cancelAppointmentRequest({
          authenticatedRequest,
          appointmentId,
        });

        setAppointments((currentAppointments) =>
          currentAppointments.filter(
            (appointment) => appointment.id !== appointmentId,
          ),
        );

        refreshAppointments();
      } finally {
        setCancellingAppointmentId(null);
      }
    },
    [authenticatedRequest, refreshAppointments],
  );

  const value = useMemo(
    () => ({
      appointments,
      isLoading,
      error,
      cancellingAppointmentId,
      addAppointment,
      removeAppointment,
      cancelAppointment,
      refreshAppointments,
    }),
    [
      appointments,
      isLoading,
      error,
      cancellingAppointmentId,
      addAppointment,
      removeAppointment,
      cancelAppointment,
      refreshAppointments,
    ],
  );

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
}