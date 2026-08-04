import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
} from "react-native";

import { ConfirmationDialog } from "@/components/feedback/confirmation-dialog";
import { SafeAreaScreen } from "@/components/layout/safe-area-screen";

import { AppointmentCard } from "../components/appointment-card";
import { useAppointments } from "../hooks/use-appointments";
import type { Appointment } from "../types/appointment";
import { styles } from "./appointments-screen.styles";
import { router } from "expo-router";

export function AppointmentsScreen() {
  const {
    appointments,
    removeAppointment,
  } = useAppointments();

  const [
    appointmentToCancel,
    setAppointmentToCancel,
  ] = useState<Appointment | null>(null);

  const sortedAppointments = [...appointments].sort(
    (first, second) =>
      new Date(first.startsAt).getTime() -
      new Date(second.startsAt).getTime(),
  );


  return (
    <SafeAreaScreen
      edges={["top", "left", "right"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Terminet</Text>

        <Text style={styles.subtitle}>
          {appointments.length === 1
            ? "1 termin i rezervuar"
            : `${appointments.length} termine të rezervuara`}
        </Text>

        {sortedAppointments.length > 0 ? (
          <View style={styles.list}>
            {sortedAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onCancel={() => {
                  setAppointmentToCancel(appointment);
                }}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>□</Text>
            </View>

            <Text style={styles.emptyTitle}>
              Nuk ke termine
            </Text>

            <Text style={styles.emptyDescription}>
              Zgjidh një shërbim nga Ballina për të
              rezervuar terminin tënd.
            </Text>
          </View>
        )}
      </ScrollView>
      <ConfirmationDialog
        visible={appointmentToCancel !== null}
        title="Anulo terminin?"
        message={
          appointmentToCancel
            ? `A je i sigurt që dëshiron të anulosh ${appointmentToCancel.serviceName}?`
            : ""
        }
        confirmLabel="Anulo"
        cancelLabel="Jo"
        variant="destructive"
        onCancel={() => {
          setAppointmentToCancel(null);
        }}
        onConfirm={() => {
          if (!appointmentToCancel) {
            return;
          }

          removeAppointment(appointmentToCancel.id);
          setAppointmentToCancel(null);

          router.replace("/(tabs)");
        }}
      />
    </SafeAreaScreen>
  );
}

