import React, { useState, useCallback, useRef, useEffect } from "react";
import { GradientBackground } from "../components/GradientBackground";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "../components/session/LoginForm";
import { Layout, CardContainer } from "../globalStyle";
import ButtonBack from "../components/ButtonBack";
import { ScrollView, Text } from "react-native";

export default function ProfileScreen() {
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
      // getToken();
      AsyncStorage.clear();
  },[])

  return (
    <GradientBackground>
      <Layout>
        <ScrollView>
          <SafeAreaView>
            <ButtonBack />
            {user ? <Profile /> : <LoginForm getToken={getToken}/>}
          </SafeAreaView>
        </ScrollView>
      </Layout>
    </GradientBackground>
  );
}

function Profile() {
  return <Text style={{ color: "white" }}>Mi perfil</Text>;
}

function Login() {
  return <LoginForm getToken={getToken()}/>;
}
