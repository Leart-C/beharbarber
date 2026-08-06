import { Pressable, Text, View } from "react-native";
import { useTranslation } from "@/features/localization/hooks/use-translation";

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
  const { locale, serviceName, t } = useTranslation();
  const startsAt = new Date(appointment.startsAt);

  const weekday = new Intl.DateTimeFormat(locale, {
    weekday: "long",
  }).format(startsAt);

  const compactWeekday = capitalizeFirst(
    locale === "sq-AL" ? weekday.replace(/^e\s+/i, "") : weekday,
  );

  const day = new Intl.DateTimeFormat(locale, {
    day: "numeric",
  }).format(startsAt);

  const month = capitalizeFirst(
    new Intl.DateTimeFormat(locale, {
      month: "long",
    }).format(startsAt),
  );

  const time = new Intl.DateTimeFormat(locale, {
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
            {t("appointments.upcoming")}
          </Text>
        </View>
      </View>

      <View style={styles.appointment}>
        <Text style={styles.time}>{time}</Text>

        <View style={styles.serviceInformation}>
          <Text style={styles.serviceName}>
            {serviceName(appointment.serviceName)}
          </Text>

          <Text style={styles.duration}>
            {appointment.durationMinutes} min
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>{t("common.price")}</Text>

          <Text style={styles.price}>
            €{appointment.price}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("appointments.cancelAccessibility", { name: serviceName(appointment.serviceName) })}
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
                {t("common.cancel")}
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}
