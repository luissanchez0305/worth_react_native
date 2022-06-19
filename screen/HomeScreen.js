import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeadSection from "../components/HeadSection";
import ListMedia from "../components/list/ListMedia";
import ListNews from "../components/list/ListNews";
import { useNavigation } from "@react-navigation/native";
import {
  Layout,
  HeadText,
  SubHeadText,
  CardContainer,
  HeadImage,
  NavIcon,
} from "../globalStyle";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Layout>
      <ScrollView>
        <SafeAreaView>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <HeadImage source={require("../assets/worth-home.png")} />
              <SubHeadText>Bienvenido</SubHeadText>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignContent: "flex-end",
                alignSelf: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate("Notification");
                }}
              >
                <NavIcon source={require("../assets/campana.png")} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate("Profile", {
                    itemId: 86,
                  });
                }}
              >
                <NavIcon source={require("../assets/perfil.png")} />
              </TouchableOpacity>
            </View>
          </View>
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
