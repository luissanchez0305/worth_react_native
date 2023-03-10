import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import { GradientBackground } from "../components/GradientBackground";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "../components/session/LoginForm";
import { Button, ScrollView, Text } from "react-native";
import { Layout, CardContainer, ContainerForm } from "../globalStyle";
import ButtonBack from "../components/ButtonBack";
import { getStorageItem } from "../utils";
import HeadDetail from "../components/HeadDetail";
import RegistreForm from "../components/session/RegistreForm";
import UserContext from "../context/UserContext";
import { ValidationForm } from "./ValidationForm";
import SignalsScreen from "./SignalsScreen";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation()
  const userContext = useContext(UserContext);
  const [userToken, setUserToken] = useState();
  const [userValidated, setUserValidated] = useState(false)

  const signout = async () => {
    await AsyncStorage.removeItem("@worthapp");
    userContext.user = null;
    setUserToken(null);
  };

  const token = async () => {
    const dataString = await getStorageItem("@worthapp");
    const data = JSON.parse(dataString)
    if (userContext.user && data) {
      setUserValidated(userContext.user.isEmailValidated && userContext.user.isSMSValidated);
      setUserToken(data.token);
    } else {
      setUserValidated(false);
      setUserToken();
    }
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
              userValidated ?
                <Profile signout={signout} user={userContext.user.email} setValidate={setUserValidated} /> :
                <ValidationForm signout={signout} />
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
        <ContainerHeader>
          <HeadDetail title={"Mi Perfil"} detail={"Actualiza tus datos aquí"} />
          {/* <Button title="Logout" onPress={async () => await props.signout()} /> */}
          <SignalButton onPress={async () => await props.signout()}>
                <Text style={{ color: "black", textAlign: "center", fontSize: 14 }}>
                  LOGOUT
                </Text>
              </SignalButton>
        </ContainerHeader>
      </ContainerForm>
      <RegistreForm user={props.user} setValidate={props.setValidate} />
    </>
  );
}

const ContainerHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-start;
`;

const SignalButton = styled.TouchableOpacity`
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  font-weight: 700;
  background-color: #cdcdcd;
  margin-vertical: 15px;
  margin-horizontal: 3%;
`;