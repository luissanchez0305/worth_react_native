import { ScrollView, View, Alert } from "react-native";
import React, { useState, useCallback, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, CardContainer } from "../globalStyle";
import ButtonBack from "../components/ButtonBack";
import ListNotification from "../components/list/ListNotification";
import HeadSection from "../components/HeadSection";
import { GradientBackground } from "../components/GradientBackground";

export default function NotificationScreen() {
  return (
    <GradientBackground>
      <Layout>
        <ScrollView>
          <SafeAreaView>
            <ButtonBack />
            <CardContainer style={{ height: "100%" }}>
              <HeadSection
                icon={headSection.head.icon}
                title={headSection.head.title}
              />
              <ListNotification datas={notifications} />
            </CardContainer>
          </SafeAreaView>
        </ScrollView>
      </Layout>
    </GradientBackground>
  );
}

const headSection = {
  head: {
    title: "Notificación",
    icon: require("../assets/campana-gold.png"),
  },
};

// Datos de relleno

const notifications = [
  {
    title: "Titulo de la notificaciôn",
    date: "25 de agosto 2022 08:08",
  },
  {
    title: "Titulo de la notificaciôn",
    date: "25 de agosto 2022 08:08",
  },
  {
    title: "Titulo de la notificaciôn",
    date: "25 de agosto 2022 08:08",
  },
  {
    title: "Titulo de la notificaciôn",
    date: "25 de agosto 2022 08:08",
  },
  {
    title: "Titulo de la notificaciôn",
    date: "25 de agosto 2022 08:08",
  },
];
