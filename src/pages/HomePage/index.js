import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircle,
  faCircleDollarToSlot,
  faPowerOff,
  faStar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import IncomeItem from "./IncomeItem";
import NavBase from "~components/NavBase/index";
import GoogleMap from "../../components/GoogleMap";
import { colors, text_col } from "../../utils/colors";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInforDriver,
  setOrigin,
  setTripDetails,
} from "../../../slices/navSlice";
import { GOONG_MAPS_APIKEY } from "@env";
import axios from "axios";
import Loading from "~/src/components/Loading";
import { useNavigation } from "@react-navigation/native";
import socketServcies from "~/src/utils/websocketContext";
import request from "~/src/utils/request";

const HomePage = () => {
  const [openIncome, setOpenIncome] = useState(false);
  const [offline, setOffline] = useState(true);

  const [latitudePicked, setLatitudePicked] = useState(0);
  const [longitudePicked, setLongitudePicked] = useState(0);
  const [currentPosition, setCurrentPosition] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const inforDriver = useSelector(selectInforDriver);

  const handleTurnOnConnections = () => {
    if (!inforDriver.licensePlate || !inforDriver.capacity) {
      Alert.alert(
        "Bạn phải cập nhật thông tin xe trước khi bắt đầu hoạt động."
      );
      navigation.navigate("EditInformation");
    } else {
      setOffline(!offline);
    }
  };

  const getPlaceFromCoordinates = async (latitude, longitude) => {
    const url = `https://rsapi.goong.io/Geocode?latlng=${latitude},%20${longitude}&api_key=${GOONG_MAPS_APIKEY}`;

    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        setIsLoading(false);

        return response.data.results[0].formatted_address;
      } else {
        console.log("error:" + response.data.error_message);
        setIsLoading(false);

        return null;
      }
    } catch (error) {
      console.error("Error getting place from coordinates:", error);
      setIsLoading(false);
      return "Error";
    }
  };

  const getLocationCurrent = async () => {
    try {
      // Kiểm tra quyền truy cập vị trí
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (!status.includes("granted")) {
        console.warn(
          "Quyền truy cập vị trí không được cấp, vui lòng kiểm tra lại."
        );
        setIsLoading(false);
        return;
      }

      // Lấy vị trí hiện tại
      const location = await Location.getCurrentPositionAsync({});

      // Gán giá trị vị trí hiện tại
      setLatitudePicked(location.coords.latitude);
      setLongitudePicked(location.coords.longitude);

      // Chuyển đổi vị trí hiện tại thành địa chỉ
      const address = await getPlaceFromCoordinates(
        location.coords.latitude,
        location.coords.longitude
      );
      setCurrentPosition(address);
    } catch (error) {
      console.error("Lỗi khi lấy vị trí:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (offline) {
      if (socketServcies.connected) socketServcies.disconnectSocket();
      console.log(socketServcies.connected);
      request
        .patch(
          "update-status",
          {
            id: inforDriver._id,
            status: "Inactive",
          },
          {
            headers: {
              Authorization: "Bearer " + inforDriver.token,
            },
          }
        )
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    } else {
      request
        .patch(
          "update-status",
          {
            id: inforDriver._id,
            status: "Active",
          },
          {
            headers: {
              Authorization: "Bearer " + inforDriver.token,
            },
          }
        )
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
      socketServcies.initializeSocket("");
      socketServcies.on(inforDriver._id, msg => {
        console.log(msg.content);
        dispatch(setTripDetails(msg.content));
        navigation.navigate("ReceiveTrip");
        socketServcies.disconnectSocket();
      });
    }
  }, [offline]);

  useEffect(() => {
    getLocationCurrent();
  }, []);

  useEffect(() => {
    dispatch(
      setOrigin({
        latitude: latitudePicked,
        longitude: longitudePicked,
        address: currentPosition,
      })
    );
  }, [latitudePicked, longitudePicked, currentPosition]);

  return isLoading ? (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <Loading loading={isLoading} />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <StatusBar style={styles.zindex_item} />
      <View style={[styles.heading, styles.zindex_item]}>
        <View>
          <TouchableOpacity onPress={() => setOpenIncome(true)}>
            <View style={!openIncome ? styles.income : { display: "none" }}>
              <FontAwesomeIcon
                icon={faCircleDollarToSlot}
                color="#fff"
                size={18}
              />
              <Text style={styles.income_text}>Thu nhập</Text>
            </View>
          </TouchableOpacity>

          <View style={openIncome ? { marginStart: 10 } : { display: "none" }}>
            <TouchableOpacity onPress={() => setOpenIncome(false)}>
              <View style={styles.btn_exit}>
                <FontAwesomeIcon icon={faXmark} size={20} color="#fff" />
              </View>
            </TouchableOpacity>
            <View>
              <IncomeItem title={"Thu nhập"} money={200000} />
              <IncomeItem title={"Thu nhập"} money={200000} />
            </View>
          </View>
        </View>
        <View style={styles.block_star}>
          <Image
            source={require("../../../assets/portrait.png")}
            style={styles.portrait}
          />
          <View style={styles.btn_star}>
            <FontAwesomeIcon icon={faStar} color="#FFF500" size={18} />
            <Text style={styles.btn_star_text}>{inforDriver.rated}</Text>
          </View>
        </View>
      </View>
      <View
        style={[
          { position: "absolute", bottom: 0, width: "100%" },
          styles.zindex_item,
        ]}
      >
        <TouchableOpacity onPress={handleTurnOnConnections}>
          <View
            style={
              offline ? styles.btn_active_status : styles.btn_inactive_status
            }
          >
            <FontAwesomeIcon icon={faPowerOff} color="#fff" size={25} />
            <Text style={offline ? styles.btn_text : { display: "none" }}>
              Bật kết nối
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.activity_block}>
          <View style={[styles.activity]}>
            <FontAwesomeIcon
              icon={faCircle}
              size={9}
              color={offline ? "#F65900" : "#00BF13"}
            />
            <Text style={styles.activity_text}>
              Bạn đang {offline ? "offline" : "online"}
            </Text>
          </View>
        </View>
        <View style={styles.navbar}>
          <NavBase />
        </View>
      </View>
      <View style={styles.google_map}>
        <GoogleMap
          latitudePicked={latitudePicked}
          longitudePicked={longitudePicked}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  zindex_item: {
    zIndex: 1,
  },
  navbar: {
    alignItems: "center",
    height: 60,
  },
  heading: {
    flex: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    marginTop: 50,
  },
  income: {
    flexDirection: "row",
    backgroundColor: colors.primary_300,
    borderRadius: 40,
    marginBottom: 3,
    marginStart: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  income_text: {
    fontSize: 14,
    fontWeight: 500,
    color: "white",
    marginStart: 10,
    textTransform: "uppercase",
  },
  block_star: {
    display: "flex",
    alignItems: "center",
    marginEnd: 10,
  },
  portrait: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginBottom: -5,
  },
  btn_star: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.primary_300,
    borderRadius: 40,
    paddingVertical: 6,
    width: 90,
  },
  btn_star_text: {
    fontSize: 14,
    fontWeight: 500,
    color: "white",
    marginStart: 8,
  },
  btn_inactive_status: {
    backgroundColor: "#686868",
    borderRadius: 40,
    alignSelf: "flex-start",
    marginBottom: 3,
    marginStart: 10,
    padding: 20,
  },
  btn_active_status: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_300,
    borderRadius: 40,
    alignSelf: "center",
    marginBottom: 3,
    marginStart: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  btn_text: {
    fontSize: 16,
    color: "#fff",
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
  activity_block: { width: "100%", display: "flex", alignItems: "center" },
  activity: {
    flexDirection: "row",
    alignItems: "center",
    width: "94%",
    marginBottom: 5,
    backgroundColor: colors.primary_200,
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 30,
    borderRadius: 5,
  },
  activity_text: {
    fontSize: 16,
    fontWeight: 400,
    marginLeft: 5,
  },
  google_map: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
  },
});
