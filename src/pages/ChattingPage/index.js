import {
  faArrowLeft,
  faPaperPlane,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors, text_col } from "../../utils/colors";
import { useNavigation } from "@react-navigation/native";

export default () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.heading_container}>
        <View style={styles.heading_left}>
          <TouchableOpacity onPress={() => navigation.navigate("OrderPage2")}>
            <FontAwesomeIcon icon={faArrowLeft} size={28} color="white" />
          </TouchableOpacity>
          <View style={styles.heading_left_infor}>
            <Image
              style={styles.infor_image}
              source={require("../../../assets/portrait.png")}
            />
            <Text style={styles.infor_text}>Bảo Long</Text>
          </View>
        </View>
        <FontAwesomeIcon icon={faPhone} size={26} color="white" />
      </View>
      <ScrollView style={styles.mess_container}>
        <View style={styles.mess_receive}>
          <Text style={styles.mess_txt}>Tôi đang đến đón bạn</Text>
          <Text style={styles.mess_time}>11:29</Text>
        </View>
        <View style={styles.mess_send}>
          <Text style={styles.mess_txt}>Tôi đang chờ bạn đến đón</Text>
          <Text style={styles.mess_time}>11:29</Text>
        </View>
      </ScrollView>
      <View style={styles.chat_container}>
        <TextInput style={styles.chat_input} placeholder="Nhắn tin" />
        <TouchableOpacity>
          <FontAwesomeIcon
            icon={faPaperPlane}
            size={24}
            color={colors.primary_300}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading_container: {
    backgroundColor: colors.primary_300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  heading_left: {
    flexDirection: "row",
    alignItems: "center",
  },
  heading_left_infor: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  infor_image: { height: 40, width: 40, borderRadius: 30 },
  infor_text: {
    fontSize: 18,
    color: text_col.color_800,
    marginLeft: 15,
  },
  mess_container: {
    backgroundColor: "white",
    padding: 20,
  },
  mess_receive: {
    width: "auto",
    maxWidth: 320,
    padding: 10,
    marginBottom: 15,
    backgroundColor: colors.primary_50,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  mess_send: {
    width: "auto",
    maxWidth: 320,
    padding: 10,
    backgroundColor: colors.primary_100,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  mess_txt: {
    fontSize: 16,
    color: text_col.color_800,
  },
  mess_time: {
    fontSize: 10,
    color: text_col.color_500,
    alignSelf: "flex-end",
  },
  chat_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  chat_input: {
    width: 330,
    maxWidth: 330,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16,
    borderRadius: 30,
    backgroundColor: text_col.color_100,
  },
});
