import { View } from "react-native";
import styled from "styled-components/native";
import { SimpleContainer, ContainerText, Title } from "../../globalStyle";

export default function ListNotification({ datas }) {
  return (
    <View>
      {datas.map((data, index) => (
        <SimpleContainer key={index}>
          <ContainerText>
            <Topic>{data.topic}</Topic>
            <Title>{data.title}</Title>
            <Tag>{data.date}</Tag>
          </ContainerText>
        </SimpleContainer>
      ))}
    </View>
  );
}

export const Tag = styled.Text`
  padding-top: 4px;
  font-size: 13px;
  font-weight: 400;
  color: #aaabb5;
`;

export const Topic = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #cda434;
`;
