import { Layout, CardContainer } from "../globalStyle";
import { GradientBackground } from "../components/GradientBackground";
import ChartsFilterButton from "../components/ChartsFilterButton";
import { Button, Text, View, StyleSheet } from "react-native";
import ListEvents from "../components/list/ListEvents";
import HeadSection from "../components/HeadSection";
import { useEffect, useState } from "react";
import { getDateFormat, getEvents, getTodayDateString } from "../utils";
import ContainerView from "../components/ContainerView";
import styled from "styled-components/native";


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
              <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
                <HeadSection
                  icon={headSection.events.icon}
                  title={headSection.events.title}
                />
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <SignalButton
                    onPress={() => setEventFilterButton("yesterday")}
                  >
                    <Text style={{ color: "white", textAlign: "center", fontSize: 14 }}>
                      AYER
                    </Text>
                  </SignalButton>
                  <SignalButton
                    onPress={() => setEventFilterButton("today")}
                  >
                    <Text style={{ color: "white", textAlign: "center", fontSize: 14 }}>
                      HOY
                    </Text>
                  </SignalButton>
                  <SignalButton
                    onPress={() => setEventFilterButton("tomorrow")}
                  >
                    <Text style={{ color: "white", textAlign: "center", fontSize: 14 }}>
                      MAÑANA
                    </Text>
                  </SignalButton>
                  {/* <Button
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
                  /> */}
                </View>
              </View>
              {eventsLoading ? (
                <Text style={{ color: "#8b8c97" }}>Cargando...</Text>
              ) : (
                eventsData.length > 0 ? (<ListEvents events={eventsData} />) : (<Text style={{ color: "#8b8c97" }}>No hay eventos para este dia</Text>)
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

const SignalButton = styled.TouchableOpacity`
  background-color: #3f3f3f;
  padding: 7px;
  margin-left: 5px;
  margin-bottom: 10px;
`;
