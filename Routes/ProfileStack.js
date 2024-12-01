import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Profile from "./Profile";
import Register from "./Register";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {

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
