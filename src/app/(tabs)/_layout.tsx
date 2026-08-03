import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";

import { brandColors } from "@/theme/colors";

export default function TabsLayout(){
  const {isLoaded, isSignedIn} = useAuth({
    treatPendingAsSignedOut: false,
  });

  if(!isLoaded){
    return null;
  }

  if(!isSignedIn){
    return <Redirect href={"/(auth)/sign-in"}/>;
  }

  return (
    <NativeTabs tintColor={brandColors.blue}>
      <NativeTabs.Trigger name="index" disableAutomaticContentInsets>

        <NativeTabs.Trigger.Icon
          sf={{
            default:"house",
            selected:"house.fill"
          }}
          md="home"
        />
      
        <NativeTabs.Trigger.Label>
          Ballina
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="appointments">
        <NativeTabs.Trigger.Icon
          sf={{
            default:"calendar",
            selected:"calendar.circle.fill"
          }}
          md="calendar_month"
        />
        <NativeTabs.Trigger.Label>
          Terminet
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon
          sf={{
            default: "person",
            selected: "person.fill",
          }}
          md="person"
        />

        <NativeTabs.Trigger.Label>
          Profili
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}