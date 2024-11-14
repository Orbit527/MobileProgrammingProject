import { View } from "react-native";
import { Card, Divider, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../Styles/StyleSheet.js";
import { useEffect, useState } from "react";

export default function WeatherCards({ lat, long }) {
  const [response, setResponse] = useState(null);

  //Docu: https://open-meteo.com/en/docs#latitude=60.1695&longitude=24.9354&hourly=temperature_2m&daily=weather_code

  const handleFetch = () => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation_probability&hourly=temperature_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_mean`
    )
      .then((response) => {
        if (!response.ok)
          throw new Error("Error in fetch:" + response.statusText);

        return response.json();
      })
      .then((data) => {
        setResponse(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    handleFetch();
  }, [lat, long]);

  useEffect(() => {
    console.log(response);
  }, [response]);

  return (
    <View style={styles.cardFlexBox}>
      <Card mode="elevated" style={styles.cardHolder}>
        <Text
          variant="titleLarge"
          style={{ marginLeft: 17, marginTop: 15, marginBottom: 5 }}
        >
          Weather Conditions
        </Text>
        <Divider style={{ height: 1 }} />
        <Text variant="titleMedium" style={{ marginLeft: 17, marginTop: 10 }}>
          Current
        </Text>
        <View style={styles.cardFlexBoxRow}>
          <Card mode="contained" style={styles.card}>
            <Card.Content>
              <Text variant="titleSmall">Temperature</Text>
            </Card.Content>
            <Card.Content style={styles.cardContent}>
              <Icon name="thermometer" size={30} color="#000" />
              <Text variant="titleLarge">
                {response && response.current.temperature_2m} °C
              </Text>
            </Card.Content>
          </Card>

          <Card mode="contained" style={styles.card}>
            <Card.Content>
              <Text variant="titleSmall">Chance of Rain</Text>
            </Card.Content>
            <Card.Content style={styles.cardContent}>
              <Icon name="weather-pouring" size={30} color="#000" />
              <Text variant="titleLarge">
                {response && response.current.precipitation_probability} %
              </Text>
            </Card.Content>
          </Card>
        </View>
        <Divider style={{ height: 1 }} />
        <Text variant="titleMedium" style={{ marginLeft: 17, marginTop: 10 }}>
          Future
        </Text>
        <View style={styles.cardFlexBoxRow}>
          <Card mode="contained" style={styles.card}>
            <Card.Content style={styles.cardContentTall}>
              <Text variant="titleMedium">+1 h</Text>
              <Divider style={{ height: 1, width: "160%" }} />
              <Text variant="titleSmall">
                {response && response.hourly.temperature_2m[0]} °C
              </Text>
              <Text variant="titleSmall">
                {response && response.hourly.precipitation_probability[0]} %
              </Text>
            </Card.Content>
          </Card>

          <Card mode="contained" style={styles.card}>
            <Card.Content style={styles.cardContentTall}>
              <Text variant="titleMedium">+2 h</Text>
              <Divider style={{ height: 1, width: "160%" }} />
              <Text variant="titleSmall">
                {response && response.hourly.temperature_2m[1]} °C
              </Text>
              <Text variant="titleSmall">
                {response && response.hourly.precipitation_probability[1]} %
              </Text>
            </Card.Content>
          </Card>

          <Card mode="contained" style={styles.card}>
            <Card.Content style={styles.cardContentTall}>
              <Text variant="titleMedium">+1 d</Text>
              <Divider style={{ height: 1, width: "160%" }} />
              <Text variant="titleSmall">
                {
                  //round to 1 decimal place
                  response &&
                    Math.round(
                      ((response.daily.temperature_2m_min[0] +
                        response.daily.temperature_2m_max[0]) /
                        2) *
                        10
                    ) / 10
                }{" "}
                °C
              </Text>
              <Text variant="titleSmall">
                {response && response.daily.precipitation_probability_mean[0]} %
              </Text>
            </Card.Content>
          </Card>

          <Card mode="contained" style={styles.card}>
            <Card.Content style={styles.cardContentTall}>
              <Text variant="titleMedium">+2 d</Text>
              <Divider style={{ height: 1, width: "150%" }} />
              <Text variant="titleSmall">
                {
                  //round to 1 decimal place
                  response &&
                    Math.round(
                      ((response.daily.temperature_2m_min[1] +
                        response.daily.temperature_2m_max[1]) /
                        2) *
                        10
                    ) / 10
                }{" "}
                °C
              </Text>
              <Text variant="titleSmall">
                {response && response.daily.precipitation_probability_mean[1]} %
              </Text>
            </Card.Content>
          </Card>
        </View>
      </Card>
    </View>
  );
}
