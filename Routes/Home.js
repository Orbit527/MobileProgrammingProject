import { ImageBackground, ScrollView, View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { styles } from "../Styles/StyleSheet.js";
import WeatherCards from "../Components/WeatherCards.js";
import RoutesList from "../Components/RoutesList.js";

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
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
            style={{ flex: 1 }}
          >
            <Text variant="displayLarge" style={{ margin: 20, color: "white" }}>
              Welcome to Run for Fun
            </Text>
          </ImageBackground>
          <View style={styles.container}>
            <Text variant="headlineMedium" style={{ marginVertical: 20 }}>
              Current Weather Conditions
            </Text>
            <WeatherCards lat={"60.1695"} long={"24.9354"} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
