import { useSSO } from "@clerk/expo";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { Platform } from "react-native";
import { useTranslation } from "@/features/localization/hooks/use-translation";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleSignIn(){
    const { t } = useTranslation();
    const {startSSOFlow} = useSSO();

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    useEffect(()=> {
        if(Platform.OS !== 'android'){
            return;
        }

        void WebBrowser.warmUpAsync();

        return () =>{
            void WebBrowser.coolDownAsync();
        };
    }, []);

    const clearError = useCallback(()=>{
        setErrorMessage(null);
    },[])

    const signInWithGoogle = useCallback(async ()=>{
        if(isLoading){
            return;
        }

        setIsLoading(true);
        setErrorMessage(null);

        try {
            const redirectUrl = AuthSession.makeRedirectUri({
                scheme:"beharbarber",
                path:"oauth-callback",
            });

            const{
                createdSessionId,
                setActive,
                authSessionResult,
            } = await startSSOFlow({
                strategy: "oauth_google",
                redirectUrl,
            });

            if(
                authSessionResult?.type === "cancel" ||
                authSessionResult?.type === "dismiss"
            ){
                return;
            }
            if (!createdSessionId || !setActive) {
                throw new Error(
                "Google authentication did not create a session",
                );
            }

            await setActive({
                session:createdSessionId,
            });
        } catch (error) {
            console.error("Google sign-in failed:", error);
            setErrorMessage(t("auth.googleError"));
        }finally{
            setIsLoading(false);
        }
    },[isLoading,startSSOFlow,t]);

    return {
        signInWithGoogle,
        isLoading,
        errorMessage,
        clearError
    }
}
