import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { View } from "react-native";

const GoogleApiSearch = () => {
  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="Tìm kiếm"
        styles={{
          container: {
            // flex: 0,
            // width: "100%",
          },
          textInput: {
            fontSize: 18,
          },
        }}
        // onPress={(data, details = null) => {
        //   console.log(data, details);
        // }}
        // fetchDetails={true}
        // enablePoweredByContainer={false}
        // minLength={2}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
      />
    </View>
  );
};

export default GoogleApiSearch;
