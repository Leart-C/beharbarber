import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { appFonts } from "@/theme/fonts";

void SplashScreen.preventAutoHideAsync();

const useAppFonts = () => {
    const [fontsLoaded,fontError] = useFonts(appFonts);

    useEffect(()=>{
        if(fontsLoaded || fontError){
            void SplashScreen.hideAsync();
        }
    },[fontsLoaded,fontError]);

    if(fontError){
        throw fontError;
    }

    return fontsLoaded;
  
}

export default useAppFonts