import { Text } from "react-native";
import styled from "styled-components/native";

export default function ButtonChat() {
  return (
    <ContainerButton>
      <Text>*</Text>
    </ContainerButton>
  );
}

const ContainerButton = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background-color: blue;
  position: "absolute";
  bottom: 0px;
  right: 0px;
`;
