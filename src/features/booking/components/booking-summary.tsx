import { Text, View } from "react-native";

import type { BarberService } from "@/features/services/types/service";
import { useTranslation } from "@/features/localization/hooks/use-translation";

import type { BookingDate } from "../types/booking-date";
import type { BookingTimeSlot } from "../types/booking-time-slot";
import { ConfirmBookingButton } from "./confirm-booking-button";
import { styles } from "./booking-summary.styles";


type BookingSummaryProps = {
    service: BarberService;
    selectedDate?: BookingDate;
    selectedTime?: BookingTimeSlot;
    onConfirm: () => void;
    isConfirming?: boolean;
}

export function BookingSummary({service,selectedDate,selectedTime,onConfirm,isConfirming=false}:BookingSummaryProps){
    const { serviceName, t } = useTranslation();
    const canConfirm = selectedDate !== undefined && selectedTime !== undefined;

    const dateLabel = selectedDate
    ? `${selectedDate.compactWeekdayLabel}, ${selectedDate.dayLabel} ${selectedDate.monthLabel}` : t("booking.selectDate");

    const timeLabel = selectedTime?.label ?? t("booking.selectTime");

    return (
        <View>
            <Text style={styles.title}>
                {t("booking.summary")}
            </Text>

            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>
                        {t("booking.service")}
                    </Text>

                    <Text style={styles.rowValue}>
                        {serviceName(service.name)}
                    </Text>
                </View>

                <View style={styles.divider}/>

                <View style={styles.row}>
                    <Text style={styles.rowLabel}>{t("booking.date")}</Text>

                    <Text style={styles.rowValue}>
                        {dateLabel}
                    </Text>
                </View>

                <View style={styles.divider}/>

                <View style={styles.row}>
                    <Text style={styles.rowLabel}>{t("booking.time")}</Text>

                    <Text style={styles.rowValue}>
                        {timeLabel}
                    </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                    <Text style={styles.rowLabel}>
                        {t("common.duration")}
                    </Text>

                    <Text style={styles.rowValue}>
                        {service.durationMinutes} min
                    </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                    <Text style={styles.totalLabel}>
                        {t("booking.total")}
                    </Text>

                    <Text style={styles.totalValue}>
                        €{service.price}
                    </Text>
                    </View>
                </View>

                <View style={styles.confirmButton}>
                    <ConfirmBookingButton
                    onPress={onConfirm}
                    disabled={!canConfirm}
                    isLoading={isConfirming}
                    />
                </View>
        </View>
    )
}
