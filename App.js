import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { BottomNavigation, PaperProvider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "./Routes/Home";
import Settings from "./Routes/Settings";
import Track from "./Routes/Track";

import { CommonActions } from "@react-navigation/native";
import ProfileStack from "./Routes/ProfileStack";
import RoutesStack from "./Routes/RoutesStack";
import { SettingsProvider } from "./Helper/SettingsProvider";
import HomeStack from "./Routes/HomeStack";
import { useKeepAwake } from "expo-keep-awake";

const Tab = createBottomTabNavigator();

// Nagivation was mostly taken from: https://callstack.github.io/react-native-paper/docs/components/BottomNavigation/BottomNavigationBar

export default function App() {
  useKeepAwake();

  return (
    <PaperProvider>
      <SettingsProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
              <BottomNavigation.Bar
                navigationState={state}
                safeAreaInsets={insets}
                onTabPress={({ route, preventDefault }) => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (event.defaultPrevented) {
                    preventDefault();
                  } else {
                    navigation.dispatch({
                      ...CommonActions.navigate(route.name, route.params),
                      target: state.key,
                    });
                  }
                }}
                renderIcon={({ route, focused, color }) => {
                  const { options } = descriptors[route.key];
                  if (options.tabBarIcon) {
                    return options.tabBarIcon({ focused, color, size: 24 });
                  }

                  return null;
                }}
                getLabelText={({ route }) => {
                  const { options } = descriptors[route.key];
                  const label =
                    options.tabBarLabel !== undefined
                      ? options.tabBarLabel
                      : options.title !== undefined
                      ? options.title
                      : route.title;

                  return label;
                }}
              />
            )}
          >
            <Tab.Screen
              name="Homestack"
              component={HomeStack}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => {
                  return <Icon name="home" size={size} color={color} />;
                },
              }}
            />
            <Tab.Screen
              name="RoutesStack"
              component={RoutesStack}
              options={{
                tabBarLabel: "Routes",
                tabBarIcon: ({ color, size }) => {
                  return <Icon name="routes" size={size} color={color} />;
                },
              }}
            />
            <Tab.Screen
              name="Track"
              component={Track}
              options={{
                tabBarLabel: "Track",
                tabBarIcon: ({ color, size }) => {
                  return <Icon name="play" size={size} color={color} />;
                },
              }}
            />
            <Tab.Screen
              name="ProfileStack"
              component={ProfileStack}
              options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ color, size }) => {
                  return <Icon name="account" size={size} color={color} />;
                },
              }}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{
                tabBarLabel: "Settings",
                tabBarIcon: ({ color, size }) => {
                  return <Icon name="cog" size={size} color={color} />;
                },
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SettingsProvider>

      <StatusBar style="auto" />
    </PaperProvider>
  );
}
