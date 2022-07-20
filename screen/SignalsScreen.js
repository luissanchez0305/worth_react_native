import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import { Layout, HeadText, SubHeadText, CardContainer } from "../globalStyle";
// import TradingChart from "../components/TradingChart/index";
import { useEffect, useState } from "react";
import { GradientBackground } from "../components/GradientBackground";
import HeadSection from "../components/HeadSection";
import ChartsFilterButton from "../components/ChartsFilterButton";
import ListEvents from "../components/list/ListEvents";
import finnhubDB, {endpoints as epFinnhub} from "../api/finnhubDB";

export default function SignalsScreen() {
    return (
        <GradientBackground>
            <Layout>
                <SafeAreaView>
                    <HeadText>Señales</HeadText>
                </SafeAreaView>
            </Layout>
        </GradientBackground>
    );
}