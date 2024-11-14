import * as Location from "expo-location";
import { push, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import {
  Appbar,
  Button,
  Card,
  Divider,
  Modal,
  PaperProvider,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import RouteMap from "../Components/RouteMap.js";
import TrackParametersCards from "../Components/TrackParametersCards.js";
import { database, firebaseAuth } from "../firebaseConfig.js";
import { formatTimestampDay } from "../Helper/HelperClass.js";
import { styles } from "../Styles/StyleSheet.js";
import { onAuthStateChanged } from "firebase/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);

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
    if (duration > 30) {
      setIsTracking(false);
      console.log("Not tracking!");
      setEndTime(Date.now());
      showDetails();
    } else {
      Alert.alert("You need to run at least 30 seconds!");
    }
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

    push(ref(database, "/users/" + user.uid), obj);
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
    saveLocationToCoordinates();
  }, [location]);

  const saveLocationToCoordinates = () => {
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
  };

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
    <View style={styles.upperContainer}>
      <Appbar.Header elevated mode="small">
        <Appbar.Content title="Track" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <PaperProvider>
        <RouteMap
          locationLat={location ? location.coords.latitude : 0}
          locationLong={location ? location.coords.longitude : 0}
          coordinates={coordinates}
          tracking={true}
        />

        <View style={styles.container}>
          <TrackParametersCards
            duration={duration}
            distance={distance}
            pace={pace}
            startTime={startTime}
            endTime={endTime}
            isTracking={isTracking}
            startTracking={startTracking}
            endTracking={endTracking}
          />

          <Portal>
            <Modal
              visible={visible}
              dismissable="false"
              contentContainerStyle={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                height: "100%",
              }}
              theme={{ colors: { backdrop: "transparent" } }}
            >
              <View>
                <Text variant="titleLarge" style={{ marginBottom: 15 }}>
                  Route finished!
                </Text>

                {user ? (
                  <View>
                    <TextInput
                      style={{ marginBottom: 15 }}
                      placeholder="Enter a name for your Route..."
                      mode="outlined"
                      label="Title"
                      maxLength={23}
                      onChangeText={(text) => setName(text)}
                    ></TextInput>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    >
                      <Button
                        buttonColor="grey"
                        mode="contained"
                        icon="cancel"
                        onPress={hideDetails}
                      >
                        Discard
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
                ) : (
                  <View>
                    <Text variant="titleMedium" style={{ marginBottom: 15 }}>
                      You must be signed in to save Route
                    </Text>
                    <Button
                      buttonColor="grey"
                      mode="contained"
                      icon="cancel"
                      onPress={hideDetails}
                    >
                      Discard
                    </Button>
                  </View>
                )}
              </View>
            </Modal>
          </Portal>
        </View>
      </PaperProvider>
    </View>
  );
}
