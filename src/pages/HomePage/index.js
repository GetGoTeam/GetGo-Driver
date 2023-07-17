import * as React from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircle,
  faCircleDollarToSlot,
  faPowerOff,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import NavBase from "../../components/NavBase/index";
import IncomeItem from "./IncomeItem";
import { colors, text_col } from "../../utils/colors";

const HomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <View style={styles.income}>
            <FontAwesomeIcon
              icon={faCircleDollarToSlot}
              color="#fff"
              size={23}
            />
            <Text style={styles.income_text}>Thu nhập</Text>
          </View>
          <View>
            <View style={styles.btn_exit}>
              <FontAwesomeIcon icon={faXmark} size={20} color="#fff" />
            </View>
            <View style={{ marginTop: 10 }}>
              <IncomeItem title={"Thu nhập"} money={200000} />
              <IncomeItem title={"Thu nhập"} money={200000} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.btn}>
        <FontAwesomeIcon icon={faPowerOff} color="#fff" size={25} />
        <Text style={styles.btn_text}>Bật kết nối</Text>
      </View>
      <View style={styles.activity}>
        <FontAwesomeIcon icon={faCircle} size={9} color="#00BF13" />
        <Text style={styles.activity_text}>Bạn đang online</Text>
      </View>
      <NavBase />
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  income: {
    display: "none",
    // display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_300,
    borderRadius: 40,
    alignSelf: "flex-start",
    marginBottom: 3,
    marginStart: 10,
    padding: 15,
  },
  income_text: {
    fontSize: 16,
    fontWeight: 500,
    color: "white",
    marginStart: 10,
    textTransform: "uppercase",
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_300,
    borderRadius: 40,
    alignSelf: "flex-start",
    marginBottom: 3,
    marginStart: 10,
    padding: 20,
  },
  btn_text: {
    display: "none",
    fontSize: 16,
    color: text_col.color_700,
    marginStart: 10,
  },
  btn_exit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_300,
    borderRadius: 40,
    alignSelf: "flex-start",
    marginBottom: 3,
    marginStart: 10,
    padding: 13,
  },
  activity: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "94%",
    marginBottom: 65,
    // backgroundColor: "#00BF13",
    backgroundColor: colors.primary_200,
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 30,
    borderRadius: 5,
    // borderColor: "#00BF13",
    // borderColor: text_col.color_200,
    // borderWidth: 1,
  },
  activity_text: {
    fontSize: 16,
    fontWeight: 400,
    marginLeft: 5,
    // color: "#00BF13",
  },
});
