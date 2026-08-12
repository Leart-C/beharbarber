import {
  HairDryer,
  Scissors,
  type Icon,
  type IconWeight,
} from "phosphor-react-native";
import { StraightRazorIcon } from "./straight-razor-icon";
import { View } from "react-native";

import type { ServiceCategoryIconName } from "../types/service-category";
import { styles } from "./service-category-icon.styles";

type ServiceCategoryIconProps = {
  name: ServiceCategoryIconName;
  size?: number;
  color?: string;
  weight?: IconWeight;
};

const icons: Record<ServiceCategoryIconName, Icon> = {
  scissors: Scissors,
  razor: StraightRazorIcon,
  "hair-dryer": HairDryer,
};

const iconScale: Record<ServiceCategoryIconName, number> = {
  scissors: 1,
  razor: 1.22,
  "hair-dryer": 1,
};

export function ServiceCategoryIcon({
  name,
  size = 28,
  color = "rgba(255, 255, 255, 0.72)",
  weight = "regular",
}: ServiceCategoryIconProps) {
  const IconComponent = icons[name];

  return (
    <View
      pointerEvents="none"
      style={styles.container}
    >
      <IconComponent
        size={size * iconScale[name]}
        color={color}
        weight={weight}
      />
    </View>
  );
}