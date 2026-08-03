import { Pressable, Text, View } from "react-native";

import type { BarberService } from "@/features/services/types/service";

import { styles } from "./selected-service-card.styles";

type SelectedServiceCardProps = {
    service: BarberService;
    symbol: string;
    onChange: ()=> void;
}

export function SelectedServiceCard({service,symbol,onChange}: SelectedServiceCardProps){
    return(
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{symbol}</Text>
                </View>

                <View style={styles.information}>
                    <Text style={styles.label}>
                        SHËRBIMI I ZGJEDHUR
                    </Text>

                    <Text style={styles.name}>
                        {service.name}
                    </Text>
                </View>
            </View>

            <View style={styles.divider}/>

            <View style={styles.bottomRow}>
                <View style={styles.serviceMeta}>
                    <Text style={styles.details}>
                        Kohëzgjatja
                    </Text>

                    <Text style={styles.metaValue}>
                        {service.durationMinutes} min
                    </Text>
                    </View>

                    <View style={styles.serviceMeta}>
                    <Text style={styles.details}>
                        Çmimi
                    </Text>

                    <Text style={styles.metaValue}>
                        €{service.price}
                    </Text>
                    </View>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Ndrysho shërbimin"
                    onPress={onChange}
                    style={styles.changePressable}
                >
                    {({pressed})=>(
                        <View
                            style={[
                                styles.changeButton,
                                pressed && styles.changeButtonPressed,
                            ]}
                        >
                            <Text style={styles.changeButtonText}>
                                Ndrysho
                            </Text>
                        </View>
                    )}
                </Pressable>
            </View>
        </View>
    )
}