import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import type { BookingDate } from "../types/booking-date";
import { styles } from "./date-selector.styles";


type DateSelectorProps ={
    dates: BookingDate[];
    selectedDateId: string;
    onSelectDate: (date:BookingDate) => void;
};

export function DateSelector({dates,selectedDateId,onSelectDate}: DateSelectorProps){
    return (
        <View>
            <Text style={styles.title}>Zgjidh datën</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
            >
                {dates.map((date) => {
                    const isSelected = date.id === selectedDateId;

                    return (
                        <Pressable
                            key={date.id}
                            accessibilityRole="button"
                            accessibilityState={{
                                selected: isSelected,
                            }}
                            accessibilityLabel={`${date.weekdayLabel}, ${date.dayLabel} ${date.monthLabel}`}
                            onPress={()=> onSelectDate(date)}
                            style={styles.datePressable}
                        >
                            {({pressed}) => (
                                <View
                                    style={[
                                        styles.dateCard,
                                        isSelected && styles.selectedDateCard,
                                        pressed && styles.pressedDateCard,
                                    ]}
                                    >
                                    <Text
                                        numberOfLines={1}
                                        adjustsFontSizeToFit
                                        minimumFontScale={0.7}
                                        style={[
                                        styles.weekday,
                                        isSelected && styles.selectedText,
                                        ]}
                                    >
                                        {date.isToday
                                        ? "Sot"
                                        : date.compactWeekdayLabel}
                                    </Text>

                                    <Text
                                        style={[
                                        styles.day,
                                        isSelected && styles.selectedText,
                                        ]}
                                    >
                                        {date.dayLabel}
                                    </Text>

                                    <Text
                                        style={[
                                        styles.month,
                                        isSelected && styles.selectedText,
                                        ]}
                                    >
                                        {date.monthLabel}
                                    </Text>
                                </View>
                            )}
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    )
}