import { Image, ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

export default function ListMedia({ videos }) {
  const navigation = useNavigation();
  
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const showLoadMoreButton = () => {

  }

  return (
    <ScrollView
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          showLoadMoreButton();
        }
      }}
      scrollEventThrottle={400}
    >
      {videos.map((data, index) => {
        const uri = data.image;
        return (
        <Container
          onPress={() => {
            navigation.navigate("DetailVideo", {
              videoId: data.videoId,
              videos: videos
            });
          }}
          key={index}
        >
          <VideoImage source={{uri}} />
          <ContainerText>
            <Title>{data.title}</Title>
            <Tag>{data.tag}</Tag>
            <Channel>{data.channel}</Channel>
          </ContainerText>
        </Container>
      )})}
    </ScrollView>
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
`;

export const VideoImage = styled.Image`
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
