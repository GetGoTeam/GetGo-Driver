import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, text_col } from "../../utils/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTripDetails,
  setDestination,
  setTripDetails,
} from "~/slices/navSlice";

export default () => {
  const navigation = useNavigation();
  const tripDetails = useSelector(selectTripDetails);
  const dispatch = useDispatch();

  const formatCurrencyVND = numberString => {
    const integerNumber = parseInt(numberString);
    if (isNaN(integerNumber)) {
      return "Invalid number";
    }

    // Định dạng số nguyên thành tiền VND
    const formattedNumber = integerNumber.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedNumber;
  };

  const handleAcceptPrice = () => {
    dispatch(setTripDetails(null));
    dispatch(setDestination(null));
    navigation.reset({
      index: 0,
      routes: [{ name: "HomePage" }],
    });
  };
  return (
    tripDetails && (
      <View style={styles.container}>
        <View style={styles.container_heading}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProceedingTripPage");
            }}
          >
            <FontAwesomeIcon
              style={styles.ic_back}
              icon={faArrowLeft}
              size={28}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.heading_txt}>Thanh toán cho Bảo Long</Text>
        </View>
        <View style={styles.heading_money}>
          <View style={styles.money_number}>
            <Text style={styles.money_cost}>
              {formatCurrencyVND(tripDetails.price)}
            </Text>
          </View>
          <Text style={styles.payment}>Thu Tiền Mặt</Text>
        </View>
        <View style={styles.container_details}>
          <View style={styles.item_details}>
            <Text style={styles.item_txt}>Giá cố định</Text>
            <Text style={styles.item_txt}>
              {formatCurrencyVND(tripDetails.price - tripDetails.surcharge)}
            </Text>
          </View>
          <View style={styles.item_details}>
            <Text style={styles.item_txt}>Phụ phí</Text>
            <Text style={styles.item_txt}>
              {formatCurrencyVND(tripDetails.surcharge)}
            </Text>
          </View>
          <View style={styles.item_details}>
            <Text style={styles.item_txt}>Phí nhận được</Text>
            <Text style={styles.item_txt}>
              {formatCurrencyVND(
                (tripDetails.price - tripDetails.surcharge) * 0.7 +
                  tripDetails.surcharge
              )}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btn_container}
            onPress={handleAcceptPrice}
          >
            <Text style={styles.btn_txt}>Xác nhận thu phí</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary_300,
    position: "relative",
  },
  container_heading: {
    flexDirection: "row",
    alignItems: "center",
    margin: 25,
  },
  heading_txt: {
    fontSize: 16,
    color: "white",
    textTransform: "uppercase",
    fontWeight: 600,
    marginLeft: 15,
  },
  heading_money: {
    height: 400,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  money_number: {
    flexDirection: "row",
  },

  money_cost: {
    color: "white",
    fontSize: 28,
    fontWeight: 600,
  },
  payment: {
    color: "white",
    fontWeight: 500,
    fontSize: 14,
  },
  container_details: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    padding: 20,
  },
  item_details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item_txt: {
    fontSize: 16,
    fontWeight: 500,
    padding: 10,
    color: text_col.color_700,
  },
  btn_container: {
    backgroundColor: colors.primary_300,
    height: 45,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btn_txt: {
    fontSize: 16,
    color: "white",
  },
});
