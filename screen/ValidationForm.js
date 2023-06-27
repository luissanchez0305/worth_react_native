import styled from "styled-components/native";
import React, { useContext, useEffect, useState } from "react";
import worthDB, { endpoints as epWorth } from "../api/localDB";
import UserContext from "../context/UserContext";
import { View, Text, ScrollView, Button as SignoutButton, TouchableOpacity, StyleSheet } from "react-native";
import HeadDetail from "../components/HeadDetail";
import { Link, useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { GradientBackground } from "../components/GradientBackground";
import { CardContainer, Layout } from "../globalStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonBack from "../components/ButtonBack";
import { raiseToast } from "../utils";

export const ValidationForm = (props) => {
  const {otherDevice, email, deviceId} = useRoute().params;
  const navigation = useNavigation();
  const cellphoneValidatedText = "Celular validado";
  const emailValidatedText = "Email validado";
  const codeNotValidText = "Código no valido";
  const sendAgainText = 'Enviar otro vez';
  const validateLoginText1 = "Ha iniciado sesión desde otro dispositivo";
  const validateLoginText2 = "Por favor enviar un nuevo SMS para validarlo!";
  const userContext = useContext(UserContext);
  const [emailCode, setEmailCode] = useState("");
  const [smsCode, setSMSCode] = useState("");

  const [emailValidButtonText, setEmailValidButtonText] =
    useState(userContext.user.isEmailValidated ? emailValidatedText : "Validar email");

  const [enabledEmailValidateButton, setEnabledEmailValidateButton] =
    useState(!userContext.user.isEmailValidated);

  const [smsValidButtonText, setSMSValidButtonText] =
    useState(userContext.user.isSMSValidated ? cellphoneValidatedText : "Validar celular");

  const [enabledSMSValidateButton, setEnabledSMSValidateButton] =
    useState(!userContext.user.isSMSValidated);

  const [sendEmailAgainText, setSendEmailAgainText] = useState(sendAgainText)
  const [sendEmailAgainEnabled, setSendEmailAgainEnabled] = useState(true)
  const [sendSMSAgainText, setSendSMSAgainText] = useState(sendAgainText)
  const [sendSMSAgainEnabled, setSendSMSAgainEnabled] = useState(true)

  const sendCodeAgain = async (type) => {
    switch (type) {
      case 'email':
        try {
          const resEmail = await worthDB.post(epWorth.sendEmailCode, {
            email: userContext.user.email,
          })

          setSendEmailAgainText('Correo enviado...')
          setSendEmailAgainEnabled(false)
          setTimeout(() => {
            setSendEmailAgainText(sendAgainText)
            setSendEmailAgainEnabled(true)
          }, 300000)
        } catch (e) {
          setSendEmailAgainText('Error. Intente mas tarde')
          setSendEmailAgainEnabled(false)
        }
        break;
      case 'sms':
        try {
          await worthDB.post(epWorth.sendSMSCode, {
            email: userContext.user.email,
          })

          setSendSMSAgainText('SMS enviado...')
          setSendSMSAgainEnabled(false)
          setTimeout(() => {
            setSendSMSAgainText(sendAgainText)
            setSendSMSAgainEnabled(true)
          }, 300000)
        } catch (e) {
          setSendSMSAgainText(`Error. Intente mas tarde. ${e}`)
          setSendSMSAgainEnabled(false)
        }
        break;
    }
  }

  const submitCode = async (type) => {
    switch (type) {
      case "email":
        try {
          const resEmail = await worthDB.post(epWorth.validateEmailCode, {
            email: userContext.user.email,
            code: emailCode,
          });
          if (resEmail.data.valid) {
            userContext.user.isEmailValidated = true
            setEmailValidButtonText(emailValidatedText);
            setEnabledEmailValidateButton(false);
          } else {
            Toast.show(codeNotValidText, {
              duration: Toast.durations.LONG,
              position: Toast.positions.CENTER,
            });
          }
        } catch (e) {
          console.log('error validation email', e)
        }
        break;
      case "sms":
        try {
          const resSMS = await worthDB.post(epWorth.validateSMSCode, {
            email: userContext.user.email,
            code: smsCode,
          });
          if (resSMS.data.valid) {
            userContext.user.isSMSValidated = true
            setSMSValidButtonText(cellphoneValidatedText);
            setEnabledSMSValidateButton(false);
            if(otherDevice){
              const user = await worthDB.get(epWorth.getUserByEmail(email));
              user.data.deviceId = deviceId;
              await worthDB.put(epWorth.updateDeviceUser(email), {
                ...user.data,
              })
            }
          } else {
            Toast.show(codeNotValidText, {
              duration: Toast.durations.LONG,
              position: Toast.positions.CENTER,
            });
          }
        } catch (e) {
          raiseToast(e);
          console.log('error validation sms', e)
        }
        break;
    }
  };

  const signout = async () => {
    await AsyncStorage.removeItem("@worthapp");
    userContext.user = null;
    navigation.navigate("Home")
  };

  return (
    <GradientBackground>
      <Layout>
        <ScrollView>
          <SafeAreaView>
            <ContainerTest>
              <ButtonBack />
              <SignoutButton1 onPress={async () => {
                if (props.signOut === undefined) {
                  await signout()
                } else {
                  await props.signOut()
                }
              }}>
                <Text style={{ color: "black", textAlign: "center", fontSize: 14 }}>
                  LOGOUT
                </Text>
              </SignoutButton1>
            </ContainerTest>
            <View>
              <ContainerForm>
                <HeadDetail
                  title={"Validación de contactos"}
                  detail={
                    "Valida tu correo y número de teléfono. Pronto recibirás un mensaje con un código que debes usar aquí"
                  }
                />
              </ContainerForm>
              {/* <SignoutButton title="Logout" onPress={async () => await props.signout()} style={styles.signout}>
              </SignoutButton> */}

              <CardContainer style={{ height: "100%" }}>
                <InputGroup>
                  {enabledEmailValidateButton ? (
                    <>
                      <Box>
                        <Label>Introducir código enviado al email</Label>
                        <ContainerCleanButton onPress={() => sendCodeAgain('email')} disabled={!sendEmailAgainEnabled}>
                          <CleanButton>{sendEmailAgainText}</CleanButton>
                        </ContainerCleanButton>
                      </Box>
                      <Input
                        keyboardType='numeric'
                        value={emailCode}
                        onChangeText={(emaiValue) => setEmailCode(emaiValue)}
                      />
                    </>
                  ) : null}
                  <Button
                    onPress={() => submitCode("email")}
                    disabled={!enabledEmailValidateButton}
                    style={{
                      backgroundColor: enabledEmailValidateButton
                        ? "#cda434"
                        : "#f1f1f1",
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        textAlign: "center",
                        fontSize: 16,
                      }}
                    >
                      {emailValidButtonText}
                    </Text>
                  </Button>
                </InputGroup>
                <InputGroup>
                  {enabledSMSValidateButton ? (
                    <>
                      {otherDevice ? (
                      <Box2>
                        <LabelError>{validateLoginText1}</LabelError>
                        <LabelError>{validateLoginText2}</LabelError>
                      </Box2>) : null}
                      <Box>
                        <Label>Introducir código enviado a SMS</Label>
                        <ContainerCleanButton onPress={() => sendCodeAgain('sms')} disabled={!sendSMSAgainEnabled}>
                          <CleanButton>{sendSMSAgainText}</CleanButton>
                        </ContainerCleanButton>
                      </Box>
                      <Input
                        keyboardType='numeric'
                        value={smsCode}
                        onChangeText={(smsValue) => setSMSCode(smsValue)}
                      />
                    </>
                  ) : null}
                  <Button
                    onPress={() => submitCode("sms")}
                    disabled={!enabledSMSValidateButton || !sendSMSAgainEnabled}
                    style={{
                      backgroundColor: enabledSMSValidateButton || !sendSMSAgainEnabled
                        ? "#cda434"
                        : "#f1f1f1",
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        textAlign: "center",
                        fontSize: 16,
                      }}
                    >
                      {smsValidButtonText}
                    </Text>
                  </Button>
                </InputGroup>
                {
                  !enabledEmailValidateButton && !enabledSMSValidateButton ?
                    <HomeButton title="Home" onPress={() => navigation.navigate("Home")}>
                      <Text style={{ color: "black", textAlign: "center", fontSize: 14 }}>
                        HOME
                      </Text>
                    </HomeButton> :
                    null
                }

              </CardContainer>
            </View>
          </SafeAreaView>
        </ScrollView>
      </Layout>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  signout: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    fontWeight: 700,
    backgroundColor: '#cda434',
    marginVertical: 10
  }
});

const ContainerForm = styled.View`
  margin-horizontal: 16px;
  margin-vertical: 16px;
`;

const Box = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around; 
  align-items: center;
`;

const Box2 = styled.View`
  align-items: center;
  margin-bottom: 8px;
`;

const LabelError = styled.Text`
  color: red;
  font-size: 14px;
  margin-top: 8px;
  font-weight: 700;
  margin-horizontal: 3%;
`;

const Label = styled.Text`
  color: white;
  font-size: 14px;
  margin-top: 8px;
  font-weight: 700;
  margin-horizontal: 3%;
  text-align: center;
`;

const InputGroup = styled.View`
  margin-vertical: 4px;
`;

const Input = styled.TextInput`
  height: 48px;
  margin-top: 8px;
  border-width: 1px;
  border-color: #4c4f63;
  background-color: #202226;
  padding: 10px;
  color: white;
  border-radius: 8px;
  margin-horizontal: 3%;
  margin-bottom: 6px;
  min-width: 43%;
`;

const Button = styled.TouchableOpacity`
  font-weight: 700;
  padding-vertical: 14px;
  border-radius: 8px;
  margin-vertical: 12px;
  margin-horizontal: 3%;
`;


const ContainerCleanButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  font-weight: 700;
  background-color: #3A5998;
  margin-vertical: 10px;
  margin-rigth: 6px;
`;

const CleanButton = styled.Text`
  color: #fff;
  font-size: 14px;
`;

const SignoutButton1 = styled.TouchableOpacity`
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  font-weight: 700;
  background-color: #cdcdcd;
  margin-vertical: 15px;
  margin-horizontal: 3%;
`
const HomeButton = styled.TouchableOpacity`
  font-weight: 700;
  padding-vertical: 14px;
  background-color: #cda434;
  border-radius: 8px;
  margin-vertical: 12px;
  margin-horizontal: 3%;
`

const ContainerTest = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-start;
`;
