import { View } from "react-native";
import styled from "styled-components/native";

export default function ListNotification({ datas }) {
  return (
    <View>
      {datas.map((data, index) => (
        <Container key={index}>
          <ContainerText>
            <Topic>{data.topic}</Topic>
            <Title>{data.title}</Title>
            <Tag>{data.date}</Tag>
          </ContainerText>
        </Container>
      ))}
    </View>
  );
}

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 6px;
  padding-bottom: 14px;
  border-bottom-width: 1px;
  border-bottom-color: #45464f;
`;

export const ContainerText = styled.View`
  flex: 1;
  flex-wrap: "wrap";
`;

export const Title = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
`;
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
