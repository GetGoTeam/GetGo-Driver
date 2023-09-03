import { Text, View, Image } from "react-native";
import styles from "./styles";

export default function BookingBtn(props) {
  const { title, icon } = props;

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
