import { ImageBackground, ScrollView, View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import WeatherCards from "../Components/WeatherCards.js";
import { styles } from "../Styles/StyleSheet.js";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function Home({ navigation }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied!");
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.upperContainer}>
      <Appbar.Header elevated mode="small">
        <Appbar.Content title="Home" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <View style={{ flex: 1 }}>
        <ScrollView>
          <ImageBackground
            source={{
              uri: "https://images.pexels.com/photos/1390403/pexels-photo-1390403.jpeg",
            }}
            resizeMode="cover"
            style={{ flex: 1, height: 240 }}
          >
            <Text
              variant="displayLarge"
              style={{
                margin: 20,
                color: "white",
                textShadowColor: "rgba(0, 0, 0, 0.5)",
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10,
              }}
            >
              Welcome to Run for Fun
            </Text>
          </ImageBackground>
          <View style={styles.container}>
            <WeatherCards
              lat={location ? location.coords.latitude : 0}
              long={location ? location.coords.longitude : 0}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
