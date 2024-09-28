import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";
import { Href } from "expo-router";
import { Tabs } from "expo-router";

import { useSession } from "../../ctx";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    const MY_ROUTE = "/sign-in" as Href;

    return <Redirect href={MY_ROUTE} />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "home",
        }}
      />
    </Tabs>
  );
}
