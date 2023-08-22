import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
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
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

export default () => {
  const navigation = useNavigation();
  const [inforImage, setInforImage] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [checked, setChecked] = useState("Nam");
  const [selectedValue, setSelectedValue] = useState(1);

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
    }
    setShowDatePicker(false);
  };

  let options = {
    saveToPhotos: true,
    mediaType: "photo",
  };

  const formattedDate = () => {
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  const hanldeGetImage = async () => {
    const result = await launchImageLibrary(options);
    setInforImage(result.assets[0].uri);
    console.log(result);
  };
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
              source={require("../../../assets/imgs/header.png")}
              style={styles.heading_img}
            />
          </View>
        </View>
      </View>
      <ScrollView style={styles.content_container}>
        <View style={styles.image_container}>
          <View style={styles.image_edit}>
            <Image
              style={styles.image_infor}
              source={require("../../../assets/portrait.png")}
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
          <TextInput style={styles.name_input} placeholder="Nhập tên của bạn" />
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
                value={formattedDate()}
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
              onValueChange={value => setChecked(value)}
              value={checked}
            >
              <View style={styles.radioButtonContainer}>
                <RadioButton.Item label="Nam" value="Nam" />
                <RadioButton.Item label="Nữ" value="Nữ" />
              </View>
            </RadioButton.Group>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>Số Điện Thoại</Text>
          <TextInput
            style={styles.name_input}
            placeholder="Nhập số điện thoại của bạn"
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>Loại Xe</Text>
          <Picker
            selectedValue={selectedValue}
            onValueChange={itemValue => setSelectedValue(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Xe máy" value={1} />
            <Picker.Item label="Xe hơi 4 chỗ" value={4} />
            <Picker.Item label="Xe hơi 7 chỗ" value={7} />
          </Picker>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </ScrollView>
      <View style={styles.btn_container}>
        <TouchableOpacity style={styles.btn_block_cancel}>
          <Text style={styles.btn_title_cancel}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn_block_save}>
          <Text style={styles.btn_title_save}>Lưu thay đổi</Text>
        </TouchableOpacity>
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
