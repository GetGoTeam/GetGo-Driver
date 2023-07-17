import * as React from "react";
import { colors, text_col } from "../../../utils/colors";
import { txt_size } from "../../../utils/sizes";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NavBaseItem = props => {
  const { item, active } = props;
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(item.tag)}>
      <View style={styles.container}>
        <FontAwesomeIcon
          icon={item.icon}
          style={[styles.icon, active ? styles.active : ""]}
          size={25}
        />
        <Text style={[styles.title, active ? styles.active : ""]}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NavBaseItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 7,
  },
  title: {
    fontSize: 14,
    color: text_col.color_400,
    fontWeight: "bold",
  },
  icon: {
    color: text_col.color_400,
  },
  active: {
    color: colors.primary_300,
  },
});
