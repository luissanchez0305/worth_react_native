import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
} from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

const ExpandableView = ({ expanded = false, data = [] }) => {
  const [height] = useState(new Animated.Value(0));
  const copyToClipboard = (val) => {
    Clipboard.setString(val);
  };
  useEffect(() => {
    Animated.timing(height, {
      toValue: !expanded ? 300 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [expanded, height]);

  // console.log('rerendered');

  return (
    <Animated.View style={{ height, backgroundColor: "white" }}>
      <View>
        {data.map((item, index) => (
          <>
            <Channel>
              <Text>Price</Text>
              <Text onPress={() => copyToClipboard(item.price)}>
                {item.price}
              </Text>
            </Channel>
            <Channel>
              <Text>Have been reached?</Text>{" "}
              {item.takeProfitReached ? <Text>Yes</Text> : <Text>No</Text>}
            </Channel>
          </>
        ))}
      </View>
    </Animated.View>
  );
};

export default function ListSignals({ signals }) {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSignals, setExpandedSignals] = useState([]);

  const toggleExpanded = (index) => {
    const array = [...expandedSignals];
    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]["isExpanded"] = !array[placeindex]["isExpanded"])
        : (array[placeindex]["isExpanded"] = false)
    );

    setExpandedSignals(array);
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const showLoadMoreButton = () => {};

  const setExpandables = () => {
    const _signals = signals.map((item) => {
      return {
        isExpanded: false,
        ...item,
      };
    });
    setExpandedSignals(_signals);
  };

  useState(() => {
    setExpandables();
  });

  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          showLoadMoreButton();
        }
      }}
      scrollEventThrottle={400}
    >
      {expandedSignals.map((data, index) => {
        const uri = data.image;
        return (
          <Container key={index}>
            <ContainerText>
              <Title>{data.symbol}</Title>
              <Tag>{data.type}</Tag>
              <Channel>
                <Text>Risk</Text>
                <Datas>{data.risk}</Datas>
              </Channel>
              <Channel>
                <Text>Entry Price</Text>
                <Datas>{data.entryPrice}</Datas>{" "}
              </Channel>
              <Channel>
                <Text>Stop Lost</Text>
                <Datas>{data.stopLost}</Datas>
              </Channel>
              <TouchableOpacity
                onPress={() => {
                  setIsExpanded(toggleExpanded(index));
                }}
                style={styles.toggle}
              >
                <Text style={styles.toggleText}>Take profits</Text>
              </TouchableOpacity>
              <ExpandableView
                expanded={!data.isExpanded}
                data={data.takeProfits}
              />
            </ContainerText>
          </Container>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  toggle: {
    width: 100,
    height: 30,
    marginVertical: 4,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleText: {
    color: "#fff",
  },
});

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 6px;
  border-radius: 8px;
  padding-top: 10px;
  padding-bottom: 14px;
  padding-right: 10px;
  padding-left: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #45464f;
  background-color: #353c47;
`;

export const ContainerText = styled.View`
  flex: 1;
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

export const Datas = styled.Text`
  color: #ffffff;
  font-weight: 800;
  padding-right: 4px;
`;
