import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native-web";

export default function ButtonBack() {
  const navigation = useNavigation();
  return (
    <ContainerButton onPress={() => navigation.goBack()}>
      <Icon source={require("../assets/back.png")} />
      <Button>Volver</Button>
    </ContainerButton>
  );
}

const ContainerButton = styled.TouchableOpacity`
  flex-direction: row;
  margin-vertical: 8px;
`;

const Icon = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 2px;
`;

const Button = styled.Text`
  color: #fff;
  font-size: 17px;
  margin-top: 8px;
`;
