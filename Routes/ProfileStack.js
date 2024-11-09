import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import RouteDetail from "./RouteDetail";
import Routes from "./Routes";
import { useNavigation } from "@react-navigation/native";
import Profile from "./Profile";
import Register from "./Register";

const Stack = createNativeStackNavigator();

export default function ProfileStack({ navigation, route }) {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Register" }}
      />
    </Stack.Navigator>
  );
}
