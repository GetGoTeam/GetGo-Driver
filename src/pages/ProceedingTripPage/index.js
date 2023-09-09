import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircle,
  faCommentDots,
  faLocationCrosshairs,
  faPhone,
  faReceipt,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import GoogleMap from "../../components/GoogleMap";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInforDriver,
  selectNotifChat,
  selectOrigin,
  selectTripDetails,
  setNotifChat,
  setTripDetails,
} from "../../../slices/navSlice";
import request from "~/src/utils/request";
import Loading from "~/src/components/Loading";
import socketServcies from "~/src/utils/websocketContext";

const ProceedingTripPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tripDetails = useSelector(selectTripDetails);
  const inforDriver = useSelector(selectInforDriver);
  const notifChat = useSelector(selectNotifChat);

  const [isLoading, setIsLoading] = useState(false);

  const [cntChat, setCntChat] = useState(0);
  const [stepTakeCus, setStepTakeCus] = useState(0);
  const [statusHeader, setStatusHeader] = useState(false);
  const statusTakeCus = ["Đón khách", "Khách xuống xe", "Hoàn thành đơn"];

  const handleOrderStep = () => {
    if (stepTakeCus === 0) {
      setIsLoading(true);
      request
        .patch("update-trip-status", {
          id: tripDetails._id,
          status: "Arriving",
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (stepTakeCus === 1) {
      setIsLoading(true);
      request
        .patch("update-trip-status", {
          id: tripDetails._id,
          status: "Arrived",
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (stepTakeCus === 2) {
      request
        .delete(
          `delete-both-messages-driver-customer/${tripDetails.customer}`,
          {
            headers: {
              Authorization: "Bearer " + inforDriver.token,
            },
          }
        )
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
      socketServcies.disconnectSocket();
      navigation.navigate("CompleteTrip");
    }
    if (stepTakeCus < 2) {
      setStepTakeCus(stepTakeCus + 1);
    }
    setStatusHeader(stepTakeCus > 0);
  };

  const hanldeViewDetails = () => {
    dispatch(
      setTripDetails({
        ...tripDetails,
        path: "ProceedingTripPage",
        showFeedback: false,
      })
    );

    navigation.navigate("TripDetails");
  };

  useEffect(() => {
    try {
      socketServcies.initializeSocket("chatting");
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log(`message_${tripDetails.customer}_${inforDriver._id}`);
    try {
      socketServcies.on(
        `message_${tripDetails.customer}_${inforDriver._id}`,
        msg => {
          if (notifChat) setCntChat(cntChat => cntChat + 1);
          console.log(cntChat, notifChat);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Loading loading={isLoading} />
      <View style={styles.heading}>
        <View style={styles.heading_nav}>
          <View>
            <Text style={styles.heading_text1}>Đón khách</Text>
            <Text style={styles.heading_text2}>Bảo Long</Text>
          </View>
          <View>
            <Text style={[styles.heading_text1, styles.heading_text1_inactive]}>
              Khách xuống xe
            </Text>
            <Text style={styles.heading_text2}>Bảo Long</Text>
          </View>
        </View>
        <View style={styles.block_nav_status}>
          <View
            style={[styles.status1, statusHeader ? styles.color_black : ""]}
          ></View>
          <View
            style={[styles.status2, !statusHeader ? styles.color_black : ""]}
          ></View>
        </View>
        <View style={styles.heading_title}>
          <View style={styles.text_block}>
            <Text style={styles.title_text}>
              {stepTakeCus === 0
                ? tripDetails.address_pickup
                : tripDetails.address_destination}
            </Text>
            <View style={styles.title_fee}>
              <Text style={styles.title_text}>GoDriver</Text>
              <FontAwesomeIcon icon={faCircle} size={7} color="#1D1D1D" />
              <Text style={[styles.title_text, styles.money]}>
                VND 50.000 - 60.000
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <View style={styles.title_location}>
              <FontAwesomeIcon
                icon={faLocationCrosshairs}
                size={26}
                color={colors.primary_300}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.payment_type}>
          <Text style={{ color: "white" }}>Tiền mặt</Text>
        </View>
      </View>
      <View style={styles.google_map}>
        <GoogleMap />
      </View>
      <View style={styles.btn}>
        <View style={styles.btn_block}>
          <View style={styles.block_item}>
            <FontAwesomeIcon icon={faPhone} size={32} color="white" />
            <Text style={styles.item_text}>Gọi</Text>
          </View>
          <TouchableOpacity
            style={[styles.block_item, styles.block_item_center]}
            onPress={() => {
              dispatch(setNotifChat(false));
              setCntChat(0);
              navigation.navigate("ChattingPage");
            }}
          >
            <View style={{ position: "relative" }}>
              <FontAwesomeIcon icon={faCommentDots} size={32} color="white" />
              {cntChat !== 0 ? (
                <Text style={styles.number_chat}>{cntChat}</Text>
              ) : (
                <></>
              )}
            </View>
            <Text style={styles.item_text}>Nhắn tin</Text>
          </TouchableOpacity>
          <View style={styles.block_item}>
            <View style={styles.ic_block}>
              <FontAwesomeIcon icon={faToggleOn} size={24} color="#30AA48" />
            </View>
            <Text style={styles.item_text}>Sẵn sàng</Text>
          </View>
        </View>
        <View style={styles.btn_follow}>
          <View style={styles.follow_block}>
            <TouchableOpacity onPress={handleOrderStep}>
              <View
                style={[
                  styles.block_main,
                  styles[stepTakeCus > 0 ? "color_bg_green" : ""],
                ]}
              >
                <Text
                  style={[
                    styles.main_text,
                    styles[stepTakeCus > 0 ? "color_white" : ""],
                  ]}
                >
                  {statusTakeCus.at(stepTakeCus)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={hanldeViewDetails}
            style={styles.block_item}
          >
            <FontAwesomeIcon icon={faReceipt} color="white" size={32} />
            <Text style={styles.item_text}>Xem đơn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  block_nav_status: {
    width: "100%",
    height: 80,
    position: "absolute",
    top: 0,
    flexDirection: "row",
  },
  status1: {
    width: "50%",
    height: "100%",
    opacity: 0.3,
    borderBottomRightRadius: 3,
  },
  status2: {
    width: "65%",
    height: "100%",
    borderBottomLeftRadius: 3,
    opacity: 0.3,
  },
  color_black: { backgroundColor: "black" },
  heading: {
    height: 190,
    paddingStart: 15,
    backgroundColor: colors.primary_200,
  },
  heading_nav: {
    height: 80,
    paddingEnd: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  heading_text1: {
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: 500,
    color: "#34A852",
  },
  heading_text1_inactive: {
    color: "#EC3632",
  },
  heading_text2: {
    fontSize: 16,
    fontWeight: 500,
  },
  heading_title: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text_block: {
    width: "75%",
  },
  title_fee: {
    width: 240,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title_text: {
    fontSize: 15,
    color: "#1D1D1D",
  },
  money: { color: "#30AA48", fontWeight: 500 },
  title_location: {
    height: 55,
    width: 55,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: colors.primary_300,
  },
  payment_type: {
    height: 30,
    width: 80,
    backgroundColor: "#30AA48",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  google_map: {
    height: 480,
    width: "100%",
  },
  btn: {
    height: 191,
    width: "100%",
    backgroundColor: colors.primary_300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  btn_block: {
    flexDirection: "row",
    borderBottomColor: "white",
    borderBottomWidth: 1.5,
  },
  block_item: {
    width: "33.33%",
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  block_item_center: {
    borderLeftColor: "white",
    borderLeftWidth: 1.5,
    borderRightColor: "white",
    borderRightWidth: 1.5,
  },
  item_text: {
    fontSize: 16,
    color: "white",
    fontWeight: 500,
  },
  ic_block: {
    backgroundColor: "white",
    height: 40,
    width: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "#30AA48",
    // borderWidth: 2,
  },
  btn_follow: {
    height: 101,
    flexDirection: "row",
    alignItems: "center",
  },
  follow_block: {
    width: "66.8%",
    height: 101,
    borderRightColor: "white",
    borderRightWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  block_main: {
    height: 80,
    width: 260,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  number_chat: {
    position: "absolute",
    right: -10,
    top: -6,
    backgroundColor: "#FF0000",
    color: "white",
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 0,
    fontSize: 11,
    fontWeight: 600,
  },
  main_text: {
    fontSize: 18,
    fontWeight: 500,
    color: "#1d1d1d",
  },
  color_white: {
    color: "white",
  },
  color_bg_green: {
    backgroundColor: "#30AA48",
  },
  color_green: {
    color: "#30AA48",
  },
});

export default ProceedingTripPage;
