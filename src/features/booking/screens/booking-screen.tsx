import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { servicesPreview } from "@/features/services/data/services-preview";

import { SelectedServiceCard } from "../components/selected-service-card";
import { serviceCategories } from "@/features/services/data/service-categories";

import { styles } from "./booking-screen.styles";

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
            <View style={styles.container}>
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
                </View>
            </View>
        </SafeAreaScreen>
    )
}