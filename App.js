import { store } from "./store";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "react-native-gesture-handler";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import HomePage from "./src/pages/HomePage";
import HistoryPage from "./src/pages/HistoryPage";
import NotificationPage from "./src/pages/NotificationPage";
import ReceiveTrip from "./src/pages/ReceiveTrip";
import ProfilePage from "./src/pages/ProfilePage";
import ProceedingTripPage from "./src/pages/ProceedingTripPage";
import TripDetails from "./src/pages/TripDetails";
import CompleteTrip from "./src/pages/CompleteTrip";
import ChattingPage from "./src/pages/ChattingPage";
import EditInformation from "./src/pages/EditInformation";
import SignIn from "./src/pages/SignIn";
import SignUp from "./src/pages/SignUp";
import EStyleSheet from "react-native-extended-stylesheet";
import { NavigationContainer } from "@react-navigation/native";

EStyleSheet.build();

export default App = () => {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
            initialRouteName="SignIn"
          >
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen
              name="NotificationPage"
              component={NotificationPage}
            />
            <Stack.Screen name="ReceiveTrip" component={ReceiveTrip} />
            <Stack.Screen name="HistoryPage" component={HistoryPage} />
            <Stack.Screen name="ProfilePage" component={ProfilePage} />
            <Stack.Screen
              name="ProceedingTripPage"
              component={ProceedingTripPage}
            />
            <Stack.Screen name="TripDetails" component={TripDetails} />
            <Stack.Screen name="CompleteTrip" component={CompleteTrip} />
            <Stack.Screen name="ChattingPage" component={ChattingPage} />
            <Stack.Screen name="EditInformation" component={EditInformation} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
};
