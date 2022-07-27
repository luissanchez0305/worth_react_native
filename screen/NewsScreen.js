import { ScrollView, View } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeadSection from "../components/HeadSection";
import ListNews from "../components/list/ListNews";
import ListMedia from "../components/list/ListMedia";
import { Layout, HeadText, SubHeadText, CardContainer } from "../globalStyle";
import VideoContext from "../context/VideoContext";
import { GradientBackground } from "../components/GradientBackground";
import NewsFilterButton from "../components/NewsFilterButton";
import LoginForm from "../components/session/LoginForm";

export default function NewsScreen() {
  const context = useContext(VideoContext)
  const [filter, setFilter] = useState("video");
  const [user, setUser] = useState(false);
  const videos = context.videos

  const video = () => {
    setFilter("video");
  };

  const news = () => {
    setFilter("news");
  };

  return (
    <GradientBackground>
      <Layout>
        <SafeAreaView>
          <HeadText>Contenido</HeadText>
          <SubHeadText>Lo mas reciente</SubHeadText>
          <CardContainer>
            <NewsFilterButton
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
                <ListMedia videos={videos} />
              </View>
            ) : (
              <View>
                {user === false ? (  
                    <Login />
                ) : (   
                  <>
                  <HeadSection
                    icon={headSection.content.icon}
                    title={headSection.content.title} 
                  />
                  <ListNews datas={blogs} />
                  </>
                )}
              </View>
            )}
          </CardContainer>
        </SafeAreaView>
      </Layout>
    </GradientBackground>
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

function Login() {
  return <LoginForm />;
}