import { ref, remove } from "firebase/database";
import { View } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import { Appbar, Button, Divider, Text } from "react-native-paper";
import RouteParametersCards from "../Components/RouteParametersCards.js";
import { database } from "../firebaseConfig.js";
import { styles } from "../StyleSheet.js";
import RouteMap from "../Components/RouteMap.js";

export default function RouteDetail({ navigation, route }) {
  const { data } = route.params;

  const deleteEntry = async (key) => {
    console.log("Deleted: " + key);

    remove(ref(database, "routes/" + key));
    navigation.navigate("Route");
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header elevated mode="small">
        <Appbar.BackAction onPress={() => navigation.navigate("Route")} />
        <Appbar.Content title={data.title} titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <View style={styles.container}>
        <RouteMap
          locationLat={data.coordinates[0].latitude}
          locationLong={data.coordinates[0].longitude}
          coordinates={data.coordinates}
          tracking={false}
        />

        <RouteParametersCards
          duration={data.duration}
          distance={data.distance}
          pace={data.pace}
          startTime={data.startTime}
          endTime={data.endTime}
        />

        <View style={{ alignItems: "center" }}>
          <Button
            mode="contained"
            icon="trash-can-outline"
            buttonColor="darkred"
            style={styles.button}
            onPress={() => deleteEntry(data.key)}
          >
            Delete
          </Button>
        </View>
      </View>
    </View>
  );
}
