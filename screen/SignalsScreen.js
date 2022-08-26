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
import worthDB, { endpoints as worthEndpoints } from "../api/localDB";
import ListSignals from "../components/list/ListSignals";

export default function SignalsScreen() {
    const [user, setUser] = useState();
    const [signals, setSignals] = useState([]);

    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@token');
            setUser(value)
        } catch(error) {
            console.log(error)
        }
    }

    const getSignals = async () => {
        const res = await worthDB.get(worthEndpoints.getAllSignals);
        setSignals(res.data);
    }

    useEffect(()=>{
        getToken();
        getSignals();
    }, [])

    if(user){
        return (
            <GradientBackground
              colors={['#1f1f1f', '#ababab', 'white']}
              start={{x: 0.4, y: 0.6}}
              end={{x: 0.5, y: 0.9}}
            >
                <Layout>
                    <SafeAreaView>
                        <HeadText>Señales</HeadText>
                        <View>
                            {signals.length ? 
                                <ListSignals signals={signals} />
                                : <Text>Loading...</Text>
                            }
                        </View>
                    </SafeAreaView>
                </Layout>
            </GradientBackground>
        );
    }else{
        return(
            <GradientBackground>
                <Layout>
                    <SafeAreaView>
                        <LoginForm getToken={getToken}/>
                    </SafeAreaView>
                </Layout>
            </GradientBackground>
        );
    }
}

function Login() {
    return <LoginForm />;
}