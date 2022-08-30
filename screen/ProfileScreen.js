import React, { useState, useCallback, useRef, useEffect, useContext } from "react";
import { GradientBackground } from "../components/GradientBackground";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "../components/session/LoginForm";
import { Layout, CardContainer } from "../globalStyle";
import ButtonBack from "../components/ButtonBack";
import { Button, ScrollView, Text } from "react-native";

export default function ProfileScreen() {
  const [userToken, setUserToken] = useState();

  const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@token');
        setUserToken(value)
    } catch(error) {
        console.log(error)
    }
  }

  const signout = async () => {
    await AsyncStorage.removeItem('@token');
    setUser(null);
  }

  useEffect(()=>{
      getToken();
  },[])

  return (
    <GradientBackground>
      <Layout>
        <ScrollView>
          <SafeAreaView>
            <ButtonBack />
            {userToken ? <Profile signout={signout} /> : <LoginForm getToken={getToken}/>}
          </SafeAreaView>
        </ScrollView>
      </Layout>
    </GradientBackground>
  );
}

function Profile(props) {
  return (<><Text style={{ color: "white" }}>Mi perfil</Text><Button title="Signout" onPress={() => props.signout()} /></>);
}
