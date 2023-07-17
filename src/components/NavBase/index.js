import * as React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import NavBaseItem from "./NavBaseItem";
import {
  faBell,
  faUser,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

import { colors, text_col } from "../../utils/colors";

const data = [
  { title: "Thông báo", icon: faBell, tag: "NotificationPage" },
  { title: "Lịch sử đơn", icon: faClockRotateLeft, tag: "HistoryPage" },
  { title: "Cá nhân", icon: faUser, tag: "ProfilePage" },
];

const NavBase = props => {
  const { activeIndex, navigation } = props;

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <NavBaseItem
          key={index}
          item={item}
          active={activeIndex === index}
          navigation={navigation}
        />
      ))}
    </View>
  );
};

export default NavBase;

const styles = StyleSheet.create({
  container: {
    // display: "none",
    position: "absolute",
    justifyContent: "space-around",
    flexDirection: "row",
    width: "94%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: text_col.color_200,
    borderRadius: 10,
  },
});
