import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import { Layout, HeadText, SubHeadText, CardContainer } from "../globalStyle";
// import TradingChart from "../components/TradingChart/index";
import { useEffect, useState } from "react";
import { GradientBackground } from "../components/GradientBackground";

export default function ChartsScreen() {
  return (
    <GradientBackground>
      <Layout>
        <ScrollView>
          <SafeAreaView>
            <HeadText>Mercado</HeadText>
            <CardContainer>
              <Text>Listo</Text>
            </CardContainer>
          </SafeAreaView>
        </ScrollView>
      </Layout>
    </GradientBackground>
  );
}
