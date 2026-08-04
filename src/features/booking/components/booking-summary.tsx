import { Text, View } from "react-native";

import type { BarberService } from "@/features/services/types/service";

import type { BookingDate } from "../types/booking-date";
import type { BookingTimeSlot } from "../types/booking-time-slot";
import { ConfirmBookingButton } from "./confirm-booking-button";
import { styles } from "./booking-summary.styles";


type BookingSummaryProps = {
    service: BarberService;
    selectedDate?: BookingDate;
    selectedTime?: BookingTimeSlot;
    onConfirm: () => void;
}

export function BookingSummary({service,selectedDate,selectedTime,onConfirm}:BookingSummaryProps){
    const canConfirm = selectedDate !== undefined && selectedTime !== undefined;

    const dateLabel = selectedDate
    ? `${selectedDate.compactWeekdayLabel}, ${selectedDate.dayLabel} ${selectedDate.monthLabel}` : "Zgjidh daten";

    const timeLabel = selectedTime?.label ?? "Zgjidh oren";

    return (
        <View>
            <Text style={styles.title}>
                Përmbledhja
            </Text>

            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>
                        Shërbimi
                    </Text>

                    <Text style={styles.rowValue}>
                        {service.name}
                    </Text>
                </View>

                <View style={styles.divider}/>

                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Data</Text>

                    <Text style={styles.rowValue}>
                        {dateLabel}
                    </Text>
                </View>

                <View style={styles.divider}/>

                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Ora</Text>

                    <Text style={styles.rowValue}>
                        {timeLabel}
                    </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                    <Text style={styles.rowLabel}>
                        Kohëzgjatja
                    </Text>

                    <Text style={styles.rowValue}>
                        {service.durationMinutes} min
                    </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                    <Text style={styles.totalLabel}>
                        Totali
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
                    />
                </View>
        </View>
    )
}