import { Pressable, Text, View } from "react-native";

import type { BarberService } from "../types/service";
import { styles } from "./service-card.styles";

type ServiceCardProps = {
  service: BarberService;
  symbol: string;
  onAdd: (service: BarberService) => void;
};

export function ServiceCard({service,symbol,onAdd}:ServiceCardProps){
    return(
        <View style={styles.container}>
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

            <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Shto ${service.name}`}
                onPress={() => onAdd(service)}
                style={styles.addPressable}
            >
                {({pressed})=>(
                    <View
                        style={[
                            styles.addButton,
                            pressed && styles.addButtonPressed,
                        ]}
                    >
                        <Text style={styles.addButtonText}>+</Text>
                    </View>
                )}
            </Pressable>
        </View>
    )
}