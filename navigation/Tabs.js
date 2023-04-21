import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image, TouchableOpacity } from "react-native";

import HomeScreen from "../screen/HomeScreen";
import ChartsScreen from "../screen/ChartsScreen";
import NewsScreen from "../screen/NewsScreen";
import CalculatorScreen from "../screen/CalculatorScreen";
import SignalsScreen from "../screen/SignalsScreen";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#CDA434",
          tabBarInactiveTintColor: "#96938d",
          tabBarStyle: {
            backgroundColor: "#3D382B",
            paddingTop: 12,
            borderTopWidth: 0,
          },
        }}
      >
        <Tab.Screen
          name="Worth"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/tabsIcons/home.png")}
                resizeMode="contain"
                style={{
                  width: 26,
                  height: 26,
                  marginBottom: 6,
                  tintColor: focused ? "#CDA434" : "#96938d",
                }}
              />
            ),
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Mercado"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/tabsIcons/charts-up.png")}
                resizeMode="contain"
                style={{
                  width: 26,
                  height: 26,
                  marginBottom: 6,
                  tintColor: focused ? "#CDA434" : "#96938d",
                }}
              />
            ),
          }}
          component={ChartsScreen}
        />
        <Tab.Screen
          name="Señales"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/tabsIcons/wifi.png")}
                resizeMode="contain"
                style={{
                  width: 26,
                  height: 26,
                  marginBottom: 6,
                  tintColor: focused ? "#CDA434" : "#96938d",
                }}
              />
            ),
            unmountOnBlur: true,
          }}
          component={SignalsScreen}
        />
        <Tab.Screen
          name="Contenido"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/tabsIcons/contenido.png")}
                resizeMode="contain"
                style={{
                  width: 26,
                  height: 26,
                  marginBottom: 6,
                  tintColor: focused ? "#CDA434" : "#96938d",
                }}
              />
            ),
          }}
          component={NewsScreen}
        />
        <Tab.Screen
          name="Calculadora"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/tabsIcons/calculadora.png")}
                resizeMode="contain"
                style={{
                  width: 26,
                  height: 26,
                  marginBottom: 6,
                  tintColor: focused ? "#CDA434" : "#96938d",
                }}
              />
            ),
          }}
          component={CalculatorScreen}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}
