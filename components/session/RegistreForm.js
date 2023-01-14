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
import React, { useState, useRef, useContext, useEffect, useMemo } from "react";
import UserContext from "../../context/UserContext";

import { useForm, Controller } from "react-hook-form";
import { CardContainer } from "../../globalStyle";
import { raiseToast } from "../../utils";

export default function RegistreForm({user,setValidate}) {
  const userContext = useContext(UserContext);
  const navigation = useNavigation();
  const successRegisterText = "¡Usuario registrado exitosamente!";
  const successUpdateText = "¡Usuario actualizado exitosamente!";
  const failRegisterText = "¡Error, Usuario no ha sido registrado!";
  const userData = useRef();

  const initialState = {
    name: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    isPremium: false
  }
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
  });

  const onSubmit = (data) => {
    if(user) {
      worthDB.put(epWorth.updateUser(userData.current.email), {
        ...data,
        phone: userData.current.phone,
        isPremium: userData.current.isPremium,
      })
      .then(() => {
        userContext.user = { ...userContext.user }
        userContext.user.email= data.email;

        raiseToast(successUpdateText)

        if(data.email !== userData.current.email){
          userContext.user.isEmailValidated = false
          setValidate(false)
          navigation.navigate("ValidationForm", {
            email: data.email,
          });
        }
      })
    } else {
    worthDB
      .post(epWorth.createNewUser, {
        email: data.email,
        name: data.name,
        lastname: data.lastname,
        password: data.password,
        phone: data.phone,
      })
      .then(async (data) => {
        raiseToast(successRegisterText)
        userContext.user = { email: data.email, isEmailValidated: false, isSMSValidated: false };
        navigation.navigate("ValidationForm", {
          email: data.email,
        });

        const dData = await AsyncStorage.getItem("@worthapp.device")

        if(dData){
          const deviceData = JSON.parse(dData);
          await worthDB.put(epWorth.deleteOrphanDevice(deviceData.deviceId));

        }
      })
      .catch((error) => {
        raiseToast(failRegisterText)
        console.log("error", error);
      });
    }
  };

  const getUserInfo = async () => {
    if(user){
      const res = await worthDB.get(epWorth.getUserByEmail(user))
      const basicData = {
        name: res.data.name,
        lastname: res.data.lastname,
        email: res.data.email,
      }

      userData.current = {
        ...basicData, 
        phone: res.data.phone, 
        isPremium: res.data.isPremium
      }

      reset({...basicData})
    }
  }
  
  useEffect(() => {
    getUserInfo()
  }, [])

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
              <Label>Correo</Label>
              <Input
                placeholder="Correo"
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
              <Label>Nombre Completo</Label>
              <Input
                placeholder="Nombre Completo"
                value={value}
                onChangeText={onChange}
              />
            </InputGroup>
          )}
          name="name"
        />
        {errors.name && <Text>Este campo es requerido.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputGroup>
              <Label>Apellido Completo</Label>
              <Input
                placeholder="Apellido Completo"
                value={value}
                onChangeText={onChange}
              />
            </InputGroup>
          )}
          name="lastname"
        />
        {errors.lastname && <Text>Este campo es requerido.</Text>}
        
        {user ? <></> : <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputGroup>
              <Label>Teléfono</Label>
              <PhoneInput
                defaultValue={value}
                defaultCode="PA"
                layout="first"
                onChangeFormattedText={onChange}
                withDarkTheme
                disableArrowIcon
                keyboardType="phone-pad"
                placeholder="Teléfono"
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
        />}
        {errors.phone && <Text>Este campo es requerido.</Text>}
        
        
        {user ? <></> : <Controller
          control={control}
          rules={{
            required: true,
            min: 10,
          }}
          render={({ field: { onChange, value } }) => (
            <InputGroup>
              <Label>Contraseña</Label>
              <Input
                placeholder="Contraseña"
                value={value}
                secureTextEntry={true}
                onChangeText={onChange}
              />
            </InputGroup>
          )}
          name="password"
        />}
        
        {errors.password && <Text>Este campo es requerido.</Text>}

        <InputGroup>
          <ButtonLogin onPress={handleSubmit(onSubmit)}>
            <Text style={{ color: "black", textAlign: "center", fontSize: 16 }}>
              {user ? 'Guardar cambios' : 'Crear cuenta'}
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
