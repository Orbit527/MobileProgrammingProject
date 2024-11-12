import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  cardFlexBox: {
    flex: 1,
  },
  cardFlexBoxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    height: 65,
    margin: 2,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "space-around",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "50%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
  },
  cardLong: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
    margin: 0,
    justifyContent: "space-around",
  },
  cardHolder: {
    backgroundColor: "#E4EBFD",
    padding: 5,
  },
  weatherCard: {
    flex: 1,
    height: 65,
    margin: 2,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "space-around",
  },
  weatherCardTall: {
    flex: 1,
    height: 90,
    margin: 2,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "space-around",
  },
  weatherCardContentTall: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
