import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import NavBar from "../../components/NavBar";
import { colors, text } from "../../utils/colors";
import { Image } from "react-native";
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

const NotificationPage = () => {
  const navigation = useNavigation();
  const tripDetails = useSelector(selectTripDetails);
  const origin = useSelector(selectOrigin);
  const hanldeBackToPage = () => {
    navigation.navigate(tripDetails.path);
  };
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <TouchableOpacity onPress={hanldeBackToPage} style={styles.icon_back}>
          <FontAwesomeIcon icon={faArrowLeft} size={28} />
        </TouchableOpacity>
        <View style={styles.heading_title}>
          <View>
            <Text style={styles.heading_text1}>Chi tiết đơn</Text>
            <Text>Thông tin đơn đặt xe...</Text>
          </View>
          <View>
            <Image
              source={require("../../../assets/imgs/header.png")}
              style={styles.heading_img}
            />
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.payment}>
          <View>
            <Text style={styles.payment_text1}>VNĐ</Text>
            <Text style={styles.payment_text2}>
              {tripDetails.payment.price}
            </Text>
          </View>
          <View>
            <Text style={styles.payment_text3}>Thanh toán</Text>
            <View style={styles.payment_type}>
              <Text style={styles.payment_text4}>
                {tripDetails.payment.type}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.body_title}>
            <FontAwesomeIcon icon={faCircleInfo} size={25} color="#2E2E2E" />
            <Text style={styles.title_text}>Thông tin di chuyển</Text>
          </View>
          <View style={styles.body_infor}>
            <View style={styles.infor_line}>
              <FontAwesomeIcon icon={faCircleDot} size={18} color="#34A852" />
              <View style={styles.line}></View>
              <FontAwesomeIcon icon={faLocationDot} size={20} color="#EC3632" />
            </View>
            <View style={styles.infor_location}>
              <View style={styles.location_begin}>
                <Text style={styles.location_text1}>
                  {tripDetails.pickUp.split(",")[0]}
                </Text>
                <Text style={styles.location_text2}>{tripDetails.pickUp}</Text>
              </View>
              <View>
                <Text style={[styles.location_text1, styles.location_text12]}>
                  {tripDetails.location.split(",")[0]}
                </Text>
                <Text style={styles.location_text2}>
                  {tripDetails.location}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.feedback_container}>
            <View style={styles.feedback_title}>
              <FontAwesomeIcon icon={faCommentDots} size={25} color="#2E2E2E" />
              <Text style={styles.title_text}>Đánh giá của khách hàng</Text>
            </View>
            <View style={styles.feedback_block}>
              <Text style={styles.feedback_text}>
                {tripDetails.feedback.content}
              </Text>
              <View style={styles.feedback_star}>
                <Text style={styles.feedback_star_text}>
                  {tripDetails.feedback.star}
                </Text>
                <FontAwesomeIcon icon={faStar} color="#FFF500" size={24} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary_50,
  },
  heading: {
    paddingStart: 15,
    paddingEnd: 15,
    backgroundColor: colors.primary_200,
    height: 190,
  },
  icon_back: {
    marginTop: 20,
  },
  heading_title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading_text1: {
    fontSize: 28,
    fontWeight: 500,
    color: "#1D1D1D",
  },
  heading_img: {
    width: 200,
    height: 140,
    resizeMode: "contain",
  },
  payment: {
    height: 120,
    backgroundColor: colors.primary_50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  payment_text1: {
    fontSize: 18,
    fontWeight: 500,
    color: "#2C2C2C",
  },
  payment_text2: {
    fontSize: 24,
    fontWeight: 500,
    color: "#1D1D1D",
  },
  payment_text3: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: 500,
    color: "#2C2C2C",
  },
  payment_type: {
    backgroundColor: "#30AA48",
    width: 90,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 5,
    marginStart: 2,
  },
  payment_text4: {
    color: "white",
    fontSize: 14,
    fontWeight: 500,
  },
  body: {
    padding: 20,
  },
  body_title: {
    flexDirection: "row",
    paddingBottom: 10,
    borderBottomColor: "#818181",
    borderBottomWidth: 1,
  },
  title_text: {
    fontSize: 18,
    fontWeight: 700,
    marginStart: 10,
    color: "#2E2E2E",
    textTransform: "uppercase",
  },
  body_infor: {
    flexDirection: "row",
    marginTop: 30,
    height: 210,
    borderBottomColor: "#818181",
    borderBottomWidth: 1,
  },
  infor_line: {
    alignItems: "center",
    marginTop: 10,
  },
  line: {
    height: 85,
    width: 2,
    backgroundColor: "#818181",
    borderRadius: 5,
    marginTop: 6,
    marginBottom: 6,
  },
  infor_location: {
    marginStart: 10,
    marginEnd: 10,
  },
  location_begin: {
    marginBottom: 40,
  },
  location_text1: {
    fontSize: 22,
    fontWeight: 500,
    color: "#34A852",
  },
  location_text12: {
    color: "#EC3632",
  },
  location_text2: {
    fontSize: 16,
    color: "#818181",
  },
  feedback_container: {
    marginTop: 20,
  },
  feedback_title: {
    flexDirection: "row",
  },
  feedback_block: {
    marginTop: 10,
    height: 150,
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderColor: "#818181",
    borderWidth: 1,
    borderRadius: 5,
  },
  feedback_text: {
    width: "85%",
  },
  feedback_star: {
    flexDirection: "row",
    alignItems: "center",
  },
  feedback_star_text: {
    fontSize: 16,
    marginEnd: 5,
    fontWeight: 500,
  },
});

export default NotificationPage;
