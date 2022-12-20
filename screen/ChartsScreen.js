import { Layout, HeadText, SubHeadText, CardContainer } from "../globalStyle";
import { GradientBackground } from "../components/GradientBackground";
import ChartsFilterButton from "../components/ChartsFilterButton";
import { get } from "react-native/Libraries/Utilities/PixelRatio";
// import TradingChart from "../components/TradingChart/index";
import { Button, ScrollView, Text, View } from "react-native";
import ListEvents from "../components/list/ListEvents";
import HeadSection from "../components/HeadSection";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { getDateFormat, getEvents, getTodayDateString } from "../utils";
import ContainerView from "../components/ContainerView";


export default function ChartsScreen() {
  const [screenFilter, setScreenFilter] = useState("tradingview");
  const [eventFilter, setEventFilter] = useState("today");
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsData, setEventsData] = useState([]);

  const tradingview = () => {
    setScreenFilter("tradingview");
  };

  const events = () => {
    setScreenFilter("events");
  };

  const setEventFilterButton = async (value) => {
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
      const events = await getEvents(_date);
      setEventFilter(value);
      setEventsData(events)
      setEventsLoading(false)
    }
  };
  const getInitEvents = async () => {
    const today = getTodayDateString()
    const events = await getEvents(today)
    setEventsLoading(false)
    setEventsData(events)
  }

  useEffect(() => {
    getInitEvents()
  }, []);
  return (
    <GradientBackground>
      <Layout>
        {/* <SafeAreaView> */}
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
                <Text style={{color: "#8b8c97"}}>Loading...</Text>
              ) : (
                eventsData.length > 0 ? (<ListEvents events={eventsData} /> ): (<Text style={{color: "#8b8c97"}}>No hay eventos para este dia</Text>)
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
