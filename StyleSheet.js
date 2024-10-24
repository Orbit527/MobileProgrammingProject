import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  cardFlexBox: {
flex: 1
  },
  cardFlexBoxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  card: {
    flex: 1,
    width: "50%",
    height: 65,
    margin: 5,
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
    justifyContent: "center",
  },

  cardLong: {
    flex: 1,
    width: "100%",
    //height: 65,
    margin: 0,
    justifyContent: "space-around",
  }
});
