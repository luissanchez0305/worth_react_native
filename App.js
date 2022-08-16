import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from 'react-native-root-siblings';
import DetailVideoScreen from "./screen/DetailVideoScreen";
import NotificationScreen from "./screen/Notification";
import RegistreScreen from "./screen/RegistreScreen";
import ProfileScreen from "./screen/ProfileScreen";
import { StatusBar } from "react-native";
import Tabs from "./navigation/Tabs";

const Stack = createNativeStackNavigator();

export default function App() {
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
          <Stack.Screen name="Registre" component={RegistreScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
