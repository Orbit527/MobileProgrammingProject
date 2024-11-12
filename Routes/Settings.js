import {  View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { styles } from "../Styles/StyleSheet.js"

export default function Settings() {
  return (
    <View style={styles.upperContainer}>
      <Appbar.Header elevated mode="small">
        <Appbar.Content title="Settings" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <View style={styles.container}>
        <Text variant="titleLarge">Settings</Text>
      </View>
    </View>
  );
}