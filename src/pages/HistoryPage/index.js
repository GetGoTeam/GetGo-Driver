import { StyleSheet, Text, View, Button } from "react-native";
// import NavBase from "../../components/NavBase";
import { colors, text } from "../../utils/colors";
import GoogleApiSearch from "../../components/GoogleApiSearch";
import GoogleMap from "../../components/GoogleMap";

const HistoryPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <GoogleApiSearch />
      {/* <View style={styles.content}>
        <Text>lich su</Text>
      </View> */}
      {/* <NavBase navigation={navigation} activeIndex={3} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: colors.primary_50,
    // alignItems: "center",
    // justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HistoryPage;
