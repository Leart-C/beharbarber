import { Pressable, Text, View } from "react-native";

import type { BookingTimeSlot } from "../types/booking-time-slot";
import { styles } from "./time-slot-selector.styles";

type TimeSlotSelectorProps = {
  timeSlots: BookingTimeSlot[];
  selectedTimeId: string;
  onSelectTime: (timeSlot: BookingTimeSlot) => void;
};

export function TimeSlotSelector({
  timeSlots,
  selectedTimeId,
  onSelectTime,
}: TimeSlotSelectorProps) {
  return (
    <View>
      <Text style={styles.title}>Zgjidh orën</Text>

      <View style={styles.availabilityHint}>
        <View style={styles.hintLine} />

        <Text style={styles.hintText}>
          Orari me vijë nuk është i disponueshëm
        </Text>
      </View>

      <View style={styles.grid}>
        {timeSlots.map((timeSlot) => {
          const isSelected =
            timeSlot.id === selectedTimeId;

          return (
            <Pressable
              key={timeSlot.id}
              accessibilityRole="button"
              accessibilityState={{
                selected: isSelected,
                disabled: !timeSlot.isAvailable,
              }}
              accessibilityLabel={`Ora ${timeSlot.label}`}
              disabled={!timeSlot.isAvailable}
              onPress={() => onSelectTime(timeSlot)}
              style={styles.timePressable}
            >
              {({ pressed }) => (
                <View
                  style={[
                    styles.timeButton,
                    isSelected && styles.selectedTimeButton,
                    !timeSlot.isAvailable &&
                      styles.unavailableTimeButton,
                    pressed &&
                      timeSlot.isAvailable &&
                      styles.pressedTimeButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.timeText,
                      isSelected && styles.selectedTimeText,
                      !timeSlot.isAvailable &&
                        styles.unavailableTimeText,
                    ]}
                  >
                    {timeSlot.label}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}