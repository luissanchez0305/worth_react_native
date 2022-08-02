import { Layout, HeadText, SubHeadText, CardContainer } from "../globalStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GradientBackground } from "../components/GradientBackground";
import { ScrollView, Text, View, SafeAreaView } from "react-native";
import finnhubDB, {endpoints as epFinnhub} from "../api/finnhubDB";
import ChartsFilterButton from "../components/ChartsFilterButton";
// import TradingChart from "../components/TradingChart/index";
import LoginForm from "../components/session/LoginForm";
import ListEvents from "../components/list/ListEvents";
import HeadSection from "../components/HeadSection";
import { useEffect, useState } from "react";


export default function SignalsScreen() {
    const [user, setUser] = useState();

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

    if(user !== undefined){
        return (
            <GradientBackground>
                <Layout>
                    <SafeAreaView>
                        <HeadText>Señales</HeadText>
                    </SafeAreaView>
                </Layout>
            </GradientBackground>
        );
    }else{
        return(
            <GradientBackground>
                <Layout>
                    <SafeAreaView>
                        <Login />
                    </SafeAreaView>
                </Layout>
            </GradientBackground>
        );
    }
}

function Login() {
    return <LoginForm />;
}