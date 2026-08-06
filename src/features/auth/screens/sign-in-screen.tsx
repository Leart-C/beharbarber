import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { AuthBackground } from "../components/auth-background";
import { useGoogleSignIn } from "../hooks/use-google-sign-in";
import { ScrollView, View, Text } from "react-native";
import { BarberBrand } from "../components/barber-brand";
import { styles } from "./sign-in-screen.styles";
import { GoogleSignInButton } from "../components/google-sign-in-button";
import { useTranslation } from "@/features/localization/hooks/use-translation";


export function SignInScreen(){
    const { t } = useTranslation();
    const {
        signInWithGoogle,
        isLoading,
        errorMessage,
    } = useGoogleSignIn();

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
                                <GoogleSignInButton
                                    onPress={signInWithGoogle}
                                    isLoading={isLoading}
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
