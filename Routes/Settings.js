import { View } from "react-native";
import { Appbar, Button, SegmentedButtons, Text } from "react-native-paper";
import { styles } from "../Styles/StyleSheet.js";
import { useSettings } from "../Helper/SettingsProvider.js";
import { useState } from "react";

export default function Settings() {
  const { settings, updateSetting } = useSettings();

  return (
    <View style={styles.upperContainer}>
      <Appbar.Header elevated mode="small">
        <Appbar.Content title="Settings" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <View style={styles.container}>
        <Text variant="titleLarge" style={{ marginVertical: 15 }}>
          Tracking View Distance
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
      </View>
    </View>
  );
}
