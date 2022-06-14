import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import Tabs from "./navigation/Tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailVideoScreen from "./screen/DetailVideoScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="DetailVideo" component={DetailVideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
