import { Layout, HeadText, SubHeadText, CardContainer } from "../globalStyle";
import { GradientBackground } from "../components/GradientBackground";
import finnhubDB, { endpoints as epFinnhub } from "../api/finnhubDB";
import ChartsFilterButton from "../components/ChartsFilterButton";
import { get } from "react-native/Libraries/Utilities/PixelRatio";
// import TradingChart from "../components/TradingChart/index";
import { Button, ScrollView, Text, View } from "react-native";
import ListEvents from "../components/list/ListEvents";
import HeadSection from "../components/HeadSection";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { getDateFormat } from "../utils";
import ContainerView from "../components/ContainerView";

export default function ChartsScreen() {
  const [screenFilter, setScreenFilter] = useState("tradingview");
  const [eventFilter, setEventFilter] = useState("today");
  const [eventsData, setEventsData] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  const tradingview = () => {
    setScreenFilter("tradingview");
  };

  const events = () => {
    setScreenFilter("events");
  };

  const setEventFilterButton = (value) => {
    if (value !== eventFilter) {
      setEventsLoading(true);
      const date = new Date();
      let _date = "";
      switch (value) {
        case "yesterday":
          date.setDate(date.getDate() - 1);
          break;
        case "tomorrow":
          date.setDate(date.getDate() + 1);
          break;
      }
      _date = getDateFormat(date);
      getEvents(_date);
      setEventFilter(value);
    }
  };

  const getEvents = async (date) => {
    const finnhubRes = await finnhubDB
      .get(epFinnhub.events, {
        params: {
          from: date,
          to: date,
        },
      })
      .catch((ex) => {
        console.log(`Error al eventos: ${ex}`);
      });
    setEventsData(finnhubRes.data["economicCalendar"]);
    setEventsLoading(false);
  };

  useEffect(() => {
    const today = new Date();
    const _today = getDateFormat(today);
    getEvents(_today);
  }, []);
  return (
    <GradientBackground>
      <Layout>
        {/* <SafeAreaView> */}
        <View style={{ marginTop: 32 }} />
        <HeadText>Mercado</HeadText>
        <SubHeadText>Lo mas reciente</SubHeadText>
        <CardContainer>
          <ChartsFilterButton
            filterTradingView={tradingview}
            filterEvents={events}
            statusButton={screenFilter}
          />
        </CardContainer>
        {screenFilter === "tradingview" ? (
          <ContainerView />
        ) : (
          <CardContainer>
            <View>
              <View style={{ flexDirection: "row" }}>
                <HeadSection
                  icon={headSection.events.icon}
                  title={headSection.events.title}
                />
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <Button
                    title="Ayer"
                    onPress={() => setEventFilterButton("yesterday")}
                    style={{
                      backgroundColor:
                        eventFilter === "yesterday" ? "#3f3f3f" : "#000",
                    }}
                  />
                  <Button
                    title="Hoy"
                    onPress={() => setEventFilterButton("today")}
                    style={{
                      backgroundColor:
                        eventFilter === "today" ? "#3f3f3f" : "#000",
                    }}
                  />
                  <Button
                    title="Mañana"
                    onPress={() => setEventFilterButton("tomorrow")}
                    style={{
                      backgroundColor:
                        eventFilter === "tomorrow" ? "#3f3f3f" : "#000",
                    }}
                  />
                </View>
              </View>
              {eventsLoading ? (
                <Text>Loading...</Text>
              ) : (
                <ListEvents events={eventsData} />
              )}
            </View>
          </CardContainer>
        )}
        {/* </SafeAreaView> */}
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
const EventFilter = styled.Button`
  align-items: center;
  padding: 8px;
  border-radius: 8px;
`;
