import { ref, remove } from "firebase/database";
import { View } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import { Appbar, Button, Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { database } from "../firebaseConfig.js";
import {
  distanceToKm,
  formatDuration,
  formatPace,
  formatTimestampDay,
  formatTimestampHours,
} from "../HelperClass.js";
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

        <View style={styles.cardFlexBox}>
          <View style={styles.cardFlexBoxRow}>
            <Card mode="elevated" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Icon name="clock-outline" size={24} color="#000" />
                <Text variant="titleMedium">
                  {formatDuration(data.duration)} h
                </Text>
              </Card.Content>
            </Card>

            <Card mode="elevated" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Icon name="map-marker-distance" size={24} color="#000" />
                <Text variant="titleMedium">
                  {distanceToKm(data.distance)} km
                </Text>
              </Card.Content>
            </Card>
          </View>

          <View style={styles.cardFlexBoxRow}>
            <Card mode="elevated" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Icon name="speedometer" size={24} color="#000" />
                <Text variant="titleMedium">
                  {formatPace(data.pace)} min/km
                </Text>
              </Card.Content>
            </Card>

            <Card mode="elevated" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Icon name="calendar" size={24} color="#000" />
                <Text variant="titleMedium">
                  {formatTimestampDay(data.startTime)}
                </Text>
              </Card.Content>
            </Card>
          </View>

          <View style={styles.cardFlexBoxRow}>
            <Card mode="elevated" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Icon name="calendar-arrow-right" size={24} color="#000" />
                <Text variant="titleMedium">
                  {formatTimestampHours(data.startTime)}
                </Text>
              </Card.Content>
            </Card>

            <Card mode="elevated" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Icon name="calendar-arrow-left" size={24} color="#000" />
                <Text variant="titleMedium">
                  {formatTimestampHours(data.endTime)}
                </Text>
              </Card.Content>
            </Card>
          </View>
        </View>

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
