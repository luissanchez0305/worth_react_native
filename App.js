import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from 'react-native-root-siblings';
import DetailVideoScreen from "./screen/DetailVideoScreen";
import NotificationScreen from "./screen/Notification";
import RegistreScreen from "./screen/RegistreScreen";
import ProfileScreen from "./screen/ProfileScreen";
import SignalLogsScreen from "./screen/SignalLogsScreen";
import { StatusBar } from "react-native";
import Tabs from "./navigation/Tabs";
import { ValidationForm } from "./screen/ValidationForm";
import SignalsScreen from "./screen/SignalsScreen";
import { LogBox } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  if (__DEV__) {
    const ignoreWarns = [
      "Animated:",
    ];
  
    const warn = console.warn;
    console.warn = (...arg) => {
      for (const warning of ignoreWarns) {
        if (arg[0].startsWith(warning)) {
          return;
        }
      }
      warn(...arg);
    };
  
    LogBox.ignoreLogs(ignoreWarns);
  }
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="DetailVideo" component={DetailVideoScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Register" component={RegistreScreen} />
          <Stack.Screen name="ValidationForm" component={ValidationForm} />
          <Stack.Screen name="SignalLogs" component={SignalLogsScreen} />
          <Stack.Screen name="Signals" component={SignalsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
