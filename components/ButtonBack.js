import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

export default function ButtonBack() {
  const navigation = useNavigation();
  return (
    <ContainerButton onPress={() => navigation.goBack()}>
      <Button>Volver</Button>
    </ContainerButton>
  );
}

const ContainerButton = styled.TouchableOpacity`
  margin-vertical: 16px;
`;

const Button = styled.Text`
  color: #fff;
  margin-horizontal: 16px;
`;
