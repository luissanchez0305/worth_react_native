import React, { useState, useCallback, useRef, useEffect, useContext } from "react";
import { GradientBackground } from "../components/GradientBackground";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "../components/session/LoginForm";
import { Button, ScrollView, Text } from "react-native";
import { Layout, CardContainer } from "../globalStyle";
import ButtonBack from "../components/ButtonBack";
import { getStorageItem } from "../utils";


export default function ProfileScreen() {
  const [userToken, setUserToken] = useState();

  const signout = async () => {
    await AsyncStorage.removeItem('@token');
    setUserToken(null);
  }
  
  const token = async () =>{
    data = await getStorageItem('@token');
    setUserToken(data);
  } 

  useEffect(()=>{
    token();
  },[userToken])

  return (
    <GradientBackground>
      <Layout>
        <ScrollView>
          <SafeAreaView>
            <ButtonBack />
            {userToken ? <Profile signout={signout} /> : <LoginForm getToken={token}/>}
          </SafeAreaView>
        </ScrollView>
      </Layout>
    </GradientBackground>
  );
}

function Profile(props) {
  return (<><Text style={{ color: "white" }}>Mi perfil</Text><Button title="Signout" onPress={() => props.signout()} /></>);
}
