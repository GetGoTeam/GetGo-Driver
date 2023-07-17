import { faAngleRight, faDongSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";

import { colors, text_col } from "../../../utils/colors";

const IncomeItem = props => {
  const { title, money } = props;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_content}>
        <Text style={styles.container_content_title}>{title}</Text>
        <View style={styles.container_content_title_money}>
          <FontAwesomeIcon icon={faDongSign} size={18} />
          <Text style={styles.container_content_title_money_txt}>{money}</Text>
        </View>
      </View>
      <View>
        <FontAwesomeIcon icon={faAngleRight} />
      </View>
    </SafeAreaView>
  );
};

export default IncomeItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: 200,
    backgroundColor: colors.primary_100,
    padding: 6,
    borderRadius: 6,
    marginTop: 5,
  },
  container_content: {},
  container_content_title: {
    fontSize: 14,
    fontWeight: 400,
    Color: text_col.color_600,
  },
  container_content_title_money: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  container_content_title_money_txt: {
    fontSize: 18,
    fontWeight: 500,
    marginStart: 2,
  },
});
