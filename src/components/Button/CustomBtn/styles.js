import { StyleSheet } from "react-native";
import { colors, text } from "~utils/colors.js";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_300,
    borderRadius: 5,
    height: 50,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default styles;
