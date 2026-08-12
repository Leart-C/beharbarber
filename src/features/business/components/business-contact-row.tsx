import type { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";
import { SymbolView } from "expo-symbols";

import { brandColors } from "@/theme/colors";

import { styles } from "./business-contact-row.styles";

type BusinessContactRowProps = {
  icon: ComponentProps<typeof SymbolView>["name"];
  label: string;
  value: string;
  accessibilityLabel: string;
  onPress: () => void;
};

const arrowIcon: ComponentProps<typeof SymbolView>["name"] = {
  ios: "chevron.right",
  android: "chevron_right",
  web: "chevron_right",
};

export function BusinessContactRow({
  icon,
  label,
  value,
  accessibilityLabel,
  onPress,
}: BusinessContactRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={styles.pressable}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.container,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.iconContainer}>
            <SymbolView
              name={icon}
              size={19}
              tintColor={brandColors.blue}
            />
          </View>

          <View style={styles.content}>
            <Text numberOfLines={1} style={styles.label}>
              {label}
            </Text>

            <Text numberOfLines={1} style={styles.value}>
              {value}
            </Text>
          </View>

          <SymbolView
            name={arrowIcon}
            size={15}
            tintColor="rgba(255, 255, 255, 0.32)"
          />
        </View>
      )}
    </Pressable>
  );
}