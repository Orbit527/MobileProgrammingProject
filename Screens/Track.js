import * as Location from "expo-location";
import { push, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import {
  Appbar,
  Button,
  Modal,
  PaperProvider,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RouteParameters from "../Components/RouteParametersCards.js";
import { database } from "../firebaseConfig.js";
import { formatTimestampDay } from "../HelperClass.js";
import { styles } from "../StyleSheet.js";

export default function Track() {
  const [isTracking, setIsTracking] = useState(false);
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([
    { latitude: 0, longitude: 0 },
  ]);
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const [pace, setPace] = useState(0);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [name, setName] = useState("");
  const [visible, setVisible] = React.useState(false);

  const startTracking = () => {
    setIsTracking(true);
    console.log("Now tracking");
    setDuration(0);
    setPace(0);
    setDistance(0);
    setCoordinates([]);
    setStartTime(Date.now());
    setEndTime(0);
    setName("");
  };

  const endTracking = () => {
    setIsTracking(false);
    console.log("Not tracking!");
    setEndTime(Date.now());
    showDetails();
  };

  const uploadDataToFirebase = () => {
    console.log("Attempting push...");

    let newPace = pace;
    if (pace === Infinity) {
      newPace = 0;
    }

    let newName = name;
    if (newName == "") {
      newName = "Route on " + formatTimestampDay(Date.now());
    }

    const obj = {
      title: newName,
      coordinates: coordinates,
      duration: duration,
      distance: distance,
      pace: newPace,
      startTime: startTime,
      endTime: endTime,
    };

    push(ref(database, "/routes/"), obj);
  };

  // Timer was done using this tutorial: https://www.youtube.com/watch?v=xgFgZBijW7M
  // Timer for setting duration
  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        setDuration((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  // Timer for setting location
  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        getLocation();
      }, 5000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  useEffect(() => {
    console.log(coordinates);

    setDistance(calculateTotalDistance());
  }, [coordinates]);

  // Get current location
  useEffect(() => {
    getLocation();
  }, []);

  // Update locations when current location changes
  useEffect(() => {
    if (isTracking) {
      setCoordinates((prevLocations) => [
        ...prevLocations,
        {
          latitude: location ? location.coords.latitude : 0,
          longitude: location ? location.coords.longitude : 0,
        },
      ]);

      setPace(duration / 60 / (distance / 1000));
    }
  }, [location]);

  const getLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied!");
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
      setLocation(location);

      //return location;
    })();
  };

  const calculateDistance = (c1, c2) => {
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    const R = 6371e3; // Radius of Earth in meters
    const lat1 = toRadians(c1.latitude);
    const lat2 = toRadians(c2.latitude);
    const deltaLat = toRadians(c2.latitude - c1.latitude);
    const deltaLon = toRadians(c2.longitude - c1.longitude);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  const calculateTotalDistance = () => {
    let totalDistance = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      totalDistance += calculateDistance(coordinates[i], coordinates[i + 1]);
    }
    return totalDistance; // Total distance in meters
  };

  const showDetails = (key) => {
    setVisible(true);
  };

  const hideDetails = () => {
    setVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header elevated mode="small">
        <Appbar.Content title="Track" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <View style={styles.container}>
        <PaperProvider>
          <MapView
            style={{ width: "100%", height: "50%" }}
            initialRegion={{
              latitude: 0,
              longitude: 0,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            }}
            region={{
              latitude: location ? location.coords.latitude : 0,
              longitude: location ? location.coords.longitude : 0,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            }}
          >
            <Marker
              coordinate={{
                latitude: location ? location.coords.latitude : 0,
                longitude: location ? location.coords.longitude : 0,
              }}
              title="Current Location"
            >
              <Icon name="circle-slice-8" size={24} color={"#120091"} />
            </Marker>

            <Polyline
              coordinates={coordinates}
              strokeColor="#0000AF"
              strokeWidth={1}
            />
          </MapView>

          <RouteParameters
            duration={duration}
            distance={distance}
            pace={pace}
            startTime={startTime}
            endTime={endTime}
          />

          <View style={{ alignItems: "center" }}>
            {!isTracking ? (
              <Button
                style={styles.button}
                mode="contained"
                icon="shoe-sneaker"
                onPress={() => startTracking()}
              >
                Start tracking
              </Button>
            ) : (
              <Button
                style={styles.button}
                mode="contained"
                icon="stop-circle"
                onPress={() => endTracking()}
              >
                End tracking
              </Button>
            )}
          </View>

          <Portal>
            <Modal
              visible={visible}
              dismissable="false"
              contentContainerStyle={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 20,
                height: "100%",
              }}
              theme={{ colors: { backdrop: "transparent" } }}
            >
              <View>
                <Text variant="titleLarge">Route finished!</Text>
                <TextInput
                  placeholder="Enter a name for your Route"
                  mode="outlined"
                  onChangeText={(text) => setName(text)}
                ></TextInput>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    buttonColor="grey"
                    mode="contained"
                    icon="cancel"
                    onPress={hideDetails}
                  >
                    Don't Save
                  </Button>
                  <Button
                    mode="contained"
                    icon="content-save"
                    onPress={() => {
                      uploadDataToFirebase();
                      setVisible(false);
                    }}
                  >
                    Save
                  </Button>
                </View>
              </View>
            </Modal>
          </Portal>
        </PaperProvider>
      </View>
    </View>
  );
}
