import { useAuth } from "@clerk/expo";
import {
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
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
  updateAppointment: (appointment: Appointment) => void;
  removeAppointment: (appointmentId: string) => void;
  cancelAppointment: (appointmentId: string) => Promise<void>;
  refreshAppointments: () => void;
};

export const AppointmentContext = createContext<
  AppointmentsContextValue | undefined
>(undefined);

export function AppointmentsProvider({ children }: PropsWithChildren) {
  const { sessionId } = useAuth();
  // Clear private state and invalidate old requests when accounts change.
  return (
    <SessionAppointmentsProvider key={sessionId ?? "signed-out"}>
      {children}
    </SessionAppointmentsProvider>
  );
}

function SessionAppointmentsProvider({ children }: PropsWithChildren) {
  const { authenticatedRequest } = useAuthenticatedApi();
  const {
    appointments,
    isLoading,
    error,
    refreshAppointments,
    upsertAppointment,
    removeAppointment,
  } = useRemoteAppointments();
  const [cancellingAppointmentId, setCancellingAppointmentId] = useState<
    string | null
  >(null);
  const cancellation = useRef<Promise<void> | null>(null);

  const cancelAppointment = useCallback(
    (appointmentId: string) => {
      if (cancellation.current)
        return Promise.reject(
          new Error("A cancellation is already in progress"),
        );
      setCancellingAppointmentId(appointmentId);
      const request = cancelAppointmentRequest({
        authenticatedRequest,
        appointmentId,
      })
        .then(() => {
          removeAppointment(appointmentId);
          refreshAppointments();
        })
        .finally(() => {
          cancellation.current = null;
          setCancellingAppointmentId(null);
        });
      cancellation.current = request;
      return request;
    },
    [authenticatedRequest, removeAppointment, refreshAppointments],
  );

  const value = useMemo(
    () => ({
      appointments,
      isLoading,
      error,
      cancellingAppointmentId,
      addAppointment: upsertAppointment,
      updateAppointment: upsertAppointment,
      removeAppointment,
      cancelAppointment,
      refreshAppointments,
    }),
    [
      appointments,
      isLoading,
      error,
      cancellingAppointmentId,
      upsertAppointment,
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
