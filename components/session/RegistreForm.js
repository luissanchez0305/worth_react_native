import worthDB, { endpoints as epWorth } from "../../api/localDB";
import {
  View,
  Text,
  ToastAndroid,
  Platform,
  TouchableOpacity,
  Pressable,
  StyleSheet,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';

const Styles = StyleSheet.create({
  agreementContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "#ffffff",
    width: "100%",
  },
  verifyButton: {
    position: 'absolute',
    alignSelf: 'center',
    right: 18,
  },
});

export default function RegistreForm({user,setValidate}) {
  const [showPassword, setShowPassword] = React.useState(false);
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

  const onSubmit = async (data) => {
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
      const dData = await AsyncStorage.getItem("@worthapp.device")
      let deviceId = '';
      if(dData){
        const deviceData = JSON.parse(dData);
        deviceId = deviceData.deviceId

        data = {...data, deviceId, oneSignal_id: deviceData.token }
      }
      try{
      const registerData = await worthDB
        .post(epWorth.createNewUser, {
          ...data
        })
      
        /* if(deviceId.length){
          await worthDB.put(epWorth.deleteOrphanDevice(deviceId));
        } */
        if(registerData.data.code && registerData.data.code === 'ER_DUP_ENTRY'){
          raiseToast('¡Error, el correo ya existe. Por favor, ingrese otro!')
          return;
        }
        worthDB
          .post(epWorth.login, {
            username: data.email,
            password: data.password,
          })
          .then(async (res) => {
            const contextLoginData = {
              token: res.data.access_token,
              email: registerData.data.email,
              isPremium: false,
              isSMSValidated: false,
              isEmailValidated: false
            };
            await AsyncStorage.setItem("@worthapp", JSON.stringify(contextLoginData));

            raiseToast(successRegisterText)
            userContext.user = { email: data.email, isEmailValidated: false, isSMSValidated: false };
            navigation.navigate("ValidationForm", {
              email: data.email,
            });
          });
      } catch (error) {
        if(error.response && error.response.data.message[0].indexOf('minimum length') > -1){
          raiseToast('¡Error, la contraseña debe tener al menos 10 caracteres!')
        } else {
          raiseToast(`¡Error, ${error}!`)
        }
        console.log("error register", error);
      }
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
              <View style={Styles.agreementContainer}>
                <Input
                  value={value}
                  secureTextEntry={!showPassword}
                  onChangeText={onChange}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} style={Styles.verifyButton}>
                  <Icon name="eye" size={22} color="#dadada" />
                </Pressable>
              </View>
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
  width: 94%;
`;
