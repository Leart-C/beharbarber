import type {
  ComponentProps,
  ReactNode,
} from "react";
import {
  Pressable,
  Text,
  View,
} from "react-native";
import { SymbolView } from "expo-symbols";

import { brandColors } from "@/theme/colors";

import { styles } from "./profile-menu-row.styles";

type ProfileMenuRowProps = {
  icon: ComponentProps<typeof SymbolView>["name"];
  label: string;
  value?: string;
  accessibilityLabel?: string;
  trailingContent?: ReactNode;
  showChevron?: boolean;
  onPress?: () => void;
};

const chevronIcon: ComponentProps<
  typeof SymbolView
>["name"] = {
  ios: "chevron.right",
  android: "chevron_right",
  web: "chevron_right",
};

export function ProfileMenuRow({
  icon,
  label,
  value,
  accessibilityLabel,
  trailingContent,
  showChevron = false,
  onPress,
}: ProfileMenuRowProps) {
  const content = (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <SymbolView
          name={icon}
          size={19}
          tintColor={brandColors.blue}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>
          {label}
        </Text>

        {value ? (
          <Text
            numberOfLines={1}
            style={styles.value}
          >
            {value}
          </Text>
        ) : null}
      </View>

      {trailingContent}

      {showChevron ? (
        <SymbolView
          name={chevronIcon}
          size={15}
          tintColor="rgba(255, 255, 255, 0.34)"
        />
      ) : null}
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        accessibilityLabel ?? label
      }
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        pressed && styles.pressed,
      ]}
    >
      {content}
    </Pressable>
  );
}