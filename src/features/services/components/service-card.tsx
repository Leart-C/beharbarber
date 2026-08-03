import { Pressable, Text, View } from "react-native";

import type { BarberService } from "../types/service";
import { styles } from "./service-card.styles";

type ServiceCardProps = {
  service: BarberService;
  symbol: string;
  onAdd: (service: BarberService) => void;
};

export function ServiceCard({service,symbol,onAdd}:ServiceCardProps){
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Zgjidh ${service.name}`}
            onPress={() => onAdd(service)}
            style={styles.cardPressable}
        >
            {({ pressed }) => (
            <View
                style={[
                styles.container,
                pressed && styles.cardPressed,
                ]}
            >
                <View style={styles.iconContainer}>
                <Text style={styles.icon}>{symbol}</Text>
                </View>

                <View style={styles.information}>
                <Text style={styles.name}>{service.name}</Text>

                <Text style={styles.details}>
                    {service.durationMinutes} min
                </Text>
                </View>

                <Text style={styles.price}>€{service.price}</Text>

                <View style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
                </View>
            </View>
            )}
        </Pressable>
    );
}