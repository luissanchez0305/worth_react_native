import styled from "styled-components/native";
import { Text } from "react-native";
import React, { useState } from "react";

export default function ChartsFilterButton({
  filterTradingView,
  filterEvents,
  statusButton,
}) {
  return (
    <ContainerFilter>
      <ButtonView>
        <ButtonFilter
          style={{
            backgroundColor: statusButton === "tradingview" ? "#3B5998" : "#000",
          }}
          onPress={filterTradingView}
        >
          <Text style={{ color: "#fff" }}>Trading View</Text>
        </ButtonFilter>
      </ButtonView>
      <ButtonView>
        <ButtonFilter
          style={{
            backgroundColor: statusButton === "events" ? "#3B5998" : "#000",
          }}
          onPress={filterEvents}
        >
          <Text style={{ color: "#fff" }}>Eventos</Text>
        </ButtonFilter>
      </ButtonView>
    </ContainerFilter>
  );
}

const ContainerFilter = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  background-color: #000;
  border-radius: 10px;
`;

const ButtonView = styled.View`
  flex: 1;
  padding: 3px;
  height: 80px;
  margin-top: 80px;
`;

const ButtonFilter = styled.TouchableOpacity`
  align-items: center;
  padding: 8px;
  border-radius: 8px;
`;
