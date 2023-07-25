import { Image, ScrollView, StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { SimpleContainer, ContainerText, Title, Channel } from "../../globalStyle";

export default function ListMedia({ videos, screenHeight, topBottomAreasHeight = 372 }) {
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
      style={{ height: screenHeight - topBottomAreasHeight }}
    >
      {videos.map((data, index) => {
        const uri = data.image;
        return (
        <SimpleContainer
          onPress={() => {
            navigation.navigate("DetailVideo", {
              videoId: data.videoId,
              videos: videos,
              screenHeight,
              topBottomAreasHeight,
            });
          }}
          key={index}
        >
          <VideoImage source={{uri}} />
          <ContainerText>
            <Title>{data.title}</Title>
            {/* <Tag style={styles.yellow}>{data.tag}</Tag> */}
            <Channel>{data.channel}</Channel>
          </ContainerText>
        </SimpleContainer>
      )})}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  yellow: {
    color: "#cda434",
  },
})

export const VideoImage = styled.Image`
  width: 85px;
  height: 55px;
  margin-right: 8px;
  border-radius: 4px;
`;

export const Tag = styled.Text`
  padding-top: 4px;
  font-size: 13px;
  font-weight: 400;
`;
