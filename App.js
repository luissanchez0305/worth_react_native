import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from 'react-native-root-siblings';
import DetailVideoScreen from "./screen/DetailVideoScreen";
import NotificationScreen from "./screen/Notification";
import RegistreScreen from "./screen/RegistreScreen";
import ProfileScreen from "./screen/ProfileScreen";
import SignalLogsScreen from "./screen/SignalLogsScreen";
import { Linking, StatusBar } from "react-native";
import Tabs from "./navigation/Tabs";
import { ValidationForm } from "./screen/ValidationForm";
import SignalsScreen from "./screen/SignalsScreen";
import { LogBox } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from "react";
import worthDB, { endpoints as epWorth } from "./api/localDB";

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
  const notificationListener = useRef();
  const responseListener = useRef();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Device.deviceId', Device.deviceId)
      await worthDB.post(epWorth.sendDeviceData,
        {
          deviceId: 'Device.deviceId',
          deviceName: Device.deviceName,
        });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
