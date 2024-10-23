import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Appbar, Button, Card, Divider, Text } from "react-native-paper";
import { styles } from "../StyleSheet.js";
import { onValue, ref, remove } from "firebase/database";
import { database } from "../firebaseConfig.js";
import { Modal, PaperProvider, Portal } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Polyline, Marker } from "react-native-maps";

export default function Routes() {
  const [routes, setRoutes] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [overallDistance, setOverallDistance] = useState(0);
  const [overallDuration, setOverallDuration] = useState(0);

  useEffect(() => {
    const routesRef = ref(database, "/routes");
    onValue(routesRef, (snapshot) => {
      data = snapshot.val();

      //TODO: think of something better; look at teachers solution
      const dataWithKey = Object.entries(data).map(([key, other]) => ({
        key,
        ...other,
      }));

      console.log(dataWithKey);
      setRoutes(dataWithKey);

      let totalDistance = Object.values(dataWithKey).reduce(
        (acc, { distance }) => {
          return acc + parseFloat(distance);
        },
        0
      );
      setOverallDistance(totalDistance);

      let totalDuration = Object.values(dataWithKey).reduce(
        (acc, { duration }) => {
          return acc + parseFloat(duration);
        },
        0
      );
      setOverallDuration(totalDuration);
    });
  }, []);

  const showDetails = (key) => {
    setVisible(true);
    setSelectedKey(key);
  };

  const hideDetails = () => {
    setVisible(false);
    setSelectedKey(null);
  };

  useEffect(() => {
    setSelectedRoute(routes.find((route) => route.key === selectedKey));
  }, [selectedKey]);

  const deleteEntry = async (key) => {
    remove(ref(database, "routes/" + key));
    setVisible(false);

    console.log("Deleted: " + key);
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header elevated mode="small">
        <Appbar.Content title="Routes" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <View style={styles.container}>
        <Text variant="titleLarge" style={{ marginTop: 10, marginBottom: 10 }}>
          Your Routes
        </Text>

        <PaperProvider>
          <FlatList
            data={routes}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "left",
                  margin: 4,
                }}
              >
                <Card mode="elevated" style={styles.cardLong}>
                  <Card.Content style={styles.cardContent}>
                    <Text variant="titleMedium">{item.title}</Text>
                  </Card.Content>

                  <Card.Content style={styles.cardContent}>
                    <Icon name="map-marker-distance" size={24} color="#000" />
                    <Text>{item.distance} km</Text>
                    <Icon name="clock-outline" size={24} color="#000" />
                    <Text>{item.duration} h</Text>
                    <Button
                      onPress={() => showDetails(item.key)}
                      size={32}
                      icon="arrow-right"
                      contentStyle={{ flexDirection: "row-reverse" }}
                    >
                      Details
                    </Button>
                  </Card.Content>
                </Card>
              </View>
            )}
          />

          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideDetails}
              contentContainerStyle={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 20,
                height: "100%",
              }}
              theme={{ colors: { backdrop: "transparent" } }}
            >
              {selectedRoute ? (
                <View>
                  <Text>Route Title: {selectedRoute.title}</Text>
                  <Text>Distance: {selectedRoute.distance} km</Text>
                  <Text>Duration: {selectedRoute.duration} h</Text>
                  <Text>Pace: {selectedRoute.pace} min/km</Text>
                  <Text>Date: {selectedRoute.startTime} </Text>
                  <Text>StartTime: {selectedRoute.startTime} </Text>
                  <Text>EndTime: {selectedRoute.endTime} </Text>
                  <Button onPress={() => deleteEntry(selectedRoute.key)}>
                    DEL
                  </Button>
                  <Button onPress={hideDetails}>Close Details</Button>
                </View>
              ) : (
                <Text>Loading route details</Text>
              )}
            </Modal>
          </Portal>
        </PaperProvider>
      </View>
    </View>
  );
}
