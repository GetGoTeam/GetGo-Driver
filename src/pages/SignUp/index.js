import {
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  Alert,
  Text,
} from "react-native";
import styles from "./styles";
import { TextInput } from "@react-native-material/core";
import { colors } from "~utils/colors.js";
import { LinearGradient } from "expo-linear-gradient";
import CustomBtn from "~components/Button/CustomBtn";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import Loading from "~components/Loading";
import request from "~/src/utils/request";

const SignUp = () => {
  const navigation = useNavigation();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getOtp, setGetOtp] = useState(false);

  const [username, setUsername] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [repassword, setRepassword] = useState();
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState();
  const [tokenOtp, setTokenOtp] = useState();

  const removeExtraSpaces = inputString => {
    return inputString.replace(/\s+/g, " ").trim();
  };

  const PhoneNumberValid = number => {
    return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(number);
  };

  const isValidEmail = email => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const handleSendOtp = async () => {
    if (!PhoneNumberValid(phone)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ.");
      return;
    }

    setLoading(true);

    await request
      .post("create-otp", { phone: phone })
      .then(response => {
        // console.log(response.data);
        setTokenOtp(response.data.OTP_token);
        setGetOtp(true);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleConfirm = async () => {
    if (!isValidEmail(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ!");
      return;
    } else if (!username) {
      Alert.alert("Lỗi", "Tên đăng nhập không hợp lệ!");
      return;
    } else if (!PhoneNumberValid(phone)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ!");
      return;
    } else if (password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có độ dài từ 6 ký tự trở lên!");
      return;
    } else if (password !== repassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không trùng khớp!");
      return;
    } else if (!otp) {
      Alert.alert("Lỗi", "Bạn chưa nhập mã OTP!");
      return;
    }

    setLoading(true);
    const objSignup = {
      username: removeExtraSpaces(username),
      password: password,
      phone: phone,
      email: email,
      otp: Number(otp),
      OTP_token: tokenOtp,
    };
    console.log(objSignup);
    await request
      .post("signup", objSignup)
      .then(res => {
        console.log(res.data);
        navigation.reset({
          index: 0,
          routes: [{ name: "SignIn" }],
        });
        Alert.alert(
          "Thành công",
          "Tài khoản của bạn hợp lệ. Bây giờ hãy bắt đầu đăng nhập!"
        );
      })
      .catch(error => {
        console.log(error);
        Alert.alert("Lỗi", "Mã OTP không đúng.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary_100, "transparent"]}
        style={styles.background}
      />
      {!isKeyboardVisible && (
        <Image style={styles.logo} source={require("~/assets/logo.png")} />
      )}
      <View style={styles.content}>
        {getOtp && (
          <>
            <TextInput
              label="Số điện thoại"
              variant="standard"
              style={styles.textInput}
              value={phone}
              editable={false}
            />
            <TextInput
              label="Email"
              variant="standard"
              style={styles.textInput}
              color={colors.primary_300}
              onChangeText={setEmail}
              value={email}
            />
            <TextInput
              label="Họ tên"
              variant="standard"
              style={styles.textInput}
              color={colors.primary_300}
              onChangeText={setUsername}
              value={username}
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
            <TextInput
              secureTextEntry
              label="Xác nhận mật khẩu"
              variant="standard"
              style={styles.textInput}
              color={colors.primary_300}
              onChangeText={setRepassword}
              value={repassword}
            />
            <TextInput
              label="Nhập OTP"
              variant="standard"
              style={styles.textInput}
              color={colors.primary_300}
              onChangeText={setOtp}
              value={otp}
            />
          </>
        )}
        {!getOtp && (
          <TextInput
            label="Số điện thoại"
            variant="standard"
            style={styles.textInput}
            color={colors.primary_300}
            onChangeText={setPhone}
            value={phone}
          />
        )}
        {getOtp ? (
          <TouchableOpacity style={styles.confirm} onPress={handleConfirm}>
            <CustomBtn title="Đăng ký" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.confirm} onPress={handleSendOtp}>
            <CustomBtn title="Gửi OTP" />
          </TouchableOpacity>
        )}
        <View style={styles.signUpContainer}>
          <Text style={styles.text}> Bạn đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.signUpBtn}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Loading loading={loading} />
    </View>
  );
};

export default SignUp;
