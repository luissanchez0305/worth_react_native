import worthDB, { endpoints as epWorth } from "../../api/localDB";
import {
  View,
  Text,
  ToastAndroid,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";
import styled from "styled-components/native";
import Toast from "react-native-root-toast";
import HeadDetail from "../HeadDetail";
import React, { useState, useRef, useContext } from "react";
import UserContext from "../../context/UserContext";

import { useForm, Controller } from "react-hook-form";
import { CardContainer } from "../../globalStyle";

export default function RegistreForm() {
  const userContext = useContext(UserContext);
  const navigation = useNavigation();
  const phoneInput = useRef(null);
  const successRegisterText = "¡Usuario registrado exitosamente!";
  const failRegisterText = "¡Error, Usuario no ha sido registrado!";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      fullLastName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    if (data) {
      data = {
        fullName: data.fullName,
        fullLastName: data.fullLastName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        password: data.password,
      };
    }

    worthDB
      .post(epWorth.createNewUser, {
        email: data.email,
        name: data.fullName,
        lastname: data.fullLastName,
        password: data.password,
        phone: data.phone,
      })
      .then((data) => {
        if (Platform.OS === "ios") {
          Toast.show(successRegisterText, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
          userContext.user = { email: data.email };
          navigation.navigate("ValidationForm", {
            email: data.email,
          });
        } else {
          ToastAndroid.showWithGravity(
            successRegisterText,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          );
          navigation.navigate("ValidationForm", {
            email: data.email,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        if (Platform.OS === "ios") {
          Toast.show(failRegisterText, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
        } else {
          ToastAndroid.showWithGravity(
            failRegisterText,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          );
        }
      });
  };

  return (
    <View>
      <CardContainer style={{ height: "100%" }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputGroup>
              <Label>Nombre Completo</Label>
              <Input
                placeholder="useless placeholder"
                value={value}
                onChangeText={onChange}
              />
            </InputGroup>
          )}
          name="fullName"
        />
        {errors.fullName && <Text>Este campo es requerido.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputGroup>
              <Label>Apellido Completo</Label>
              <Input
                placeholder="useless placeholder"
                value={value}
                onChangeText={onChange}
              />
            </InputGroup>
          )}
          name="fullLastName"
        />
        {errors.fullLastName && <Text>Este campo es requerido.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputGroup>
              <Label>Correo</Label>
              <Input
                placeholder="useless placeholder"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
              />
            </InputGroup>
          )}
          name="email"
        />
        {errors.email && <Text>Este campo es requerido.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputGroup>
              <Label>Teléfono</Label>
              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="PA"
                layout="first"
                onChangeFormattedText={onChange}
                withDarkTheme
                disableArrowIcon
                keyboardType="phone-pad"
                placeholder="useless placeholder"
                textContainerStyle={{
                  backgroundColor: "#202226",
                  borderRadius: 8,
                }}
                textInputStyle={{
                  color: "#ffffff",
                }}
                codeTextStyle={{ color: "#ffffff" }}
                containerStyle={{
                  backgroundColor: "#202226",
                  borderColor: "#4c4f63",
                  borderWidth: 1,
                  minWidth: "43%",
                  width: "94%",
                  borderRadius: 8,
                  marginTop: 8,
                  marginBottom: 6,
                  marginHorizontal: "3%",
                }}
              />
            </InputGroup>
          )}
          name="phone"
        />
        {errors.phone && <Text>Este campo es requerido.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
            min: 10,
          }}
          render={({ field: { onChange, value } }) => (
            <InputGroup>
              <Label>Contraseña</Label>
              <Input
                placeholder="useless placeholder"
                value={value}
                secureTextEntry={true}
                onChangeText={onChange}
              />
            </InputGroup>
          )}
          name="password"
        />
        {errors.password && <Text>Este campo es requerido.</Text>}
        <InputGroup>
          <ButtonLogin onPress={handleSubmit(onSubmit)}>
            <Text style={{ color: "black", textAlign: "center", fontSize: 16 }}>
              Crear cuenta
            </Text>
          </ButtonLogin>
        </InputGroup>
      </CardContainer>
    </View>
  );
}

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

const ButtonLogin = styled.TouchableOpacity`
  font-weight: 700;
  padding-vertical: 14px;
  background-color: #cda434;
  border-radius: 8px;
  margin-vertical: 12px;
  margin-horizontal: 3%;
`;

const ButtonRegistre = styled.TouchableOpacity`
  font-weight: 700;
  padding-vertical: 14px;
  background-color: #2d2d2d;
  border-radius: 8px;
  margin-vertical: 12px;
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
