import AsyncStorage from "@react-native-async-storage/async-storage";
import worthDB, { endpoints as epWorth } from "../../api/localDB";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { View, Text, ToastAndroid, Platform } from "react-native";
import styled from "styled-components/native";
import Toast from 'react-native-root-toast';
import HeadDetail from "../HeadDetail";
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";

export default function LoginForm(props) {
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const navigation = useNavigation();
  const successLoginText = '¡Ha iniciado sesión exitosamente!';
  const failLoginText = 'Usuario o contraseña invalida';
  

  const onSubmit = () =>{
    try {
      worthDB.post(epWorth.login, {
        username: email.toLowerCase(),
        password: password
      }).then(async (data)=>{
        await AsyncStorage.setItem('@token', data.data.access_token);
        userContext.user = { token: data.data.access_token, email: email.toLowerCase() };
        const user = await worthDB.get(epWorth.getUser, { email: email.toLowerCase() })
        
        if(Platform.OS === 'ios'){
          Toast.show(successLoginText, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
          props.getToken()
        } else {
          ToastAndroid.showWithGravity(
            successLoginText,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          );
          props.getToken()
        }
      }).catch((error)=>{
        console.log('Error login ', error)
        if(Platform.OS === 'ios'){
          Toast.show(failLoginText, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
        } else {
          ToastAndroid.showWithGravity(
            failLoginText,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          );
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View>
      <ContainerForm>
        <HeadDetail
          title={"Iniciar Sesión"}
          detail={"Disfruta los beneficios de tener una cuenta con Worth"}
        />
        <InputGroup>
          <Label>Correo</Label>
          <Input placeholder="useless placeholder" value={email} keyboardType="email-address" onChangeText={Email => setEmail(Email)}/>
        </InputGroup>
        <InputGroup>
          <Label>Contraseña</Label>
          <Input placeholder="useless placeholder" value={password} secureTextEntry={true} onChangeText={Password => setPassword(Password)}/>
        </InputGroup>
        <InputGroup>
          <ButtonLogin onPress={onSubmit}>
            <Text style={{ color: "black", textAlign: "center", fontSize: 16 }}>
              Iniciar Sesión
            </Text>
          </ButtonLogin>
          <ButtonRegistre onPress={() => navigation.navigate("Registre")}>
            <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
              Crear una cuenta
            </Text>
          </ButtonRegistre>
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
