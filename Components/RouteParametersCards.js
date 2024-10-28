import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  distanceToKm,
  formatDuration,
  formatPace,
  formatTimestampDay,
  formatTimestampHours,
} from "../HelperClass.js";
import { styles } from "../StyleSheet.js";

export default function RouteParametersCards({
  duration,
  distance,
  pace,
  startTime,
  endTime,
}) {
  return (
    <View style={styles.cardFlexBox}>
      <View style={styles.cardFlexBoxRow}>
        <Card mode="elevated" style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Icon name="clock-outline" size={24} color="#000" />
            <Text variant="titleMedium">{formatDuration(duration)} h</Text>
          </Card.Content>
        </Card>

        <Card mode="elevated" style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Icon name="map-marker-distance" size={24} color="#000" />
            <Text variant="titleMedium">{distanceToKm(distance)} km</Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.cardFlexBoxRow}>
        <Card mode="elevated" style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Icon name="speedometer" size={24} color="#000" />
            <Text variant="titleMedium">{formatPace(pace)} min/km</Text>
          </Card.Content>
        </Card>

        <Card mode="elevated" style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Icon name="calendar" size={24} color="#000" />
            <Text variant="titleMedium">{formatTimestampDay(startTime)}</Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.cardFlexBoxRow}>
        <Card mode="elevated" style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Icon name="calendar-arrow-right" size={24} color="#000" />
            <Text variant="titleMedium">{formatTimestampHours(startTime)}</Text>
          </Card.Content>
        </Card>

        <Card mode="elevated" style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Icon name="calendar-arrow-left" size={24} color="#000" />
            <Text variant="titleMedium">{formatTimestampHours(endTime)}</Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}
