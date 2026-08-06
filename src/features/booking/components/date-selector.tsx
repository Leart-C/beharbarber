import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import type { BookingDate } from "../types/booking-date";
import { styles } from "./date-selector.styles";
import { useTranslation } from "@/features/localization/hooks/use-translation";


type DateSelectorProps ={
    dates: BookingDate[];
    selectedDateId: string;
    onSelectDate: (date:BookingDate) => void;
};

export function DateSelector({dates,selectedDateId,onSelectDate}: DateSelectorProps){
    const { t } = useTranslation();
    return (
        <View>
            <Text style={styles.title}>{t("booking.selectDate")}</Text>

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
                                        ? t("booking.today")
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
