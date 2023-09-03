import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
// import NavBar from "../../components/NavBar";
import { colors, text_col } from "../../utils/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faChevronRight,
  faCrown,
  faRightFromBracket,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

const ProfilePage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() => navigation.navigate("HomePage")}
          style={styles.icon_back}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={28} />
        </TouchableOpacity>
        <View style={styles.heading_title}>
          <View>
            <Text style={styles.heading_text1}>Cá nhân</Text>
            <Text>Quản lý thông tin cá nhân</Text>
          </View>
          <View>
            <Image
              source={require("~/assets/header.png")}
              style={styles.heading_img}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.profile_container}
        onPress={() => {
          navigation.navigate("EditInformation");
        }}
      >
        <View style={styles.profile_infor}>
          <Image
            style={styles.infor_img}
            source={require("../../../assets/portrait.png")}
          />
          <View style={styles.infor_title}>
            <Text style={styles.title_name}>Trần Bảo Long</Text>
            <View style={styles.title_star}>
              <FontAwesomeIcon icon={faStar} color="#FFA902" />
              <Text style={styles.star_number}>4.99</Text>
            </View>
          </View>
        </View>
        <FontAwesomeIcon
          icon={faChevronRight}
          color={text_col.color_600}
          size={18}
        />
      </TouchableOpacity>
      <View style={styles.completed_container}>
        <Text style={styles.completed_title}>Tỉ lệ hoàn thành</Text>
        <Text style={styles.completed_content}>
          Tỉ lệ hoàn thành công việc trong tuần sẽ được đặt lại vào mỗi Thứ 2
          lúc 00:00
        </Text>
        <View style={styles.completed_expression}>
          <View style={styles.expression_item}>
            <View style={styles.item_icon}>
              <FontAwesomeIcon icon={faCrown} color="white" size={30} />
            </View>
            <Text style={styles.item_percent}>0.0%</Text>
            <Text style={styles.item_type}>Hàng ngày</Text>
          </View>
          <View style={styles.expression_item}>
            <View style={styles.item_icon}>
              <FontAwesomeIcon icon={faCrown} color="white" size={30} />
            </View>
            <Text style={styles.item_percent}>0.0%</Text>
            <Text style={styles.item_type}>Hàng tuần</Text>
          </View>
        </View>
      </View>

      <View style={styles.logout_container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignIn")}
          style={styles.logout_block}
        >
          <FontAwesomeIcon icon={faRightFromBracket} size={24} color="white" />
          <Text style={styles.logout_title}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
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
  profile_container: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  profile_infor: {
    flexDirection: "row",
    alignItems: "center",
  },
  infor_img: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  title_name: {
    fontSize: 16,
    fontWeight: 500,
    color: text_col.color_800,
  },
  title_star: {
    flexDirection: "row",
    alignItems: "center",
  },
  star_number: {
    fontSize: 14,
    color: text_col.color_600,
    marginLeft: 5,
  },
  completed_container: {
    margin: 20,
    padding: 15,
    backgroundColor: colors.primary_100,
    borderRadius: 10,
    alignItems: "center",
  },
  completed_title: {
    fontSize: 16,
    fontWeight: 500,
  },
  completed_content: {
    fontSize: 12,
    color: text_col.color_600,
    textAlign: "center",
  },
  completed_expression: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
    marginTop: 20,
  },
  expression_item: {
    alignItems: "center",
    justifyContent: "center",
  },
  item_icon: {
    backgroundColor: colors.primary_300,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  item_percent: {
    color: "#02B529",
    fontWeight: 500,
    marginTop: 3,
  },
  item_type: {
    color: text_col.color_800,
  },
  logout_container: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  logout_block: {
    backgroundColor: colors.primary_300,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
  },
  logout_title: {
    fontSize: 18,
    fontWeight: 500,
    color: "white",
    marginLeft: 15,
  },
});

export default ProfilePage;
