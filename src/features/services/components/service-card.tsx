import { Pressable, Text, View } from "react-native";
import { useTranslation } from "@/features/localization/hooks/use-translation";
import { brandColors } from "@/theme/colors";
import type { ServiceCategoryIconName } from "../types/service-category";
import { ServiceCategoryIcon } from "./service-category-icon";
import type { BarberService } from "../types/service";
import { styles } from "./service-card.styles";

type ServiceCardProps = {
  service: BarberService;
  iconName: ServiceCategoryIconName;
  onAdd: (service: BarberService) => void;
};

export function ServiceCard({service,iconName,onAdd}:ServiceCardProps){
    const { serviceName, t } = useTranslation();
    const localizedName = serviceName(service.name);
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("services.select", { name: localizedName })}
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
                <ServiceCategoryIcon
                    name={iconName}
                    size={27}
                    color={brandColors.blue}
                />
                </View>

                <View style={styles.information}>
                <Text style={styles.name}>{localizedName}</Text>

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
