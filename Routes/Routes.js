import React from "react";
import { View } from "react-native";
import {
  Appbar
} from "react-native-paper";
import RoutesList from "../Components/RoutesList.js";
import { styles } from "../Styles/StyleSheet.js";

export default function Routes({ navigation }) {

  return (
    <View style={styles.upperContainer}>
      <Appbar.Header elevated mode="small">
        <Appbar.Content title="Routes" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <RoutesList navigation={navigation} reduced={false}/>

    </View>
  );
}
