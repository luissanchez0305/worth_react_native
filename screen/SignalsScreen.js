import { Layout, CardContainer, TextStatus } from "../globalStyle";
import { GradientBackground } from "../components/GradientBackground";
import { Text, SafeAreaView } from "react-native";
import LoginForm from "../components/session/LoginForm";
import { useContext, useEffect, useState } from "react";
import worthDB, { endpoints as worthEndpoints } from "../api/localDB";
import ListSignals from "../components/list/ListSignals";
import { getStorageItem } from "../utils";
import UserContext from "../context/UserContext";

export default function SignalsScreen({ navigation }) {
  const userContext = useContext(UserContext);
  const [userToken, setUserToken] = useState(null);
  const [userIsPremium, setUserIsPremium] = useState(false)
  const [signals, setSignals] = useState([]);

  const token = async () => {
    const dataString = await getStorageItem("@worthapp");
    if(dataString){
      const data = JSON.parse(dataString)
      setUserToken(data.token);
    }
  };

  const getSignals = async () => {
    const res = await worthDB.get(worthEndpoints.getAllSignals);
    setSignals(res.data);
  };

  const isUserValidated = () => {
    return userContext.user.isEmailValidated && userContext.user.isSMSValidated;
  }
  useEffect(() => {

    getSignals();
    const unsubscribe = navigation.addListener('focus', () => {
      token()
    });

    return unsubscribe;
    // token();
  }, [userToken]);

  if (userToken) {
      return (
        <GradientBackground
          colors={["#111D2E", "#1D242F", "#102F49"]}
          start={{ x: 0.4, y: 0.6 }}
          end={{ x: 0.5, y: 0.9 }}  
        >
        
          <Layout>
            <SafeAreaView>
              <CardContainer style={{ height: "100%" }}>
              {
                userContext.user.isPremium && 
                isUserValidated() ? 
                  signals.length ? (
                    <ListSignals signals={signals}/>
                  ) : !signals.length ? (
                    <Text>No hay señales</Text>
                  ) : (
                    <Text>Cargando...</Text>
                  )
                :
                <TextStatus>
                  {
                    !isUserValidated() ? 'Por favor validar su email y celular' : 'Usuario no es premium'
                  }</TextStatus>}
              </CardContainer>
            </SafeAreaView>
          </Layout>
        
        </GradientBackground>
      );
  } else {
    return (
      <GradientBackground>
        <Layout>
          <SafeAreaView>
            <LoginForm getToken={token} />
          </SafeAreaView>
        </Layout>
      </GradientBackground>
    );
  }
}
