import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  Alert,
} from "react-native";
import styles from "./styles";
import { TextInput } from "@react-native-material/core";
import { colors } from "~utils/colors.js";
import { LinearGradient } from "expo-linear-gradient";
import CustomBtn from "~components/Button/CustomBtn";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setInforDriver } from "~/slices/navSlice";
import request from "~utils/request";
import Loading from "~components/Loading";
import jwt from "jwt-decode"; // import dependency

const SignIn = () => {
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleConfirm = async () => {
    setLoading(true);
    const objLogin = {
      phone: phone,
      password: password,
    };
    await request
      .post("login", objLogin)
      .then(res => {
        const driverInf = jwt(res.data.token); // decode your token here

        dispatch(setInforDriver({ ...driverInf, token: res.data.token }));

        // console.log({ ...driverInf, token: res.data.token });
        navigation.reset({
          index: 0,
          routes: [{ name: "HomePage" }],
        });
        Alert.alert("Thành công", "Đăng nhập thành công!");
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert("Lỗi", "Số điện thoại hoặc mật khẩu không chính xác.");
      })
      .then(function () {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary_100, "transparent"]}
        style={styles.background}
      />
      {!isKeyboardVisible && (
        <Image style={styles.logo} source={require("~assets/logo.png")} />
      )}
      <View style={styles.content}>
        <TextInput
          label="Số điện thoại"
          variant="standard"
          style={styles.textInput}
          color={colors.primary_300}
          onChangeText={setPhone}
          value={phone}
        />
        <TextInput
          secureTextEntry
          label="Mật khẩu"
          variant="standard"
          style={styles.textInput}
          color={colors.primary_300}
          onChangeText={setPassword}
          value={password}
        />
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity>
            <Text style={styles.text}>Quên mật khẩu</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleConfirm}>
          <CustomBtn title="Đăng nhập" />
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.text}>Chưa có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signUpBtn}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Loading loading={loading} />
    </View>
  );
};

export default SignIn;
