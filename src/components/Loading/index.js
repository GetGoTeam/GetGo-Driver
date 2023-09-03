import { View, ActivityIndicator } from "react-native";
import styles from "./styles";
import { colors } from "~utils/colors.js";

const Loading = (props) => {
  const { loading } = props;

  return (
    <View style={[styles.loading, { display: loading ? "flex" : "none" }]}>
      <ActivityIndicator size="large" color={colors.primary_300} animating hidesWhenStopped />
    </View>
  );
};

export default Loading;
