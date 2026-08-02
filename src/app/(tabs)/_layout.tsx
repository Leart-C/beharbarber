import { useAuth } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";

export default function TabsLayout() {
  const { isLoaded, isSignedIn } = useAuth({
    treatPendingAsSignedOut: false,
  });

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Tabs screenOptions={{headerShown:false}}/>;
}