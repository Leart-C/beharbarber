import { useSSO } from "@clerk/expo";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { Platform } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_SIGN_IN_ERROR = "Hyrja me Google dështoi. Provo përsëri.";

export function useGoogleSignIn(){
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
            setErrorMessage(GOOGLE_SIGN_IN_ERROR);
        }finally{
            setIsLoading(false);
        }
    },[isLoading,startSSOFlow]);

    return {
        signInWithGoogle,
        isLoading,
        errorMessage,
        clearError
    }
}