import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
} from "react-native";

import { brandColors } from "@/theme/colors";

import { styles } from "./confirm-booking-button.styles";

type ConfirmBookingButtonProps={
    onPress: () => void;
    disabled?: boolean;
    isLoading?: boolean;
};

export function ConfirmBookingButton({onPress,disabled=false,isLoading=false}:ConfirmBookingButtonProps){
    const isDisabled = disabled || isLoading;

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel="Konfirmo rezervimin"
            accessibilityState={{
                disabled: isDisabled,
                busy: isLoading,
            }}
            disabled={isDisabled}
            onPress={onPress}
            style={styles.pressable}
        >
            {({pressed})=>(
                <View
                    style={[
                        styles.button,
                        isDisabled && styles.disabledButton,
                        pressed &&
                        !isDisabled &&
                        styles.pressedButton,
                    ]}
                >
                    {isLoading ? (
                        <ActivityIndicator
                            color={brandColors.white}
                        />
                    ) : (
                        <Text style={styles.label}>
                            Konfirmo rezervimin
                        </Text>
                    )}
                </View>
            )}
        </Pressable>
    )
}