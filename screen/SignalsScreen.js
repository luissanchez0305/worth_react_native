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
import { getStorageItem } from "../utils";

export default function SignalsScreen() {
    const [userToken, setUserToken] = useState();
    const [signals, setSignals] = useState([]);

    const token = async () =>{
        data = await getStorageItem('@token');
        setUserToken(data);
    } 

    const getSignals = async () => {
        const res = await worthDB.get(worthEndpoints.getAllSignals);
        setSignals(res.data);
    }

    useEffect(()=>{
        token();
        getSignals();
    }, [userToken])

    if(userToken !== null){
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
                        <LoginForm getToken={token}/>
                    </SafeAreaView>
                </Layout>
            </GradientBackground>
        );
    }
}

function Login() {
    return <LoginForm />;
}