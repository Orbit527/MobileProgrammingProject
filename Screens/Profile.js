import {  View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { styles } from "../StyleSheet.js"

export default function Profile() {
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header elevated mode="small">
        <Appbar.Content title="Profile" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <View style={styles.container}>
        <Text variant="titleLarge">Profile</Text>
      </View>
    </View>
  );
}