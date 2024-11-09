import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import RouteDetail from "./RouteDetail";
import Routes from "./Routes";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function RouteStack({ navigation, route }) {
  const stackNavigation = useNavigation();

  // this is for ensuring that when clicking a second time on the Routes Tab, it doesn't go into details
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      stackNavigation.reset({
        index: 0,
        routes: [{ name: "Route" }],
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Route"
        component={Routes}
        options={{ title: "Route" }}
      />
      <Stack.Screen
        name="RouteDetail"
        component={RouteDetail}
        options={{ title: "RouteDetail" }}
      />
    </Stack.Navigator>
  );
}
