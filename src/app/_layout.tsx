import { Stack } from "expo-router";
import { AppProvider } from "@/providers/app-provider";
import useAppFonts from "@/hooks/use-app-fonts";
import "../../global.css";

export default function RootLayout() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AppProvider>
  );
}