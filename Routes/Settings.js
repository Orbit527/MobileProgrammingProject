import { View } from "react-native";
import { Appbar, SegmentedButtons, Text } from "react-native-paper";
import { useSettings } from "../Helper/SettingsProvider.js";
import { styles } from "../Styles/StyleSheet.js";

export default function Settings() {
  const { settings, updateSetting } = useSettings();

  return (
    <View style={styles.upperContainer}>
      <Appbar.Header elevated mode="small">
        <Appbar.Content title="Settings" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <View style={styles.container}>
        <Text variant="titleLarge" style={{ marginVertical: 15 }}>
          Map View Distance
        </Text>

        <SegmentedButtons
          value={settings.trackingZoom}
          onValueChange={(value) => updateSetting("trackingZoom", value)}
          buttons={[
            {
              value: 0.001,
              label: "Close",
            },
            {
              value: 0.002,
              label: "Medium",
            },
            { value: 0.004, label: "Far" },
          ]}
        />

        <Text variant="titleLarge" style={{ marginVertical: 15 }}>
          Tracking Accuracy
        </Text>

        <SegmentedButtons
          value={settings.trackingAccuracy}
          onValueChange={(value) => updateSetting("trackingAccuracy", value)}
          buttons={[
            {
              value: 4,
              label: "Low",
            },
            {
              value: 5,
              label: "Medium",
            },
            { value: 6, label: "High" },
          ]}
        />
      </View>
    </View>
  );
}
