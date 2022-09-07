import React from "react";
import { Animated, ImageBackground, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const GradientBackground = ({
  children,
  colors = ["#111D2E", "#1D242F", "#102F49"],
  start = { x: 0.1, y: 0.1 },
  end = { x: 0.5, y: 0.8 },
}) => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={colors}
        style={{ ...StyleSheet.absoluteFillObject }}
        start={start}
        end={end}
      />
      <ImageBackground
        source={require("../assets/bgImagenMain/bg-blur.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </ImageBackground>
    </View>
  );
};
