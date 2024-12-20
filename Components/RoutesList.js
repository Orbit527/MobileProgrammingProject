import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Divider,
  Text,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { database, firebaseAuth } from "../firebaseConfig.js";
import { distanceToKm, formatDuration } from "../Helper/HelperClass.js";
import { styles } from "../Styles/StyleSheet.js";
import RoutesGeneralStatistics from "./RoutesGeneralStatistics.js";

export default function RoutesList({ navigation, reduced, from }) {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [overallAmount, setOverallAmount] = useState(0);
  const [overallDistance, setOverallDistance] = useState(0);
  const [overallDuration, setOverallDuration] = useState(0);
  const [overallPace, setOverallPace] = useState(0);

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    // check if user is logged in
    if (user) {
      const routesRef = ref(database, "/users/" + user.uid);
      onValue(routesRef, (snapshot) => {
        let data = snapshot.val();

        // if there is no data, then display nothing, set states to 0 and return
        if (!data) {
          setRoutes([]);
          setOverallAmount(0);
          setOverallDistance(0);
          setOverallDuration(0);
          setOverallPace(0);
          return;
        }

        let dataWithKey = Object.entries(data).map(([key, other]) => ({
          key,
          ...other,
        }));

        dataWithKey = dataWithKey.reverse();

        if (reduced == true) {
          dataWithKey = dataWithKey.slice(0, 3);
        }

        setRoutes(dataWithKey);
        setLoading(false);

        console.log(Object.keys(dataWithKey).length);

        setOverallAmount(Object.keys(dataWithKey).length);

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

        let totalPace = Object.values(dataWithKey).reduce((acc, { pace }) => {
          return acc + parseFloat(pace);
        }, 0);
        setOverallPace(totalPace / Object.keys(dataWithKey).length);
      });
    } else {
      setOverallAmount(0);
      setOverallDistance(0);
      setOverallDuration(0);
      setOverallPace(0);
    }
  }, [user, ]);

  const showDetails = (key) => {
    const route = routes.find((route) => route.key === key);
    navigation.navigate("RouteDetail", { data: route, from: from });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <RoutesGeneralStatistics
          title={reduced == true ? "Last 3 Routes" : "Overall Statistics"} //set title, if it is used in Home or Routes
          amount={overallAmount}
          averagePace={overallPace}
          overallDistance={overallDistance}
          overallDuration={overallDuration}
        />

        <Text
          variant="titleLarge"
          style={{ marginLeft: 17, marginVertical: 15 }}
        >
          Your Routes
        </Text>

        {user ? (
          !loading ? (
            <FlatList
            scrollEnabled={reduced == true ? false : true}
              ListEmptyComponent={
                <Text variant="titleMedium" style={{marginLeft: 20}}>No Routes yet...</Text>
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
                  <Card mode="contained" style={styles.cardLong}>
                    <Divider
                      style={{ height: 1, width: "100%", marginBottom: 8 }}
                    />
                    <Card.Content style={styles.cardContent}>
                      <Text variant="titleMedium">{item.title}</Text>
                    </Card.Content>

                    <Card.Content style={styles.cardContent}>
                      <Icon
                        name="arrow-expand-horizontal"
                        size={24}
                        color="#000"
                      />
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
          ) : (
            <ActivityIndicator animating={true} />
          )
        ) : (
          <Text  variant="titleMedium" style={{ marginLeft: 17 }}>You are not logged in!</Text>
        )}
      </View>
    </View>
  );
}
