import {
  Pressable,
  Text,
  View,
} from "react-native";
import { useTranslation } from "@/features/localization/hooks/use-translation";

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
    const { locale, serviceName, t } = useTranslation();
    const startsAt = new Date(appointment.startsAt);

    const timeLabel = new Intl.DateTimeFormat(locale,{
        hour:"2-digit",
        minute:"2-digit",
        hour12:false,
    }).format(startsAt);

    const dateLabel = capitalize(
        new Intl.DateTimeFormat(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        }).format(startsAt),
    );

    const serviceLabel = [
        serviceName(appointment.serviceName),
        `€${appointment.price}`,
    ].join(" · ");

    return (
        <View style={styles.container}>
            <Text style={styles.eyebrow}>
                {t("appointments.next")}
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
        <Pressable onPress={onEdit} style={styles.actionPressable}>
            {({ pressed }) => (
            <View
                style={[
                styles.actionButton,
                pressed && styles.actionButtonPressed,
                ]}
            >
                <Text style={styles.actionText}>{t("common.change")}</Text>
            </View>
            )}
        </Pressable>

        <Pressable onPress={onCancel} style={styles.actionPressable}>
            {({ pressed }) => (
            <View
                style={[
                styles.actionButton,
                pressed && styles.actionButtonPressed,
                ]}
            >
                <Text style={styles.actionText}>{t("common.cancel")}</Text>
            </View>
            )}
        </Pressable>
        </View>
    </View>
    )
}
