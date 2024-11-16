import React from "react";
import { View } from "react-native";
import { Card, Divider, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  distanceToKm,
  formatDuration,
  formatPace,
} from "../Helper/HelperClass.js";
import { styles } from "../Styles/StyleSheet.js";

export default function RoutesGeneralStatistics({
  title,
  amount,
  averagePace,
  overallDistance,
  overallDuration,
}) {
  return (
    <Card mode="elevated" style={styles.cardHolder}>
      <Text variant="titleLarge" style={{ marginLeft: 17, marginTop: 15, marginBottom: 5 }}>
        {title}
      </Text>
      <Divider style={{ height: 1 }} />

      <View style={styles.cardFlexBoxRow}>
        <Card mode="contained" style={styles.card}>
          <Card.Content>
            <Text variant="titleSmall">Amount of Routes</Text>
          </Card.Content>
          <Card.Content style={styles.cardContent}>
            <Icon name="counter" size={24} color="#000" />
            <Text variant="titleLarge">{amount}</Text>
          </Card.Content>
        </Card>

        <Card mode="contained" style={styles.card}>
          <Card.Content>
            <Text variant="titleSmall">Average Pace</Text>
          </Card.Content>
          <Card.Content style={styles.cardContent}>
            <Icon name="speedometer" size={24} color="#000" />
            <Text variant="titleLarge">{formatPace(averagePace)} min/km</Text>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.cardFlexBoxRow}>
        <Card mode="contained" style={styles.card}>
          <Card.Content>
            <Text variant="titleSmall">Total Distance</Text>
          </Card.Content>
          <Card.Content style={styles.cardContent}>
            <Icon name="arrow-expand-horizontal" size={24} color="#000" />
            <Text variant="titleLarge">{distanceToKm(overallDistance)} km</Text>
          </Card.Content>
        </Card>

        <Card mode="contained" style={styles.card}>
          <Card.Content>
            <Text variant="titleSmall">Total Duration</Text>
          </Card.Content>
          <Card.Content style={styles.cardContent}>
            <Icon name="clock-outline" size={24} color="#000" />
            <Text variant="titleLarge">
              {formatDuration(overallDuration)} h
            </Text>
          </Card.Content>
        </Card>
      </View>
    </Card>
  );
}
