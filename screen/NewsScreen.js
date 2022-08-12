import { Layout, HeadText, SubHeadText, CardContainer } from "../globalStyle";
import { GradientBackground } from "../components/GradientBackground";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NewsFilterButton from "../components/NewsFilterButton";
import LoginForm from "../components/session/LoginForm";
import ListMedia from "../components/list/ListMedia";
import HeadSection from "../components/HeadSection";
import VideoContext from "../context/VideoContext";
import ListNews from "../components/list/ListNews";
import { ScrollView, View } from "react-native";
import jwt_decode from "jwt-decode";

export default function NewsScreen() {
  const [filter, setFilter] = useState("video");
  const context = useContext(VideoContext);
  const [user, setUser] = useState();
  const videos = context.videos;

  const video = () => {
    setFilter("video");
  };

  const news = () => {
    setFilter("news");
  };

  const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@token');
        setUser(value)
    } catch(error) {
        console.log(error)
    }
  }

  useEffect(()=>{
      getToken()
  }, [])

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
                {user === undefined ? (  
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
    title: "Cursos",
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