import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  upperContainer: {
    flex: 1,
    backgroundColor: "white",
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
    backgroundColor: "transparent",
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
    backgroundColor: "#EFF4F9",
    padding: 5,
  },
  cardContentTall: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
