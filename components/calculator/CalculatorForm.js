import { Text, TextInput, View } from "react-native";
import styled from "styled-components/native";
import { CardContainer } from "../../globalStyle";

export default function CalculatorForm() {
  return (
    <View>
      <ContainerForm>
        <Row>
          <InputGroup>
            <Label>Instrument</Label>
            <Input placeholder="useless placeholder" keyboardType="numeric" />
          </InputGroup>
          <InputGroup>
            <Label>Deposit Currency</Label>
            <Input placeholder="useless placeholder" keyboardType="numeric" />
          </InputGroup>
        </Row>
        <InputGroup>
          <Label>Instrument</Label>
          <Input placeholder="useless placeholder" keyboardType="numeric" />
        </InputGroup>
        <InputGroup>
          <Label>Account Balance</Label>
          <Input placeholder="useless placeholder" keyboardType="numeric" />
        </InputGroup>
        <Row>
          <InputGroup>
            <Label>EURUSD 1PIP Size</Label>
            <Input placeholder="useless placeholder" keyboardType="numeric" />
          </InputGroup>
          <InputGroup>
            <Label>Risk</Label>
            <Input placeholder="useless placeholder" keyboardType="numeric" />
          </InputGroup>
        </Row>
        <InputGroup>
          <Label>Name</Label>
          <Input placeholder="useless placeholder" keyboardType="numeric" />
        </InputGroup>
      </ContainerForm>
      <CardContainer>
        <Row>
          <InfoGroup>
            <Label>Lots(Trade Size)</Label>
            <TextInfo>1</TextInfo>
          </InfoGroup>
          <InfoGroup>
            <Label>Units(Trade Size)</Label>
            <TextInfo>100,000</TextInfo>
          </InfoGroup>
        </Row>
        <Row>
          <InfoGroup>
            <Label>Units(Trade size)</Label>
            <TextInfo>US $2,000.00</TextInfo>
          </InfoGroup>
        </Row>
      </CardContainer>
    </View>
  );
}

const ContainerForm = styled.View`
  margin-horizontal: 16px;
  margin-vertical: 16px;
`;

const Label = styled.Text`
  color: white;
  font-size: 14px;
  margin-top: 8px;
  font-weight: 700;
  margin-horizontal: 3%;
`;

const Row = styled.View`
  flex-direction: row;
  margin-horizontal: 1%;
`;

const InputGroup = styled.View`
  margin-vertical: 4px;
`;

const TextInfo = styled.Text`
  font-weight: 600;
  font-size: 19px;
  margin-top: 10px;
  margin-bottom: 20px;
  color: #fff;
  margin-horizontal: 3%;
`;

const Input = styled.TextInput`
  height: 48px;
  margin-top: 8px;
  border-width: 1px;
  border-color: #4c4f63;
  background-color: #202226;
  padding: 10px;
  color: white;
  border-radius: 8px;
  margin-horizontal: 3%;
  margin-bottom: 6px;
  min-width: 43%;
`;

const InfoGroup = styled.View`
  width: 45%;
  margin-horizontal: 2%;
`;
