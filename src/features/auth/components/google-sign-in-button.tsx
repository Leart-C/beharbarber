import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
} from "react-native";

import { brandColors } from "@/theme/colors";

import { styles } from "./google-sign-in-button.styles";

type GoogleSignInButtonProps = {
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

export function GoogleSignInButton({
  onPress,
  isLoading = false,
  disabled = false,
}: GoogleSignInButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Vazhdo me Google"
      accessibilityState={{
        disabled: isDisabled,
        busy: isLoading,
      }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={brandColors.white} />
      ) : (
        <>
          <View style={styles.googleIconContainer}>
            <Text style={styles.googleIconText}>G</Text>
          </View>

          <Text style={styles.label}>
            Vazhdo me Google
          </Text>
        </>
      )}
    </Pressable>
  );
}