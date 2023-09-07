import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
// import NavBar from "../../components/NavBar";
import { colors } from "../../utils/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faCircleInfo,
  faCommentDots,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { selectOrigin, selectTripDetails } from "../../../slices/navSlice";
import { useSelector } from "react-redux";

const HistoryPage = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary_50,
  },
});

export default HistoryPage;
