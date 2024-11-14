import { View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import { styles } from "../Styles/StyleSheet.js";
import { useSettings } from "../Helper/SettingsProvider.js";

export default function Settings() {
  const { trackingZoom, setTrackingZoom } = useSettings();

  return (
    <View style={styles.upperContainer}>
      <Appbar.Header elevated mode="small">
        <Appbar.Content title="Settings" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <View style={styles.container}>
        <Text variant="titleLarge">Settings</Text>

        <Text>Tracking Zoom: {trackingZoom}</Text>
        <Button onPress={() => setTrackingZoom(0.001)}>
          Close
        </Button>
        <Button onPress={() => setTrackingZoom(0.002)}>
          Medium
        </Button>
        <Button onPress={() => setTrackingZoom(0.004)}>
          Wide
        </Button>
      </View>
    </View>
  );
}
