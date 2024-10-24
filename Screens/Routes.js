import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Appbar, Button, Card, PaperProvider, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { database } from "../firebaseConfig.js";
import { distanceToKm, formatDuration } from "../HelperClass.js";
import { styles } from "../StyleSheet.js";

export default function Routes({ navigation }) {
  const [routes, setRoutes] = useState([]);
  const [overallDistance, setOverallDistance] = useState(0);
  const [overallDuration, setOverallDuration] = useState(0);

  useEffect(() => {
    const routesRef = ref(database, "/routes");
    onValue(routesRef, (snapshot) => {
      data = snapshot.val();

      if (!data) {
        console.log("EMPTY!!!");
        setRoutes([]);
        setOverallDistance(0);
        setOverallDuration(0);
        return;
      }

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
    const route = routes.find((route) => route.key === key);
    navigation.navigate("RouteDetail", { data: route });
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header elevated mode="small">
        <Appbar.Content title="Routes" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <Text variant="titleLarge" style={{ marginLeft: 20, marginTop: 20 }}>
        Overall Statistics
      </Text>

      <View style={styles.container}>
        <View style={styles.cardFlexBoxRow}>
          <Card mode="elevated" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Icon name="map-marker-distance" size={24} color="#000" />
              <Text variant="titleMedium">
                {distanceToKm(overallDistance)} km
              </Text>
            </Card.Content>
          </Card>

          <Card mode="elevated" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Icon name="clock-outline" size={24} color="#000" />
              <Text variant="titleMedium">
                {formatDuration(overallDuration)} h
              </Text>
            </Card.Content>
          </Card>
        </View>

        <Text variant="titleLarge" style={{ marginTop: 10, marginBottom: 10 }}>
          Your Routes
        </Text>

        <PaperProvider>
          <FlatList
            ListEmptyComponent={
              <Text variant="titleMedium">No Routes yet...</Text>
            }
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
                    <Text>{distanceToKm(item.distance)} km</Text>
                    <Icon name="clock-outline" size={24} color="#000" />
                    <Text>{formatDuration(item.duration)} h</Text>
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
        </PaperProvider>
      </View>
    </View>
  );
}
