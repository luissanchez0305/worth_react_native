import { View } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

export default function ListMedia({ datas }) {
  const navigation = useNavigation();

  return (
    <View>
      {datas.map((data, index) => (
        <Container
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate("DetailVideo", {
              itemId: 86,
            });
          }}
          key={index}
        >
          <Image source={data.image} />
          <ContainerText>
            <Title>{data.title}</Title>
            <Tag>{data.tag}</Tag>
            <Channel>{data.channel}</Channel>
          </ContainerText>
        </Container>
      ))}
    </View>
  );
}

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 6px;
  padding-top: 10px;
  padding-bottom: 14px;
  border-bottom-width: 1px;
  border-bottom-color: #45464f;
`;

export const ContainerText = styled.View`
  flex: 1;
  flex-wrap: "wrap";
`;

export const Image = styled.Image`
  width: 85px;
  height: 55px;
  margin-right: 8px;
  border-radius: 4px;
`;

export const Title = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
`;
export const Channel = styled.Text`
  padding-top: 4px;
  font-size: 13px;
  font-weight: 400;
  color: #aaabb5;
`;

export const Tag = styled.Text`
  padding-top: 4px;
  font-size: 13px;
  font-weight: 400;
  color: #cda434;
`;
