import { onAuthStateChanged } from "firebase/auth";
import { ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Appbar, Button } from "react-native-paper";
import RouteMap from "../Components/RouteMap.js";
import RouteParametersCards from "../Components/RouteParametersCards.js";
import { database, firebaseAuth } from "../firebaseConfig.js";
import { styles } from "../Styles/StyleSheet.js";

export default function RouteDetail({ navigation, route }) {
  const { data } = route.params;

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);

  const deleteEntry = async (key) => {
    console.log("Deleted: " + key);

    remove(ref(database, "users/" + user.uid + "/" + key));
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
