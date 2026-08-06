import {
  Pressable,
  Text,
  View,
} from "react-native";

import { styles } from "./barber-alert.styles";
import { useTranslation } from "@/features/localization/hooks/use-translation";

type BarberAlertProps = {
  message: string;
  onDismiss?: () => void;
};

export function BarberAlert({
    message,
    onDismiss,
}: BarberAlertProps){
    const { t } = useTranslation();
    return(
        <View
            accessible
            accessibilityLiveRegion="polite"
            style={styles.container}
        >
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>!</Text>
            </View>

            <Text style={styles.message}>
                {message}
            </Text>

            {onDismiss ? (
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={t("home.dismissAnnouncement")}
                    hitSlop={8}
                    onPress={onDismiss}
                    style={({pressed})=>[
                        styles.dismissButton,
                        pressed && styles.dismissButtonPressed,
                    ]}
                >
                    <Text style={styles.dismissIcon}>×</Text>
                </Pressable>
            ): null}
        </View>
    )
}
