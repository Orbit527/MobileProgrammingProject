import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "./Home";
import RouteDetail from "./RouteDetail";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="RouteDetail"
        component={RouteDetail}
        options={{ title: "RouteDetail" }}
      />
    </Stack.Navigator>
  );
}
