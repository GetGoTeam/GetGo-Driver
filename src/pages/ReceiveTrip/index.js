import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
// import NavBar from "../../components/NavBar";
import { colors, text } from "../../utils/colors";
import { Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleInfo, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInforDriver,
  selectTripDetails,
  setDestination,
  setOrigin,
} from "~/slices/navSlice";
import request from "~/src/utils/request";
import Loading from "~/src/components/Loading";

const ReceiveTrip = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [count, setCount] = useState(10);
  const intervalRef = useRef(null);
  const rotation = useRef(new Animated.Value(0)).current;

  const tripDetails = useSelector(selectTripDetails);
  const inforDriver = useSelector(selectInforDriver);

  const [isLoading, setIsLoading] = useState(false);

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

  const handleAcceptTrip = async () => {
    setIsLoading(true);
    let dataSend = { ...tripDetails };
    dataSend.status = "Picking Up";
    await request
      .post(
        "accept",
        { ...dataSend, driver: inforDriver._id },
        {
          Headers: {
            Authorization: "Bearer " + inforDriver.token,
          },
        }
      )
      .then(res => {
        console.log(res.data);
        dispatch(
          setDestination({
            latitude: tripDetails.lat_pickup,
            longitude: tripDetails.long_pickup,
            address: tripDetails.address_pickup,
          })
        );
        navigation.navigate("ProceedingTripPage");
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateStyle = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount(prevCount => {
        if (prevCount === 0) {
          clearInterval(intervalRef.current);
          return prevCount;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (count === 0) navigation.goBack();
  }, [count]);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View style={styles.heading_title}>
          <View>
            <Text style={styles.heading_text1}>Đơn Mới</Text>
            <Text>Hãy xác nhận đơn nào...</Text>
          </View>
          <View>
            <Image
              source={require("~assets/header.png")}
              style={styles.heading_img}
            />
          </View>
        </View>
        <Animated.View style={[styles.heading_count, rotateStyle]}>
          <Text>{count}s</Text>
        </Animated.View>
      </View>
      <View style={styles.payment}>
        <View>
          <Text style={styles.payment_text1}>VNĐ</Text>
          <Text style={styles.payment_text2}>
            {formatCurrencyVND(
              (tripDetails.price - tripDetails.surcharge) * 0.7 +
                tripDetails.surcharge
            )}
          </Text>
        </View>
        <View>
          <Text style={styles.payment_text3}>Thanh toán</Text>
          <View style={styles.payment_type}>
            <Text style={styles.payment_text4}>Tiền mặt</Text>
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
                {tripDetails.address_pickup.split(",")[0]}
              </Text>
              <Text style={styles.location_text2}>
                {tripDetails.address_pickup}
              </Text>
            </View>
            <View>
              <Text style={[styles.location_text1, styles.location_text12]}>
                {tripDetails.address_destination.split(",")[0]}
              </Text>
              <Text style={styles.location_text2}>
                {tripDetails.address_destination}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.btn}>
        <View style={styles.btn_block}>
          <TouchableOpacity
            onPress={() => {
              clearInterval(intervalRef.current);
              navigation.navigate("HomePage");
            }}
            style={styles.btn_cancel}
          >
            <Text style={styles.btn_text1}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAcceptTrip}>
            <View style={styles.btn_accept}>
              <Text style={styles.btn_text2}>Nhận Đơn</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Loading loading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    position: "relative",
    paddingStart: 15,
    paddingEnd: 15,
    backgroundColor: colors.primary_200,
    height: 190,
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
  heading_count: {
    position: "absolute",
    bottom: 18,
    left: 20,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    borderColor: colors.primary_300,
    borderWidth: 2,
    color: "#2C2C2C",
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
  btn: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    bottom: 50,
  },
  btn_block: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn_cancel: {
    borderColor: colors.primary_300,
    borderWidth: 2,
    borderRadius: 5,
    width: 130,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
  },
  btn_text1: {
    fontSize: 20,
    fontWeight: 500,
    color: colors.primary_300,
  },
  btn_accept: {
    backgroundColor: colors.primary_300,
    borderRadius: 5,
    width: 130,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
  },
  btn_text2: {
    fontSize: 20,
    fontWeight: 500,
    color: "white",
  },
});

export default ReceiveTrip;
