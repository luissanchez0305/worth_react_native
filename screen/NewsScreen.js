import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeadSection from "../components/HeadSection";
import ListNews from "../components/list/ListNews";
import ListMedia from "../components/list/ListMedia";
import { Layout, HeadText, SubHeadText, CardContainer } from "../globalStyle";
import FilterButton from "../components/FilterButton";

export default function NewsScreen() {
  const [filter, setFilter] = useState("video");

  const video = () => {
    setFilter("video");
  };

  const news = () => {
    setFilter("news");
  };

  return (
    <Layout>
      <ScrollView>
        <SafeAreaView>
          <HeadText>Contenido</HeadText>
          <SubHeadText>Lo mas reciente</SubHeadText>
          <CardContainer>
            <FilterButton
              filterVideo={video}
              filterNews={news}
              statusButton={filter}
            />
            {filter === "video" ? (
              <View>
                <HeadSection
                  icon={headSection.video.icon}
                  title={headSection.video.title}
                />
                <ListMedia datas={videos} />
              </View>
            ) : (
              <View>
                <HeadSection
                  icon={headSection.content.icon}
                  title={headSection.content.title}
                />
                <ListNews datas={blogs} />
              </View>
            )}
          </CardContainer>
        </SafeAreaView>
      </ScrollView>
    </Layout>
  );
}

const headSection = {
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
