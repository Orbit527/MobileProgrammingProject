import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import RouteDetail from "./RouteDetail";
import Routes from "./Routes";

const Stack = createNativeStackNavigator();

export default function RouteStack() {
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
