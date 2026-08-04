import { router } from "expo-router";
import { Pressable, ScrollView, Text, View, Alert } from "react-native";

import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { servicesPreview } from "@/features/services/data/services-preview";

import { SelectedServiceCard } from "../components/selected-service-card";
import { serviceCategories } from "@/features/services/data/service-categories";

import { styles } from "./booking-screen.styles";
import { useMemo, useState } from "react";
import { DateSelector } from "../components/date-selector";
import { createBookingDates } from "../utils/create-booking-dates";
import { TimeSlotSelector } from "../components/time-slot-selector";
import { getPreviewTimeSlots } from "../data/availability-preview";
import { BookingSummary } from "../components/booking-summary";

type BookingScreenProps = {
    serviceId: string;
};

export function BookingScreen({serviceId}:BookingScreenProps){
    const service = servicesPreview.find(
        (item) => item.id === serviceId,
    );

    const category = service ? serviceCategories.find(
        (item) => item.id === service.categoryId,
    ) : undefined;

    const bookingDates = useMemo(
        ()=> createBookingDates(7),
        [],
    );

    const [selectedDateId, setSelectedDateId] =
        useState(bookingDates[0]?.id ?? "");

    const [selectedTimeId, setSelectedTimeId] = useState("");

    const timeSlots = useMemo(
        () => getPreviewTimeSlots(selectedDateId),
        [selectedDateId],
    )

    const selectedDate = bookingDates.find(
        (date) => date.id === selectedDateId,
    );

    const selectedTime = timeSlots.find(
        (timeSlot) => timeSlot.id === selectedTimeId,
    );

    if(!service){
        return (
            <SafeAreaScreen>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Shërbimi nuk u gjet
                    </Text>

                    <Pressable 
                        onPress={()=> router.back()}
                        style={styles.backButton}
                    >
                        <Text style={styles.backButtonText}>
                            Kthehu
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaScreen>
        );
    }

    return (
        <SafeAreaScreen>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
                <Pressable
                    onPress={() => router.back()}
                    style={styles.backLink}
                >
                    <Text style={styles.backLinkText}>‹ Kthehu</Text>
                </Pressable>

                <Text style={styles.eyebrow}>REZERVO TERMININ</Text>

                <Text style={styles.title}>Zgjidh daten dhe oren</Text>

                <View style={styles.selectedService}>
                <SelectedServiceCard
                    service={service}
                    symbol={category?.symbol ?? ""}
                    onChange={() => router.back()}
                />

                <View style={styles.dateSelector}>
                    <DateSelector
                        dates={bookingDates}
                        selectedDateId={selectedDateId}
                        onSelectDate={(date) => {
                            setSelectedDateId(date.id);
                            setSelectedTimeId("");
                        }}
                    />

                    <View style={styles.timeSelector}>
                        <TimeSlotSelector
                            timeSlots={timeSlots}
                            selectedTimeId={selectedTimeId}
                            onSelectTime={(timeSlot) => {
                                setSelectedTimeId(timeSlot.id);
                            }}
                        />

                        <View style={styles.summary}>
                            <BookingSummary
                                service={service}
                                selectedDate={selectedDate}
                                selectedTime={selectedTime}
                                onConfirm={()=> {
                                    if(!selectedDate || !selectedTime){
                                        return;
                                    }

                                    Alert.alert(
                                        "Rezervimi u konfirmua",
                                        `${service.name}, ${selectedDate.dayLabel} ${selectedDate.monthLabel}, ora ${selectedTime.label}`,
                                        [
                                            {
                                                text: "Ne rregull",
                                                onPress: ()=> {
                                                    router.replace("/(tabs)/appointments");
                                                }
                                            }
                                        ]
                                    );
                                }}
                            >

                            </BookingSummary>
                        </View>
                    </View>
                </View>
                </View>
            </ScrollView>
        </SafeAreaScreen>
    )
}