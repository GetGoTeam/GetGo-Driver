import { colors, text } from "~utils/colors.js";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_200,
    paddingHorizontal: "0.75rem",
    paddingVertical: "0.5rem",
    borderRadius: "0.5rem",
    marginVertical: "0.5rem",
  },
  icon: {
    height: "3rem",
    width: "3rem",
    resizeMode: "contain",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: text.color_800,
    marginLeft: "0.5rem",
  },
});

export default styles;
