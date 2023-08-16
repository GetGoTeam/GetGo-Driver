import { store } from "./store";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import HomePage from "./src/pages/HomePage";
import HistoryPage from "./src/pages/HistoryPage";
import NotificationPage from "./src/pages/NotificationPage";
import ProfilePage from "./src/pages/ProfilePage";
import OrderPage2 from "./src/pages/OrderPage2";
import TripDetails from "./src/pages/TripDetails";

export default function App() {
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
          >
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen
              name="NotificationPage"
              component={NotificationPage}
            />
            <Stack.Screen name="HistoryPage" component={HistoryPage} />
            <Stack.Screen name="ProfilePage" component={ProfilePage} />
            <Stack.Screen name="OrderPage2" component={OrderPage2} />
            <Stack.Screen name="TripDetails" component={TripDetails} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
