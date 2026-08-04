import { Pressable, Text, View } from "react-native";

import type { Appointment } from "../types/appointment";
import { styles } from "./appointment-card.styles";

type AppointmentCardProps = {
  appointment: Appointment;
  onCancel: () => void;
};

function capitalizeFirst(value: string): string {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function AppointmentCard({
  appointment,
  onCancel,
}: AppointmentCardProps) {
  const startsAt = new Date(appointment.startsAt);

  const weekday = new Intl.DateTimeFormat("sq-AL", {
    weekday: "long",
  }).format(startsAt);

  const compactWeekday = capitalizeFirst(
    weekday.replace(/^e\s+/i, ""),
  );

  const day = new Intl.DateTimeFormat("sq-AL", {
    day: "numeric",
  }).format(startsAt);

  const month = capitalizeFirst(
    new Intl.DateTimeFormat("sq-AL", {
      month: "long",
    }).format(startsAt),
  );

  const time = new Intl.DateTimeFormat("sq-AL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(startsAt);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>
          {compactWeekday}, {day} {month}
        </Text>

        <View style={styles.status}>
          <Text style={styles.statusText}>
            I ardhshëm
          </Text>
        </View>
      </View>

      <View style={styles.appointment}>
        <Text style={styles.time}>{time}</Text>

        <View style={styles.serviceInformation}>
          <Text style={styles.serviceName}>
            {appointment.serviceName}
          </Text>

          <Text style={styles.duration}>
            {appointment.durationMinutes} min
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>Çmimi</Text>

          <Text style={styles.price}>
            €{appointment.price}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Anulo ${appointment.serviceName}`}
          onPress={onCancel}
          style={styles.cancelPressable}
        >
          {({ pressed }) => (
            <View
              style={[
                styles.cancelButton,
                pressed && styles.cancelButtonPressed,
              ]}
            >
              <Text style={styles.cancelButtonText}>
                Anulo
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}