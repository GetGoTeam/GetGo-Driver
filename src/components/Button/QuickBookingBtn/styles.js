import { StyleSheet } from "react-native";
import { colors, text } from "~utils/colors.js";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.primary_200,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  text: {
    marginRight: 20,
  },
  icon: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: text.color_600,
    marginBottom: 3,
  },
  des: {
    fontSize: 20,
    fontWeight: "bold",
    color: text.color_800,
  },
});

export default styles;
