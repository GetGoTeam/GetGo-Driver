import EStyleSheet from "react-native-extended-stylesheet";
import { colors, text_col } from "~utils/colors.js";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary_50,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  background: {
    height: "66%",
    width: "125%",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: "18rem",
    borderTopLeftRadius: "9rem",
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  logo: {
    height: "6.5rem",
    resizeMode: "contain",
    marginBottom: "2.5rem",
  },
  content: {
    width: "85%",
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: 5,
    elevation: 8,
  },
  textInput: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  text: {
    color: text_col.color_400,
  },
  confirm: {
    marginTop: "1.5rem",
  },
  signUpContainer: {
    marginVertical: "1rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpBtn: {
    marginLeft: 8,
    color: colors.primary_300,
    fontWeight: "bold",
  },
});

export default styles;
