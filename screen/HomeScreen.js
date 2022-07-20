
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
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

import Marquee from "../components/MarqueeHSNZ/Marquee";
import polygonDB, { endpoints as epPolygon } from "../api/polygonDB";
import worthDB, { endpoints as epWorth } from "../api/localDB";
import youtubeDB, {endpoints as epYoutube} from "../api/youtubeDB";
import { cleanPrice, cleanVideo, getDateFormat } from "../utils";
import VideoContext from "../context/VideoContext";
import { GradientBackground } from "../components/GradientBackground";

export default function HomeScreen() {
  const navigation = useNavigation();
  const context = useContext(VideoContext)
  const [loadingMarquee, setLoadingMarquee] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [pricesPromiseStatus, setPricesPromiseStatus] = useState('Getting symbols...');
  const [videosPromiseStatus, setVideosPromiseStatus] = useState('Getting symbols...');
  const [data, setData] = useState([]);
  const [videos, setVideos] = useState([]);

  const promises = [];
  const getPrices = async () => {
    
    var today = new Date();
    var yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    today = getDateFormat(today);
    yesterday = getDateFormat(yesterday);

    worthDB
      .get(epWorth.getAllActiveSymbols)
      .then(async (res) => {
        setPricesPromiseStatus('Loading values...');
        const _data = res.data;
        _data.forEach(element => {
          const url = element.type === 'crypto' ? 
            `${epPolygon.openCloseCrypto}/${element.from}/${element.to}/${today}` :
            `${epPolygon.ticker}/${element.type}:${element.from}${element.to}/prev`;
          promises.push(
            polygonDB
              .get(url)
              .catch((ex) => {
                setPricesPromiseStatus(`Error al cargar datos: ${ex}`)
              }))  
        });
  
        const responses = await Promise.all(promises);
  
        const data = [];
        responses.forEach((res) => {
          data.push(cleanPrice(res.data));
        })
        
        setData(data)
        setLoadingMarquee(false);
      })
      .catch((ex) => {
        setPricesPromiseStatus(`Error al cargar symbolos: ${ex}`)
      });
  }

  const getVideos = async () => {
    const res = await youtubeDB
      .get(epYoutube.search)
      .catch((ex) => {
        setVideosPromiseStatus(`Error al cargar videos: ${ex}`)
        return;
      })
    
    let _videos = res.data['items'];
    _videos.map((video) => {
      videos.push(cleanVideo(video))
    })
    if(!context.videos.length){
      context.videos = videos;
    }
    setLoadingVideos(false);
  }
  
  useEffect(() => {
    getPrices();
    getVideos();
  }, [])
  return (
    <GradientBackground>
      <Layout>
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
            <View style={styles.marqueeContainer}>
              {!loadingMarquee ? (<Marquee key={1} data={data}/>) : (<Text style={{color: "#8b8c97"}}>{pricesPromiseStatus}</Text>)}            
            </View>
          </CardContainer>
          <CardContainer>
            <HeadSection
              icon={headSection.video.icon}
              title={headSection.video.title}
            />
              {!loadingVideos ? (<ListMedia videos={videos} />) : (<Text style={{color: "#8b8c97"}}>{videosPromiseStatus}</Text>)}
          </CardContainer>
        </SafeAreaView>
      </Layout>
    </GradientBackground>
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

const styles = StyleSheet.create({
  marqueeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  }
});
