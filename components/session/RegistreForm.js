import worthDB, { endpoints as epWorth } from "../../api/localDB";
import { View, Text, ToastAndroid, Platform, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";
import styled from "styled-components/native";
import Toast from 'react-native-root-toast';
import HeadDetail from "../HeadDetail";
import React, { useState, useRef } from "react";


export default function RegistreForm() {
  const [fullLastName, setFullLastName] = useState();
  const [fullName, setFullName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const navigation = useNavigation();
  const phoneInput = useRef(null);


  const onsubmit = () =>{
    worthDB.post(epWorth.createNewUser, {
      email: email,
      name: fullName,
      lastname: fullLastName,
      password: password,
      phone,
    }).then((data)=>{
      if(Platform.OS === 'ios'){
        Toast.show('¡Usuario registrado exitosamente!', {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
        });
        navigation.navigate("Home");
      } else {
        ToastAndroid.showWithGravity(
          "¡Usuario registrado exitosamente!",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
        navigation.navigate("Home");
      }
    }).catch((error)=>{
      console.log('error',error)
      if(Platform.OS === 'ios'){
        Toast.show('¡Error, Usuario no registrado!', {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
        });
      } else {
        ToastAndroid.showWithGravity(
          "¡Error, Usuario no registrado!",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      }
    })
    };

  return (
    <View>
      <ContainerForm>
        <HeadDetail
          title={"Registro"}
          detail={
            "Crea una cuenta fácilmente para obtener beneficios de tener una cuenta con Worth"
          }
        />
        <InputGroup>
          <Label>Nombre Completo</Label>
          <Input placeholder="useless placeholder" value={fullName} onChangeText={CreatedFullName => setFullName(CreatedFullName)}/>
        </InputGroup>
        <InputGroup>
          <Label>Apellido Completo</Label>
          <Input placeholder="useless placeholder" value={fullLastName} onChangeText={CreatedLastName => setFullLastName(CreatedLastName)}/>
        </InputGroup>
        <InputGroup>
          <Label>Correo</Label>
          <Input placeholder="useless placeholder" keyboardType="email-address" value={email} onChangeText={CreatedEmail => setEmail(CreatedEmail)}/>
        </InputGroup>

        <InputGroup>
          <Label>Telefono</Label>
          <PhoneInput
              ref={phoneInput}
              defaultValue={phone}
              defaultCode="US"
              layout="first"
              onChangeFormattedText={(text) => {
                setPhone(text);
              }}
              withDarkTheme
              disableArrowIcon
              keyboardType="phone-pad"
              placeholder="useless placeholder"
              textContainerStyle={{
                backgroundColor: '#202226',
                borderColor: '#4c4f63',
                borderRadius: 8,
              }}
              textInputStyle={{
                color:'#ffffff',
              }}
              codeTextStyle={{color:'#ffffff'}}
              containerStyle={{
                backgroundColor: '#202226',
                minWidth: '43%',
                width: '94%',
                borderRadius: 8,
                marginTop: 8,
                marginBottom: 6,
                marginHorizontal: '3%',
              }}
            />
        </InputGroup>

        <InputGroup>
          <Label>Telefono</Label>
          <Input placeholder="useless placeholder" value={phone} onChangeText={CreatedPhone => setPhone(CreatedPhone)}/>
        </InputGroup>
        <InputGroup>
          <Label>Contraseña</Label>
          <Input placeholder="useless placeholder" value={password} secureTextEntry={true} onChangeText={CreatedPassword => setPassword(CreatedPassword)}/>
        </InputGroup>
        <InputGroup>
          <ButtonLogin onPress={onsubmit}>
            <Text style={{ color: "black", textAlign: "center", fontSize: 16 }}>
              Crear cuenta
            </Text>
          </ButtonLogin>
        </InputGroup>
      </ContainerForm>
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
