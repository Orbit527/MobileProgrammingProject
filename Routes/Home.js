import { View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { styles } from "../Styles/StyleSheet.js";
import WeatherCards from "../Components/WeatherCards.js";

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header elevated mode="small">
        <Appbar.Content title="Home" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <View style={styles.container}>
        <Text variant="titleLarge">Home</Text>
        <WeatherCards lat={"60.1695"} long={"24.9354"}/>
      </View>
    </View>
  );
}
