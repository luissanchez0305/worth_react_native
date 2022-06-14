import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeadSection from "../components/HeadSection";
import ListMedia from "../components/list/ListMedia";
import ListNews from "../components/list/ListNews";
import { Layout, HeadText, SubHeadText, CardContainer } from "../globalStyle";

export default function HomeScreen() {
  return (
    <Layout>
      <ScrollView>
        <SafeAreaView>
          <HeadText>Worth</HeadText>
          <SubHeadText>Bienvenido</SubHeadText>
          <CardContainer>
            <HeadSection
              icon={headSection.charts.icon}
              title={headSection.charts.title}
            />
            <View>
              <Text style={{ color: "#e3e3e3" }}>Contenido Aquí</Text>
            </View>
          </CardContainer>
          <CardContainer>
            <HeadSection
              icon={headSection.video.icon}
              title={headSection.video.title}
            />
            <ListMedia datas={videos} />
          </CardContainer>
          <CardContainer>
            <HeadSection
              icon={headSection.content.icon}
              title={headSection.content.title}
            />
            <ListNews datas={blogs} />
          </CardContainer>
        </SafeAreaView>
      </ScrollView>
    </Layout>
  );
}

const headSection = {
  charts: {
    title: "Cotizar",
    icon: require("../assets/headIcons/charts.png"),
  },
  video: {
    title: "Videos",
    icon: require("../assets/headIcons/youtube.png"),
  },
  content: {
    title: "Contenido",
    icon: require("../assets/headIcons/content.png"),
  },
};

// Datos de relleno

const videos = [
  {
    image: require("../assets/image-video.png"),
    title: "Titulo del video API desde youtube",
    tag: "#tag #tag",
    channel: "Canal Youtube",
  },
  {
    image: require("../assets/image-video.png"),
    title: "Titulo del video API desde youtube",
    tag: "#tag #tag",
    channel: "Canal Youtube",
  },
  {
    image: require("../assets/image-video.png"),
    title: "Titulo del video API desde youtube",
    tag: "#tag #tag",
    channel: "Canal Youtube",
  },
  {
    image: require("../assets/image-video.png"),
    title: "Titulo del video API desde youtube",
    tag: "#tag #tag",
    channel: "Canal Youtube",
  },
  {
    image: require("../assets/image-video.png"),
    title: "Titulo del video API desde youtube",
    tag: "#tag #tag",
    channel: "Canal Youtube",
  },
];

const blogs = [
  {
    image: require("../assets/image-noticia.png"),
    title: "Titulo del video API desde youtube",
    topic: "Cripto",
    channel: "Enlace externo",
  },
  {
    image: require("../assets/image-noticia.png"),
    title: "Titulo del video API desde youtube",
    topic: "Economia",
    channel: "Enlace externo",
  },
  {
    image: require("../assets/image-noticia.png"),
    title: "Titulo del video API desde youtube",
    topic: "Bolsa",
    channel: "Enlace externo",
  },
  {
    image: require("../assets/image-noticia.png"),
    title: "Titulo del video API desde youtube",
    topic: "Cripto",
    channel: "Enlace externo",
  },
  {
    image: require("../assets/image-noticia.png"),
    title: "Titulo del video API desde youtube",
    topic: "Cripto",
    channel: "Enlace externo",
  },
];
