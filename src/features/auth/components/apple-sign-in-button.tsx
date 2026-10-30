import { SymbolView } from "expo-symbols";
import { ActivityIndicator, Platform, Pressable, Text, View } from "react-native";

import { useTranslation } from "@/features/localization/hooks/use-translation";
import { brandColors } from "@/theme/colors";

import { styles } from "./apple-sign-in-button.styles";

type AppleSignInButtonProps = {
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

// Same layout as GoogleSignInButton. Apple's guidelines only allow black or
// white for Sign in with Apple buttons, so this one is black, not brand blue.
export function AppleSignInButton({
  onPress,
  isLoading = false,
  disabled = false,
}: AppleSignInButtonProps) {
  const { t } = useTranslation();
  const isDisabled = disabled || isLoading;

  if (Platform.OS !== "ios") {
    return null;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t("auth.apple")}
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
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator color={brandColors.white} />
        ) : (
          <>
            <View style={styles.appleIconContainer}>
              <SymbolView
                name="apple.logo"
                size={18}
                tintColor="#000000"
                style={styles.appleIcon}
              />
            </View>

            <Text style={styles.label}>{t("auth.apple")}</Text>
          </>
        )}
      </View>
    </Pressable>
  );
}
