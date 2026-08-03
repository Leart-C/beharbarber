import {
  Pressable,
  Text,
  View,
} from "react-native";

import type { Appointment } from "../types/appointment";
import { styles } from "./upcoming-appointment-card.styles";

type UpcomingAppointmentCardProps = {
    appointment: Appointment;
    onEdit: ()=> void;
    onCancel: ()=> void;
}

function capitalize(value:string){
    if(!value){
        return value;
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function UpcomingAppointmentCard({appointment,onEdit,onCancel}:UpcomingAppointmentCardProps){
    const startsAt = new Date(appointment.startsAt);

    const timeLabel = new Intl.DateTimeFormat("sq-AL",{
        hour:"2-digit",
        minute:"2-digit",
        hour12:false,
    }).format(startsAt);

    const dateLabel = capitalize(
        new Intl.DateTimeFormat("sq-AL", {
        weekday: "short",
        day: "numeric",
        month: "long",
        }).format(startsAt),
    );

    const serviceLabel = [
        appointment.serviceName,
        `€${appointment.price}`,
    ].join(" · ");

    return (
        <View style={styles.container}>
            <Text style={styles.eyebrow}>
                Termini yt i radhës
            </Text>

            <View style={styles.appointmentDetails}>
                <Text style={styles.time}>
                {timeLabel}
                </Text>

                <View style={styles.information}>
                <Text style={styles.date}>
                    {dateLabel}
                </Text>

                <Text
                    style={styles.service}
                    numberOfLines={2}
                >
                    {serviceLabel}
                </Text>
                </View>
            </View>

        <View style={styles.actions}>
            <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ndrysho terminin"
            onPress={onEdit}
            style={({ pressed }) => [
                styles.actionButton,
                pressed && styles.actionButtonPressed,
            ]}
            >
            <Text style={styles.actionLabel}>
                Ndrysho
            </Text>
            </Pressable>

            <Pressable
            accessibilityRole="button"
            accessibilityLabel="Anulo terminin"
            onPress={onCancel}
            style={({ pressed }) => [
                styles.actionButton,
                pressed && styles.actionButtonPressed,
            ]}
            >
            <Text style={styles.actionLabel}>
                Anulo
            </Text>
            </Pressable>
        </View>
    </View>
    )
}

