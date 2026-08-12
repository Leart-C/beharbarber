import {
  Text,
  View,
} from "react-native";

import { useTranslation } from "@/features/localization/hooks/use-translation";

import type { BarberService } from "../types/service";
import type { ServiceCategoryIconName } from "../types/service-category";
import { ServiceCard } from "./service-card";
import { styles } from "./service-list.styles";

type ServiceListProps = {
  title: string;
  iconName: ServiceCategoryIconName;
  services: BarberService[];
  onAddService: (
    service: BarberService,
  ) => void;
};

export function ServiceList({
  title,
  iconName,
  services,
  onAddService,
}: ServiceListProps) {
  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.count}>
          {services.length === 1
            ? t("services.countOne")
            : t("services.countMany", {
                count: services.length,
              })}
        </Text>
      </View>

      {services.length > 0 ? (
        <View style={styles.list}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              iconName={iconName}
              onAdd={onAddService}
            />
          ))}
        </View>
      ) : (
        <Text style={styles.emptyMessage}>
          {t("services.empty")}
        </Text>
      )}
    </View>
  );
}