import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { AuthBackground } from "../components/auth-background";
import { useGoogleSignIn } from "../hooks/use-google-sign-in";
import { ScrollView, View, Text } from "react-native";
import { BarberBrand } from "../components/barber-brand";
import { styles } from "./sign-in-screen.styles";
import { GoogleSignInButton } from "../components/google-sign-in-button";


export function SignInScreen(){
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
                                    SignIn from{" "}
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