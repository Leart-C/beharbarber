import {
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";

import { styles } from "./confirmation-dialog.styles";

type ConfirmationDialogProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmationDialog({
  visible,
  title,
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
                  <Text style={styles.confirmLabel}>
                    {confirmLabel}
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}