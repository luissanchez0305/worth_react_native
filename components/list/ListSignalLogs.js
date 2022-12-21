import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ContainerInfo, ContainerText, Tag, Title } from "../../globalStyle";
import { formatCurrencyDecimals, getDateFormatComplete } from "../../utils";
import styled from "styled-components/native";

export default 
function ListSignalLogs({ logs }) {
  
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
            {logs.map((data, index) => {
              return (
                <Container key={index}>
                    <ContainerText>
                        <Title>{getDateFormatComplete(data.created_at)}</Title>
                        <ContainerInfo>
                            <Tag>{data.description}</Tag>
                        </ContainerInfo>
                    </ContainerText>
                </Container>
              )
            })}
        </ScrollView>
    )
}

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 6px;
  padding-top: 10px;
  padding-bottom: 14px;
  border-bottom-width: 1px;
  border-bottom-color: #45464f;
`;
