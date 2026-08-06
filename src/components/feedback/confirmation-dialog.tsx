import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";

import { styles } from "./confirmation-dialog.styles";
import { brandColors } from "@/theme/colors";

type ConfirmationDialogProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  isLoading?: boolean;
  variant?: "default" | "destructive";
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmationDialog({
  visible,
  title,
  isLoading = false,
  message,
  confirmLabel,
  cancelLabel = "Jo",
  variant = "default",
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  const isDestructive =
    variant === "destructive";

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View
          accessibilityRole="alert"
          style={styles.card}
        >
          <View
            style={[
              styles.iconCircle,
              isDestructive &&
                styles.destructiveIconCircle,
            ]}
          >
            <Text
              style={[
                styles.icon,
                isDestructive &&
                  styles.destructiveIcon,
              ]}
            >
              {isDestructive ? "!" : "?"}
            </Text>
          </View>

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>
            {message}
          </Text>

          <View style={styles.actions}>
            <Pressable
              disabled={isLoading}
              onPress={onCancel}
              style={styles.actionPressable}
            >
              {({ pressed }) => (
                <View
                  style={[
                    styles.cancelButton,
                    pressed && styles.pressedButton,
                  ]}
                >
                  <Text style={styles.cancelLabel}>
                    {cancelLabel}
                  </Text>
                </View>
              )}
            </Pressable>

            <Pressable
              disabled={isLoading}
              onPress={onConfirm}
              style={styles.actionPressable}
            >
              {({ pressed }) => (
                <View
                  style={[
                    styles.confirmButton,
                    isDestructive &&
                      styles.destructiveButton,
                    pressed && styles.pressedButton,
                  ]}
                >
                  {isLoading ? (
                    <ActivityIndicator
                      color={brandColors.white}
                    />
                  ) : (
                    <Text style={styles.confirmLabel}>
                      {confirmLabel}
                    </Text>
                  )}
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}