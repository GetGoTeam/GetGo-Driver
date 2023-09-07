import {
  faArrowLeft,
  faPaperPlane,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useState, useRef } from "react";
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
import socketServcies from "~/src/utils/websocketContext";
import { useSelector } from "react-redux";
import { selectInforDriver, selectTripDetails } from "~/slices/navSlice";
import request from "~/src/utils/request";

export default () => {
  const scrollViewRef = useRef(null);

  const navigation = useNavigation();
  const [chatBuffers, setChatBuffers] = useState([]);
  const [textInput, setTextInput] = useState("");

  const inforDriver = useSelector(selectInforDriver);
  const tripDetails = useSelector(selectTripDetails);

  const formatTime = dateString => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };

  const updateInputText = text => {
    setTextInput(text);
  };

  const handleSendMessage = () => {
    setTextInput("");

    const dataSend = {
      customer_receive: tripDetails.customer,
      content: textInput,
    };

    const headers = { Authorization: "Bearer " + inforDriver.token };
    request
      .post("create-message", dataSend, { headers })
      .then(response => {
        // console.log(response.data);
        // scrollViewRef.current.scrollToEnd({ animated: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    try {
      socketServcies.initializeSocket("chatting");
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      socketServcies.on(
        `message_${tripDetails.customer}_${inforDriver._id}`,
        msg => {
          // console.log(chatBuffers);
          // const chatArr = [...chatBuffers];
          // console.log(chatArr);
          setChatBuffers(chatBuffers => [...chatBuffers, msg.content]);
          // scrollViewRef.current.scrollToEnd({ animated: true });
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const headers = { Authorization: "Bearer " + inforDriver.token };
    request
      .get(`get-messages-customer/${tripDetails.customer}`, { headers })
      .then(response => {
        // console.log(response.data);
        setChatBuffers(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [chatBuffers]);

  return (
    <View style={styles.container}>
      <View style={styles.heading_container}>
        <View style={styles.heading_left}>
          <TouchableOpacity
            onPress={() => {
              socketServcies.disconnectSocket();
              navigation.navigate("ProceedingTripPage");
            }}
          >
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
      <ScrollView ref={scrollViewRef} style={styles.mess_container}>
        {chatBuffers.map((value, index) => {
          return value.driver_receive !== inforDriver.id ? (
            <View key={index} style={styles.mess_receive}>
              <Text style={styles.mess_txt}>{value.content}</Text>
              <Text style={styles.mess_time}>
                {formatTime(value.createdAt)}
              </Text>
            </View>
          ) : (
            <View key={index} style={styles.mess_send}>
              <Text style={styles.mess_txt}>{value.content}</Text>
              <Text style={styles.mess_time}>
                {formatTime(value.createdAt)}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.chat_container}>
        <TextInput
          style={styles.chat_input}
          placeholder="Nhắn tin"
          value={textInput}
          onChangeText={updateInputText}
        />

        {textInput === "" ? (
          <FontAwesomeIcon
            icon={faPaperPlane}
            size={24}
            color={text_col.color_300}
          />
        ) : (
          <TouchableOpacity onPress={handleSendMessage}>
            <FontAwesomeIcon
              icon={faPaperPlane}
              size={24}
              color={colors.primary_300}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    paddingHorizontal: 20,
    marginTop: 5,
  },
  mess_receive: {
    width: "auto",
    maxWidth: 320,
    padding: 10,
    marginBottom: 15,
    backgroundColor: colors.primary_50,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  mess_send: {
    width: "auto",
    maxWidth: 320,
    padding: 10,
    backgroundColor: colors.primary_100,
    borderRadius: 10,
    alignSelf: "flex-end",
    marginBottom: 10,
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
