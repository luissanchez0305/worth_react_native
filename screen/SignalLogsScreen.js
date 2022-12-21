import { ScrollView, View, Alert, TouchableOpacity, Text, Pressable, Button } from "react-native";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, CardContainer, TextStatus, HeadText } from "../globalStyle";
import YoutubePlayer from "react-native-youtube-iframe";
import ButtonBack from "../components/ButtonBack";
import { useRoute } from "@react-navigation/native";
import { GradientBackground } from "../components/GradientBackground";
import worthDB, { endpoints as worthEndpoints } from "../api/localDB";
import ListSignalLogs from "../components/list/ListSignalLogs";

export default function SignalLogsScreen({ route }) {
    const { signalId, symbol, type } = route.params;
    const [logs, setLogs] = useState([])
    const [logsLoading, setLogsLoading] = useState(true)

    const getSignalLogs = async () =>  {
        const res = await worthDB.get(worthEndpoints.getSignalLogs(signalId))
        const logs = res.data;
        setLogs(logs)
        setLogsLoading(false)
    }

    useEffect(()=>{
        getSignalLogs()
    }, [])

    return (
        <GradientBackground>
            <Layout>
                <SafeAreaView>
                    <CardContainer>
                        <View>
                            <ButtonBack />
                            <HeadText>Señal: {symbol} - {type}</HeadText>
                            {logsLoading ? 
                                <TextStatus>Cargando...</TextStatus> : 
                                    logs.length ? <ListSignalLogs logs={logs} /> : 
                                    <TextStatus>No hay logs para esta señal</TextStatus>
                            }
                        </View>
                    </CardContainer>
                </SafeAreaView>
            </Layout>
        </GradientBackground>
    );
  }