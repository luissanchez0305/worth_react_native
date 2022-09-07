import styled from "styled-components/native";
import React, { useContext, useState } from "react";
import worthDB, { endpoints as epWorth } from "../api/localDB";
import UserContext from "../context/UserContext";
import { View, Text, ScrollView } from "react-native";
import HeadDetail from "../components/HeadDetail";
import { useRoute } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { GradientBackground } from "../components/GradientBackground";
import { CardContainer, Layout } from "../globalStyle";
import { SafeAreaView } from "react-native-safe-area-context";

export const ValidationForm = (props) => {
  const userContext = useContext(UserContext);
  const [emailCode, setEmailCode] = useState("");
  const [smsCode, setSMSCode] = useState("");
  const [emailValidButtonText, setEmailValidButtonText] =
    useState("Validar email");
  const [enabledEmailValidateButton, setEnabledEmailValidateButton] =
    useState(true);
  const [smsValidButtonText, setSMSValidButtonText] =
    useState("Validar celular");
  const [enabledSMSValidateButton, setEnabledSMSValidateButton] =
    useState(true);
  const codeNotValidText = "Codigo no valido";

  const route = useRoute();
  const { email } = route.params;

  const submitCode = async (type) => {
    switch (type) {
      case "email":
        const resEmail = await worthDB.post(epWorth.sendEmailCode, {
          email,
          code: emailCode,
        });
        if (resEmail.data.valid) {
          setEmailValidButtonText("Email validado");
          setEnabledEmailValidateButton(false);
        } else {
          Toast.show(codeNotValidText, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
        }
        break;
      case "sms":
        const resSMS = await worthDB.post(epWorth.sendSMSCode, {
          email,
          code: smsCode,
        });
        if (resSMS.data.valid) {
          setSMSValidButtonText("Celular validado");
          setEnabledSMSValidateButton(false);
        } else {
          Toast.show(codeNotValidText, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
        }
        break;
    }
  };

  return (
    <GradientBackground>
      <Layout>
        <ScrollView>
          <SafeAreaView>
            <View>
              <ContainerForm>
                <HeadDetail
                  title={"Validación de contactos"}
                  detail={
                    "Valida tu correo y número de teléfono. Al presionar en 'Enviar', recibirás un mensaje con un codigo que debes usar aquí"
                  }
                />
              </ContainerForm>
              <CardContainer style={{ height: "100%" }}>
                <InputGroup>
                  {enabledEmailValidateButton ? (
                    <Label>Código enviado al email</Label>
                  ) : null}
                  {enabledEmailValidateButton ? (
                    <Input
                      placeholder="useless placeholder"
                      value={emailCode}
                      onChangeText={(emaiValue) => setEmailCode(emaiValue)}
                    />
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
                    <Label>Código enviado a SMS</Label>
                  ) : null}
                  {enabledSMSValidateButton ? (
                    <Input
                      placeholder="useless placeholder"
                      value={smsCode}
                      onChangeText={(smsValue) => setSMSCode(smsValue)}
                    />
                  ) : null}
                  <Button
                    onPress={() => submitCode("sms")}
                    disabled={!enabledSMSValidateButton}
                    style={{
                      backgroundColor: enabledSMSValidateButton
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
              </CardContainer>
            </View>
          </SafeAreaView>
        </ScrollView>
      </Layout>
    </GradientBackground>
  );
};
const ContainerForm = styled.View`
  margin-horizontal: 16px;
  margin-vertical: 16px;
`;

const Label = styled.Text`
  color: white;
  font-size: 14px;
  margin-top: 8px;
  font-weight: 700;
  margin-horizontal: 3%;
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
