import { View, Text } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import HeadDetail from "../HeadDetail";

export default function RegistreForm() {
  const navigation = useNavigation();
  return (
    <View>
      <ContainerForm>
        <HeadDetail
          title={"Registro"}
          detail={
            "Crea una cuenta facilmente para obtener beneficios de tener una cuenta con Worth"
          }
        />
        <InputGroup>
          <Label>Nombre completo</Label>
          <Input placeholder="useless placeholder" />
        </InputGroup>
        <InputGroup>
          <Label>Correo</Label>
          <Input placeholder="useless placeholder" />
        </InputGroup>
        <InputGroup>
          <Label>Contraseña</Label>
          <Input placeholder="useless placeholder" />
        </InputGroup>
        <InputGroup>
          <Label>Repetir Contraseña</Label>
          <Input placeholder="useless placeholder" />
        </InputGroup>
        <InputGroup>
          <ButtonLogin onPress={() => navigation.navigate("Home")}>
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
