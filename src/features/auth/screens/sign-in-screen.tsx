import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { AuthBackground } from "../components/auth-background";
import { useAppleSignIn } from "../hooks/use-apple-sign-in";
import { useGoogleSignIn } from "../hooks/use-google-sign-in";
import { ScrollView, View, Text } from "react-native";
import { BarberBrand } from "../components/barber-brand";
import { styles } from "./sign-in-screen.styles";
import { AppleSignInButton } from "../components/apple-sign-in-button";
import { GoogleSignInButton } from "../components/google-sign-in-button";
import { useTranslation } from "@/features/localization/hooks/use-translation";


export function SignInScreen(){
    const { t } = useTranslation();
    const google = useGoogleSignIn();
    const apple = useAppleSignIn();

    // Only one provider flow may run at a time.
    const isBusy = google.isLoading || apple.isLoading;
    const errorMessage = apple.errorMessage ?? google.errorMessage;

    function handleApplePress() {
        google.clearError();
        void apple.signInWithApple();
    }

    function handleGooglePress() {
        apple.clearError();
        void google.signInWithGoogle();
    }

    return(
        <AuthBackground>
            <SafeAreaScreen className="bg-transparent">
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    >
                        <View style={styles.content}>
                            <BarberBrand/>

                            <View style={styles.actions}>
                                <AppleSignInButton
                                    onPress={handleApplePress}
                                    isLoading={apple.isLoading}
                                    disabled={isBusy}
                                />

                                <GoogleSignInButton
                                    onPress={handleGooglePress}
                                    isLoading={google.isLoading}
                                    disabled={isBusy}
                                />

                                {errorMessage ? (
                                    <Text
                                        accessibilityRole="alert"
                                        style={styles.errorMessage}
                                    >
                                        {errorMessage}
                                    </Text>
                                ):null}

                                <Text style={styles.attribution}>
                                    {t("auth.attribution")}{" "}
                                    <Text style={styles.attributionBrand}>
                                        Clerk
                                    </Text>
                                </Text>
                            </View>
                        </View>
                </ScrollView>
            </SafeAreaScreen>
        </AuthBackground>
    )
}
