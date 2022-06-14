import { ScrollView, View, Alert, TouchableOpacity, Text } from "react-native";
import React, { useState, useCallback, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListMedia from "../components/list/ListMedia";
import { Layout, HeadText, SubHeadText, CardContainer } from "../globalStyle";
import YoutubePlayer from "react-native-youtube-iframe";
import ButtonBack from "../components/ButtonBack";

export default function DetailVideoScreen() {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  return (
    <Layout>
      <ScrollView>
        <SafeAreaView>
          <ButtonBack />
          <View>
            <YoutubePlayer
              height={250}
              play={playing}
              videoId={"iee2TATGMyI"}
              onChangeState={onStateChange}
            />
          </View>
          <CardContainer>
            <ListMedia datas={videos} />
          </CardContainer>
        </SafeAreaView>
      </ScrollView>
    </Layout>
  );
}

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
