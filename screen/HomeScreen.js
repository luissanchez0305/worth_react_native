
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeadSection from "../components/HeadSection";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import { cleanPrice, cleanVideo, getDateFormat, getEvents, getTodayDateString } from "../utils";
import VideoContext from "../context/VideoContext";
import { GradientBackground } from "../components/GradientBackground";
import { getDevicePushTokenAsync } from "expo-notifications";
import ListEvents from "../components/list/ListEvents";
import UserContext from "../context/UserContext";
import { getStorageItem } from "../utils";

export default function HomeScreen() {
  const navigation = useNavigation();
  const videoContext = useContext(VideoContext)
  const userContext = useContext(UserContext)
  const [loadingMarquee, setLoadingMarquee] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [pricesPromiseStatus, setPricesPromiseStatus] = useState('Obteniendo simbolos...');
  const [eventsPromiseStatus, setEventsPromiseStatus] = useState('Obteniendo eventos...');
  const [data, setData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  
  const courses = [];
  const videos = []
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
        setPricesPromiseStatus('Cargando valores...');
        const _data = res.data;

        _data.forEach(element => {
          const url = element.type === 'crypto' ? 
            `${epPolygon.openCloseCrypto}/${element.from}/${element.to}/${today}` :
            `${epPolygon.ticker}/C:${element.from}${element.to}/range/1/day/${yesterday}/${yesterday}`;
          
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
      })
      .finally(() => {
        setPricesPromiseStatus(`finish loading`)
      });
  }

  const getVideos = async () => {
    const res = await youtubeDB
      .get(epYoutube.search)
      .catch((ex) => {
        console.log(`Error al cargar videos: ${ex}`)
        return;
      })
    
    let _videos = res.data['items'];
    _videos.map((video) => {
      const cleanedVideo = cleanVideo(video);
      
      if(cleanedVideo.title.indexOf('Curso de Trading GRATIS') > -1) {
        courses.push(cleanedVideo);
      }
      else {
        videos.push(cleanedVideo)
      }
    })

    if(!videoContext.videos.length){
      videoContext.videos = videos;
    }

    if(!videoContext.courses.length){
      videoContext.courses = courses;
    }
  }

  const getStorageData = async () => {
    const dataString = await getStorageItem("@worthapp");
    if(dataString){
      const data = JSON.parse(dataString)
      userContext.user = data
    }
  }

  const init = async () => {
    getStorageData();
    getPrices();
    getVideos();

    const today = getTodayDateString()
    try{
      const events = await getEvents(today);
      if(events.length > 0){
        setEventsData(events);
        setLoadingEvents(false);
      } else {
        setEventsPromiseStatus('No hay eventos para hoy')
      }
    }
    catch(e){
      console.log(e)
    }
  }
  
  useEffect(() => {
    init();
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
              icon={headSection.content.icon}
              title={headSection.content.title}
            />
              {!loadingEvents ? (<ListEvents events={eventsData} getEvents={getEvents} />) : (<Text style={{color: "#8b8c97"}}>{eventsPromiseStatus}</Text>)}
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
    title: "Eventos",
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
