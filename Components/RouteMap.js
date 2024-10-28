import React from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function RouteMap({
  locationLat,
  locationLong,
  coordinates,
  tracking,
}) {
  return (
    <MapView
      style={{ width: "100%", height: "50%", marginBottom: 10 }}
      initialRegion={{
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      }}
      region={{
        latitude: locationLat ? locationLat : 0,
        longitude: locationLong ? locationLong : 0,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      }}
    >
      {tracking && (
        <Marker
          coordinate={{
            latitude: locationLat ? locationLat : 0,
            longitude: locationLong ? locationLong : 0,
          }}
          title="Current Location"
        >
          <Icon name="circle-slice-8" size={24} color={"#3655d4"} />
        </Marker>
      )}

      {!tracking && (
        <Marker
          coordinate={{
            latitude: coordinates ? coordinates[0].latitude : 0,
            longitude: coordinates ? coordinates[0].longitude : 0,
          }}
          title="Start"
        >
          <Icon name="send" size={24} color={"#000000"} />
        </Marker>
      )}

      {!tracking && (
        <Marker
          coordinate={{
            latitude: coordinates
              ? coordinates[coordinates.length - 1].latitude
              : 0,
            longitude: coordinates
              ? coordinates[coordinates.length - 1].longitude
              : 0,
          }}
          title="End"
        >
          <Icon name="flag-checkered" size={24} color={"#000000"} />
        </Marker>
      )}

      <Polyline
        coordinates={coordinates}
        strokeColor="#3655d4"
        strokeWidth={2}
      />
    </MapView>
  );
}