import { ScrollView, View, Alert, TouchableOpacity, Text, Pressable } from "react-native";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListMedia from "../components/list/ListMedia";
import { Layout, HeadText, SubHeadText, CardContainer } from "../globalStyle";
import YoutubePlayer from "react-native-youtube-iframe";
import ButtonBack from "../components/ButtonBack";
import { useRoute } from "@react-navigation/native";
import { GradientBackground } from "../components/GradientBackground";

export default function DetailVideoScreen() {
  const [playing, setPlaying] = useState(false);
  const route = useRoute();
  const {videoId, videos} = route.params;

  const onStateChange = useCallback((state) => {
    switch(state){
      case "ended":
        setPlaying(false);
        break;
      case "playing":
        setPlaying(true);
        break;
    }

  }, []);

  return (
    <GradientBackground>
      <Layout>
        <SafeAreaView>
          <ButtonBack />
            <View>
              <YoutubePlayer
                height={250}
                play={playing}
                videoId={videoId}
                onChangeState={onStateChange}
              />
            </View>
          <CardContainer>
            <ListMedia videos={videos} />
          </CardContainer>
        </SafeAreaView>
      </Layout>
    </GradientBackground>
  );
}
