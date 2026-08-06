import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  View,
} from "react-native";

import { ConfirmationDialog } from "@/components/feedback/confirmation-dialog";
import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { useTranslation } from "@/features/localization/hooks/use-translation";

import { AppointmentCard } from "../components/appointment-card";
import { useAppointments } from "../hooks/use-appointments";
import type { Appointment } from "../types/appointment";
import { styles } from "./appointments-screen.styles";
import { router } from "expo-router";

export function AppointmentsScreen() {
  const { serviceName, t } = useTranslation();
  const {
    appointments,
    cancelAppointment,
    cancellingAppointmentId,
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

  const isCancelling = appointmentToCancel?.id === cancellingAppointmentId;

  const handleConfirmCancellation =
  async () => {
    if (
      !appointmentToCancel ||
      isCancelling
    ) {
      return;
    }

    try {
      await cancelAppointment(
        appointmentToCancel.id,
      );

      setAppointmentToCancel(null);
      router.replace("/(tabs)");
    } catch (error) {
      console.error(
        "Appointment cancellation failed:",
        error,
      );

      Alert.alert(
        t("home.cancellationFailedTitle"),
        t("home.cancellationFailedMessage"),
      );
    }
  };


  return (
    <SafeAreaScreen
      edges={["top", "left", "right"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>{t("appointments.title")}</Text>

        <Text style={styles.subtitle}>
          {appointments.length === 1
            ? t("appointments.countOne")
            : t("appointments.countMany", { count: appointments.length })}
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
              {t("appointments.emptyTitle")}
            </Text>

            <Text style={styles.emptyDescription}>
              {t("appointments.emptyDescription")}
            </Text>
          </View>
        )}
      </ScrollView>
      <ConfirmationDialog
        visible={appointmentToCancel !== null}
        title={t("home.cancellationTitle")}
        message={
          appointmentToCancel
            ? t("home.cancellationMessage", { name: serviceName(appointmentToCancel.serviceName) })
            : ""
        }
        confirmLabel={t("common.cancel")}
        cancelLabel={t("common.no")}
        variant="destructive"
        isLoading={isCancelling}
        onCancel={() => {
          if (!isCancelling) {
            setAppointmentToCancel(null);
          }
        }}
        onConfirm={handleConfirmCancellation}
      />
    </SafeAreaScreen>
  );
}
