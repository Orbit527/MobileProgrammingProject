import { View } from "react-native";
import { Button, Card, Divider, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  distanceToKm,
  formatDuration,
  formatPace,
  formatTimestampHours
} from "../Helper/HelperClass.js";
import { styles } from "../Styles/StyleSheet.js";

export default function RouteParametersCards({
  duration,
  distance,
  pace,
  startTime,
  isTracking,
  startTracking,
  endTracking,
}) {
  return (
    <View style={styles.cardFlexBox}>
      <Card mode="elevated" style={styles.cardHolder}>
        <Text
          variant="titleLarge"
          style={{ marginLeft: 17, marginTop: 15, marginBottom: 5 }}
        >
          Tracking Parameters
        </Text>
        <Divider style={{ height: 1 }} />
        <View style={styles.cardFlexBoxRow}>
          <Card mode="contained" style={styles.card}>
            <Card.Content>
              <Text variant="titleSmall">Time</Text>
            </Card.Content>
            <Card.Content style={styles.cardContent}>
              <Icon name="clock-outline" size={28} color="#000" />
              <Text variant="titleLarge">{formatDuration(duration)} h</Text>
            </Card.Content>
          </Card>

          <Card mode="contained" style={styles.card}>
            <Card.Content>
              <Text variant="titleSmall">Distance</Text>
            </Card.Content>
            <Card.Content style={styles.cardContent}>
              <Icon name="arrow-expand-horizontal" size={28} color="#000" />
              <Text variant="titleLarge">{distanceToKm(distance)} km</Text>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.cardFlexBoxRow}>
          <Card mode="contained" style={styles.card}>
            <Card.Content>
              <Text variant="titleSmall">Pace</Text>
            </Card.Content>
            <Card.Content style={styles.cardContent}>
              <Icon name="speedometer" size={28} color="#000" />
              <Text variant="titleLarge">{formatPace(pace)} min/km</Text>
            </Card.Content>
          </Card>

          <Card mode="contained" style={styles.card}>
            <Card.Content>
              <Text variant="titleSmall">Start Time</Text>
            </Card.Content>
            <Card.Content style={styles.cardContent}>
              <Icon name="clock-start" size={28} color="#000" />
              <Text variant="titleLarge">
                {formatTimestampHours(startTime)}
              </Text>
            </Card.Content>
          </Card>
        </View>

        <View style={{ marginVertical: 8, alignItems: "center" }}>
          {!isTracking ? (
            <Button
              style={styles.button}
              mode="contained"
              contentStyle={{ flexDirection: "row-reverse" }}
              icon={({ size, color }) => (
                <Icon name="arrow-right-thick" size={24} color="#fff" />
              )}
              onPress={() => startTracking()}
            >
              <Text variant="titleMedium" style={{ color: "white" }}>
                Start tracking
              </Text>
            </Button>
          ) : (
            <Button
              style={styles.button}
              mode="contained"
              contentStyle={{ flexDirection: "row-reverse" }}
              icon={({ size, color }) => (
                <Icon name="stop-circle-outline" size={24} color="#fff" />
              )}
              buttonColor="darkred"
              onPress={() => endTracking()}
            >
              <Text variant="titleMedium" style={{ color: "white" }}>
                End tracking
              </Text>
            </Button>
          )}
        </View>
      </Card>
    </View>
  );
}
