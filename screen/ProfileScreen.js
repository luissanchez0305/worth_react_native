import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import { GradientBackground } from "../components/GradientBackground";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "../components/session/LoginForm";
import { Button, ScrollView, Text } from "react-native";
import { Layout, CardContainer, ContainerForm } from "../globalStyle";
import ButtonBack from "../components/ButtonBack";
import { getStorageItem } from "../utils";
import HeadDetail from "../components/HeadDetail";
import RegistreForm from "../components/session/RegistreForm";

export default function ProfileScreen() {
  const [userToken, setUserToken] = useState("985265656566");

  const signout = async () => {
    await AsyncStorage.removeItem("@token");
    setUserToken(null);
  };

  const token = async () => {
    data = await getStorageItem("@token");
    setUserToken(data);
  };

  useEffect(() => {
    token();
  }, [userToken]);

  return (
    <GradientBackground>
      <Layout>
        <ScrollView>
          <SafeAreaView>
            <ButtonBack />
            {userToken ? (
              <Profile signout={signout} />
            ) : (
              <LoginForm getToken={token} />
            )}
          </SafeAreaView>
        </ScrollView>
      </Layout>
    </GradientBackground>
  );
}

function Profile(props) {
  return (
    <>
      <ContainerForm>
        <HeadDetail title={"Mi Perfil"} detail={"Actualiza tus datos aqui"} />
      </ContainerForm>
      <RegistreForm />
      <Button title="Signout" onPress={async () => await props.signout()} />
    </>
  );
}
