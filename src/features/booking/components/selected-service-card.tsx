import { Pressable, Text, View } from "react-native";

import type { BarberService } from "@/features/services/types/service";
import { useTranslation } from "@/features/localization/hooks/use-translation";
import { brandColors } from "@/theme/colors";
import { ServiceCategoryIcon } from "@/features/services/components/service-category-icon";
import type { ServiceCategoryIconName } from "@/features/services/types/service-category";
import { styles } from "./selected-service-card.styles";

type SelectedServiceCardProps = {
  service: BarberService;
  iconName: ServiceCategoryIconName;
  onChange: () => void;
};

export function SelectedServiceCard({service,iconName,onChange}: SelectedServiceCardProps){
    const { serviceName, t } = useTranslation();
    return(
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View style={styles.iconContainer}>
                <ServiceCategoryIcon
                    name={iconName}
                    size={30}
                    color={brandColors.blue}
                />
                </View>

                <View style={styles.information}>
                    <Text style={styles.label}>
                        {t("booking.selectedService")}
                    </Text>

                    <Text style={styles.name}>
                        {serviceName(service.name)}
                    </Text>
                </View>
            </View>

            <View style={styles.divider}/>

            <View style={styles.bottomRow}>
                <View style={styles.serviceMeta}>
                    <Text style={styles.details}>
                        {t("common.duration")}
                    </Text>

                    <Text style={styles.metaValue}>
                        {service.durationMinutes} min
                    </Text>
                    </View>

                    <View style={styles.serviceMeta}>
                    <Text style={styles.details}>
                        {t("common.price")}
                    </Text>

                    <Text style={styles.metaValue}>
                        €{service.price}
                    </Text>
                    </View>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={t("booking.changeService")}
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
                                {t("common.change")}
                            </Text>
                        </View>
                    )}
                </Pressable>
            </View>
        </View>
    )
}
