import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from "react-native";
// import NavBar from "../../components/NavBar";
import { colors, text_col } from "../../utils/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faCalendarDays,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { selectInforDriver, setInforDriver } from "~/slices/navSlice";
import request from "~/src/utils/request";

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [inforImage, setInforImage] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [edited, setEdited] = useState(false);

  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState();
  const [typeVerhicle, setTypeVerhicle] = useState(null);
  const [address, setAddress] = useState("");
  const [numberVerhical, setNumberVerhical] = useState("");

  const inforDriver = useSelector(selectInforDriver);

  let options = {
    saveToPhotos: true,
    mediaType: "photo",
  };

  const formattedDate = dateOfBirth => {
    const date = dateOfBirth ? dateOfBirth : new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setDob(date);
    }
    setShowDatePicker(false);
  };

  const hanldeGetImage = async () => {
    const result = await launchImageLibrary(options);
    setInforImage(result.assets[0].uri);
    console.log(result);
  };

  const handleUpdateInfor = async () => {
    let cnt = 0;
    if (!username || !typeVerhicle || !numberVerhical) {
      Alert.alert("Thiếu họ tên, thông tin xe!");
      return;
    }
    const data = {
      username,
      gender,
      address,
      dob,
      password: "111111",
    };

    const inforVer = {
      licensePlate: numberVerhical,
      capacity: typeVerhicle,
    };

    console.log(data);
    if (
      (username === inforDriver.username &&
        gender === inforDriver.gender &&
        address === inforDriver.address &&
        dob === inforDriver.dob &&
        inforVer.licensePlate === inforDriver.licensePlate) ||
      inforVer.capacity === inforDriver.capacity
    ) {
      Alert.alert("Thông tin của bạn không thay đổi.");
      setEdited(false);
      return;
    } else
      await request
        .patch("update", data, {
          headers: { Authorization: "Bearer " + inforDriver.token },
        })
        .then(res => {
          console.log(res.data);
          dispatch(
            setInforDriver({
              ...res.data,
              token: inforDriver.token,
              capacity: inforDriver.capacity,
              licensePlate: inforDriver.licensePlate,
            })
          );
          cnt++;
        })
        .catch(err => {
          console.log(err);
        });

    if (
      inforVer.licensePlate !== inforDriver.licensePlate ||
      inforVer.capacity !== inforDriver.capacity
    ) {
      await request
        .post("register-vehicle", inforVer, {
          headers: { Authorization: "Bearer " + inforDriver.token },
        })
        .then(res => {
          console.log(res.data);
          dispatch(
            setInforDriver({
              ...inforDriver,
              capacity: inforVer.capacity,
              licensePlate: inforVer.licensePlate,
            })
          );
          cnt++;
        })
        .catch(err => {
          console.log(err);
        });
    }
    setEdited(false);
    Alert.alert("Cập nhật thông tinh thành công!");
  };

  useEffect(() => {
    console.log(inforDriver);
    setDob(new Date(inforDriver.dob));
    setGender(inforDriver.gender);
    setUsername(inforDriver.username);
    setAddress(inforDriver.address);
    setNumberVerhical(inforDriver.licensePlate);
    setTypeVerhicle(inforDriver.capacity);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfilePage")}
          style={styles.icon_back}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={28} />
        </TouchableOpacity>
        <View style={styles.heading_title}>
          <View>
            <Text style={styles.heading_text1}>Thông tin cá nhân</Text>
            <Text>Xem và chỉnh sửa thông tin của bạn</Text>
          </View>
          <View>
            <Image
              source={require("~assets/header.png")}
              style={styles.heading_img}
            />
          </View>
        </View>
      </View>
      <ScrollView style={styles.content_container}>
        {edited ? (
          <>
            <View style={styles.image_container}>
              <View style={styles.image_edit}>
                <Image
                  style={styles.image_infor}
                  source={require("~assets/portrait.png")}
                />
                <TouchableOpacity
                  style={styles.image_icon}
                  onPress={hanldeGetImage}
                >
                  <FontAwesomeIcon
                    icon={faCamera}
                    color={colors.primary_300}
                    size={14}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text>Họ và tên</Text>
              <TextInput
                value={username}
                onChangeText={text => setUsername(text)}
                style={styles.name_input}
                placeholder="Nhập tên của bạn"
              />
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text>Ngày Sinh</Text>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={styles.date_block}
                >
                  <TextInput
                    style={styles.date_input}
                    placeholder="02/10/2002"
                    value={formattedDate(dob.getDate() ? dob : new Date())}
                    editable={false}
                  />
                  <View style={styles.date_icon}>
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      color="white"
                      size={24}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <Text>Giới Tính</Text>
                <RadioButton.Group
                  onValueChange={value => setGender(value)}
                  value={gender}
                >
                  <View style={styles.radioButtonContainer}>
                    <RadioButton.Item label="Nam" value="Male" />
                    <RadioButton.Item label="Nữ" value="Female" />
                  </View>
                </RadioButton.Group>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>Địa chỉ</Text>
              <TextInput
                value={address}
                onChangeText={text => setAddress(text)}
                style={styles.name_input}
                placeholder="Nhập địa chỉ của bạn"
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>Biển số xe</Text>
              <TextInput
                value={numberVerhical}
                onChangeText={text => setNumberVerhical(text)}
                style={styles.name_input}
                placeholder="Nhập biển số xe của bạn"
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>Loại Xe</Text>
              <Picker
                selectedValue={typeVerhicle}
                onValueChange={itemValue => setTypeVerhicle(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Chưa có" value={null} />
                <Picker.Item label="Xe máy" value={1} />
                <Picker.Item label="Xe hơi 4 chỗ" value={4} />
                <Picker.Item label="Xe hơi 7 chỗ" value={7} />
              </Picker>
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={dob.getDate() ? dob : new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </>
        ) : (
          <>
            <View style={styles.image_container}>
              <View style={styles.image_edit}>
                <Image
                  style={styles.image_infor}
                  source={require("../../../assets/portrait.png")}
                />
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text>Số Điện Thoại</Text>
              <TextInput
                value={inforDriver.phone}
                style={[styles.name_input, { color: text_col.color_700 }]}
                placeholder="Nhập số điện thoại của bạn"
                editable={false}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>Email</Text>
              <TextInput
                value={inforDriver.email}
                style={[styles.name_input, { color: text_col.color_700 }]}
                placeholder="Nhập email của bạn"
                editable={false}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>Họ và tên</Text>
              <TextInput
                value={inforDriver.username}
                style={[styles.name_input, { color: text_col.color_700 }]}
                placeholder="Nhập tên của bạn"
                editable={false}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text>Ngày Sinh</Text>
                <View style={styles.date_block}>
                  <TextInput
                    style={styles.date_input}
                    placeholder="02/10/2002"
                    value={formattedDate(
                      inforDriver.dob ? new Date(inforDriver.dob) : new Date()
                    )}
                    editable={false}
                  />
                  <View style={styles.date_icon}>
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      color="white"
                      size={24}
                    />
                  </View>
                </View>
              </View>
              <View>
                <Text>Giới Tính</Text>
                <RadioButton.Group
                  onValueChange={value => setGender(value)}
                  value={inforDriver.gender}
                >
                  <View style={styles.radioButtonContainer}>
                    <RadioButton.Item label="Nam" value="Male" disabled />
                    <RadioButton.Item label="Nữ" value="Female" disabled />
                  </View>
                </RadioButton.Group>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>Địa chỉ</Text>
              <TextInput
                value={inforDriver.address}
                style={[styles.name_input, { color: text_col.color_700 }]}
                placeholder="Không có"
                editable={false}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>Biển số xe</Text>
              <TextInput
                value={inforDriver.licensePlate}
                style={[styles.name_input, { color: text_col.color_700 }]}
                placeholder="Không có"
                editable={false}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>Loại Xe</Text>
              <Picker
                selectedValue={inforDriver.capacity}
                style={styles.picker}
                enabled={false}
              >
                <Picker.Item label="Chưa có" value={null} />
                <Picker.Item label="Xe máy" value={1} />
                <Picker.Item label="Xe hơi 4 chỗ" value={4} />
                <Picker.Item label="Xe hơi 7 chỗ" value={7} />
              </Picker>
            </View>
          </>
        )}
      </ScrollView>
      <View style={styles.btn_container}>
        {edited ? (
          <>
            <TouchableOpacity
              onPress={() => setEdited(false)}
              style={styles.btn_block_cancel}
            >
              <Text style={styles.btn_title_cancel}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUpdateInfor}
              style={styles.btn_block_save}
            >
              <Text style={styles.btn_title_save}>Lưu thay đổi</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => setEdited(true)}
            style={styles.btn_block_save}
          >
            <Text style={styles.btn_title_save}>Chỉnh sửa</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary_50,
  },
  heading: {
    paddingStart: 15,
    paddingEnd: 15,
    backgroundColor: colors.primary_200,
    height: 190,
  },
  icon_back: {
    marginTop: 20,
  },
  heading_title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 188,
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
  content_container: {
    margin: 20,
  },
  image_container: {
    width: "100%",
    alignItems: "center",
  },
  image_edit: {
    position: "relative",
  },
  image_infor: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginRight: 20,
  },
  image_icon: {
    position: "absolute",
    backgroundColor: "white",
    padding: 6,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.primary_300,
    bottom: 0,
    right: 10,
  },
  name_input: {
    borderColor: colors.primary_300,
    borderWidth: 1,
    paddingTop: 7,
    paddingBottom: 7,
    paddingEnd: 10,
    paddingStart: 10,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "white",
    fontSize: 16,
  },
  date_block: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  date_input: {
    width: 120,
    borderColor: colors.primary_300,
    borderWidth: 1,
    paddingTop: 7,
    paddingBottom: 7,
    paddingEnd: 10,
    paddingStart: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: "white",
    fontSize: 16,
  },
  date_icon: {
    backgroundColor: colors.primary_300,
    height: 44,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  radioButtonContainer: {
    flexDirection: "row",
    marginTop: 3,
  },
  picker: {
    marginTop: 5,
    backgroundColor: "white",
  },
  btn_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 30,
  },
  btn_block_cancel: {
    borderColor: colors.primary_300,
    borderWidth: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 5,
    backgroundColor: "white",
  },
  btn_title_cancel: {
    fontSize: 16,
    color: colors.primary_300,
  },
  btn_block_save: {
    borderColor: colors.primary_300,
    borderWidth: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 5,
    backgroundColor: colors.primary_300,
  },
  btn_title_save: {
    fontSize: 16,
    color: "white",
  },
});
