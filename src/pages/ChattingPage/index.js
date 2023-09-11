import { faArrowLeft, faPaperPlane, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Image, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { colors, text_col } from "../../utils/colors";
import { useNavigation } from "@react-navigation/native";
import socketServcies from "~/src/utils/websocketContext";
import { useDispatch, useSelector } from "react-redux";
import { selectInforDriver, selectTripDetails, setNotifChat } from "~/slices/navSlice";
import request from "~/src/utils/request";
import EStyleSheet from "react-native-extended-stylesheet";
import Loading from "~/src/components/Loading";

export default () => {
  const scrollViewRef = useRef(null);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [chatBuffers, setChatBuffers] = useState([]);
  const [textInput, setTextInput] = useState("");

  const inforDriver = useSelector(selectInforDriver);
  const tripDetails = useSelector(selectTripDetails);

  const [isGetMsg, setIsGetMsg] = useState(false);
  const [sending, setSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes}`;
  };

  const updateInputText = (text) => {
    setTextInput(text);
  };

  const handleSendMessage = () => {
    setTextInput("");
    setSending(true);
    const dataSend = {
      customer_receive: tripDetails.customer,
      content: textInput,
    };

    const headers = { Authorization: "Bearer " + inforDriver.token };
    request
      .post("create-message", dataSend, { headers })
      .then((response) => {
        // console.log(response.data);
        // scrollViewRef.current.scrollToEnd({ animated: true });
        setChatBuffers((chatBuffers) => [...chatBuffers, response.data]);
        console.log("sent msg");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function () {
        setSending(false);
      });
  };

  useEffect(() => {
    if (!firstRender) return;
    try {
      socketServcies.initializeSocket("chatting");
      console.log("init socket msg");
    } catch (error) {
      console.log(error);
    } finally {
      setFirstRender(false);
    }
  }, []);

  useEffect(() => {
    if (sending) return;
    setIsGetMsg(true);
    console.log(`message_${tripDetails.customer}_${inforDriver._id}`);
    try {
      socketServcies.on(`message_${tripDetails.customer}_${inforDriver._id}`, (msg) => {
        if (msg.content.driver_receive) {
          console.log("received msg");
          setChatBuffers((chatBuffers) => [...chatBuffers, msg.content]);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsGetMsg(false);
    }
  }, []);

  useEffect(() => {
    const headers = { Authorization: "Bearer " + inforDriver.token };
    if (isGetMsg) return;
    (async () => {
      setIsLoading(true);
      await request
        .get(`get-messages-customer/${tripDetails.customer}`, {
          headers: headers,
        })
        .then((response) => {
          setChatBuffers(response.data);
          console.log("loaded msg");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(function () {
          setIsLoading(false);
          scrollViewRef.current.scrollToEnd({ animated: true });
        });
    })();
  }, []);

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [chatBuffers]);

  return (
    <View style={styles.container}>
      <Loading loading={isLoading} />
      <View style={styles.heading_container}>
        <View style={styles.heading_left}>
          <TouchableOpacity
            onPress={() => {
              dispatch(setNotifChat(true));
              navigation.navigate("ProceedingTripPage");
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size={28} color="white" />
          </TouchableOpacity>
          <View style={styles.heading_left_infor}>
            <Image style={styles.infor_image} source={require("../../../assets/portrait.png")} />
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
              <Text style={styles.mess_time}>{formatTime(value.createdAt)}</Text>
            </View>
          ) : (
            <View key={index} style={styles.mess_send}>
              <Text style={styles.mess_txt}>{value.content}</Text>
              <Text style={styles.mess_time}>{formatTime(value.createdAt)}</Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.chat_container}>
        <TextInput style={styles.chat_input} placeholder="Nhắn tin" value={textInput} onChangeText={updateInputText} />

        {textInput === "" || sending ? (
          <FontAwesomeIcon icon={faPaperPlane} size={24} color={text_col.color_300} />
        ) : (
          <TouchableOpacity onPress={handleSendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} size={24} color={colors.primary_300} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  heading_container: {
    backgroundColor: colors.primary_300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingTop: "3rem",
    padding: "1rem",
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
    marginLeft: "1rem",
    flexDirection: "row",
    alignItems: "center",
  },
  infor_image: {
    height: 40,
    width: 40,
    borderRadius: 100,
    resizeMode: "cover",
  },
  infor_text: {
    fontSize: "1.2rem",
    color: "white",
    fontWeight: "bold",
    marginLeft: "1rem",
  },
  mess_container: {
    backgroundColor: "white",
    padding: "1rem",
  },
  mess_receive: {
    width: "auto",
    maxWidth: "18rem",
    padding: 10,
    marginBottom: 20,
    backgroundColor: colors.primary_50,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  mess_send: {
    width: "auto",
    maxWidth: "18rem",
    padding: 10,
    marginBottom: 20,
    backgroundColor: colors.primary_100,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  mess_txt: {
    fontSize: "1rem",
    color: text_col.color_800,
  },
  mess_time: {
    fontSize: "0.75rem",
    color: text_col.color_500,
    alignSelf: "flex-end",
  },
  chat_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "white",
    borderTopWidth: 0.5,
    borderColor: text_col.color_200,
  },
  chat_input: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 40,
    fontSize: "1rem",
    borderRadius: 100,
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: text_col.color_300,
    marginRight: 15,
  },
  chat_input_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    position: "absolute",
    right: 30,
  },
});
