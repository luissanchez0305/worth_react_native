import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import { Layout, HeadText, SubHeadText, CardContainer } from "../globalStyle";
// import TradingChart from "../components/TradingChart/index";
import { useEffect, useState } from "react";
import { GradientBackground } from "../components/GradientBackground";
import HeadSection from "../components/HeadSection";
import ChartsFilterButton from "../components/ChartsFilterButton";

export default function ChartsScreen() {

  const [filter, setFilter] = useState("tradingview");
  const tradingview = () => {
    setFilter("tradingview");
  };

  const events = () => {
    setFilter("events");
  };
  return (
    <GradientBackground>
      <Layout>
          <SafeAreaView>
            <HeadText>Mercado</HeadText>
            <CardContainer>
              <ChartsFilterButton
                filterTradingView={tradingview}
                filterEvents={events}
                statusButton={filter}
              />
              {filter === "tradingview" ? (
                <View>
                  <HeadSection
                    icon={headSection.tradingview.icon}
                    title={headSection.tradingview.title}
                  />
                  <Text>TRADING VIEW</Text>
                </View>
              ) : (
                <View>
                  <HeadSection
                    icon={headSection.events.icon}
                    title={headSection.events.title}
                  />
                  <Text>EVENTOS</Text>
                </View>
              )}
          </CardContainer>
          </SafeAreaView>
      </Layout>
    </GradientBackground>
  );
}

const headSection = {
  tradingview: {
    title: "Trading View",
    icon: require("../assets/headIcons/charts.png"),
  },
  events: {
    title: "Eventos",
    icon: require("../assets/headIcons/content.png"), //TODO: put a calendar icon
  },
};