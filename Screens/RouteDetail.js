import { ref, remove } from "firebase/database";
import { View } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import { Appbar, Button, Text } from "react-native-paper";
import RouteParameters from "../Components/RouteParametersCards.js";
import { database } from "../firebaseConfig.js";
import { styles } from "../StyleSheet.js";

export default function RouteDetail({ navigation, route }) {
  const { data } = route.params;
  console.log(data);

  const deleteEntry = async (key) => {
    console.log("Deleted: " + key);

    remove(ref(database, "routes/" + key));
    navigation.navigate("Route");
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header elevated mode="small">
        <Appbar.BackAction onPress={() => navigation.navigate("Route")} />
        <Appbar.Content title="Route Details" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <View style={styles.container}>
        <Text variant="titleLarge">{data.title}</Text>

        <MapView
          style={{ width: "100%", height: "50%" }}
          initialRegion={{
            latitude: data.coordinates ? data.coordinates[0].latitude : 0,
            longitude: data.coordinates ? data.coordinates[0].longitude : 0,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
        >
          {data.coordinates ? (
            <Polyline
              coordinates={data.coordinates}
              strokeColor="#0000AF"
              strokeWidth={1}
            />
          ) : (
            <Text>No data</Text>
          )}
        </MapView>

        <RouteParameters
          duration={data.duration}
          distance={data.distance}
          pace={data.pace}
          startTime={data.startTime}
          endTime={data.endTime}
        />

        <Button
          mode="contained"
          icon="trash-can-outline"
          buttonColor="darkred"
          onPress={() => deleteEntry(data.key)}
        >
          Delete
        </Button>
      </View>
    </View>
  );
}
