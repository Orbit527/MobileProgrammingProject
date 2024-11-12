import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  distanceToKm,
  formatDuration,
  formatPace,
  formatTimestampDay,
  formatTimestampHours,
} from "../Helper/HelperClass.js";
import { styles } from "../Styles/StyleSheet.js";

export default function RouteParametersCards({
  duration,
  distance,
  pace,
  startTime,
  endTime,
}) {
  return (
    <View>
      <View style={styles.cardFlexBoxRow}>
        <Card mode="contained" style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Icon name="clock-outline" size={30} color="#000" />
            <Text variant="titleLarge">{formatDuration(duration)} h</Text>
          </Card.Content>
        </Card>

        <Card mode="contained" style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Icon name="map-marker-distance" size={30} color="#000" />
            <Text variant="titleLarge">{distanceToKm(distance)} km</Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.cardFlexBoxRow}>
        <Card mode="contained" style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Icon name="speedometer" size={30} color="#000" />
            <Text variant="titleLarge">{formatPace(pace)} min/km</Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.cardFlexBoxRow}>
        <Card mode="contained" style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Icon name="clock-start" size={24} color="#000" />
            <Text variant="titleMedium">{formatTimestampHours(startTime)}</Text>
          </Card.Content>
        </Card>

        <Card mode="contained" style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Icon name="clock-end" size={24} color="#000" />
            <Text variant="titleMedium">{formatTimestampHours(endTime)}</Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}
