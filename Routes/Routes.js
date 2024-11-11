import React from "react";
import { View } from "react-native";
import {
  Appbar
} from "react-native-paper";
import RoutesList from "../Components/RoutesList.js";

export default function Routes({ navigation }) {

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header elevated mode="small">
        <Appbar.Content title="Routes" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <RoutesList navigation={navigation}/>

    </View>
  );
}
