import { useEffect, useState } from "react";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { CardContainer } from "../../globalStyle";
import DropDownPicker from "react-native-dropdown-picker";
import worthDB, { endpoints as epWorth } from "../../api/localDB";
import finnhubDB, { endpoints as epFinnhub } from "../../api/finnhubDB";
import alphaAdvantageDB, {
  endpoints as epAlphaAdvantage,
} from "../../api/alphaAdvantageDB";

export default function CalculatorForm() {
  const [lots, setLots] = useState("--");
  const [units, setUnits] = useState("--");
  const [riskMoney, setRiskMoney] = useState("--");

  const [instrumentId, setInstrumentId] = useState(null);
  const [instrumentText, setInstrumentText] = useState("");
  const [currencyId, setCurrencyId] = useState("");
  const [currencyText, setCurrencyText] = useState("");
  const [currencyResultText, setCurrencyResultText] = useState("");
  const [stopLostPips, setStopLostPips] = useState(0);
  const [accountSize, setAccountSize] = useState(0);
  const [pipSize, setPipSize] = useState(0);
  const [contractSize, setContractSize] = useState(0);
  const [risk, setRisk] = useState(0);
  const [price, setPrice] = useState("");
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [symbolOpen, setSymbolOpen] = useState(false);
  const [loadingSymbols, setLoadingSymbols] = useState(false);
  const [promiseStatus, setPromiseStatus] = useState("Obteniendo los datos...");
  const [symbols, setSymbols] = useState([]);
  const [currencies, setCurrencies] = useState([
    {label:'USD', value: 'USD'}, 
    {label:'EUR', value: 'EUR'},
    {label:'GBP', value: 'GBP'},
    {label:'JPY', value: 'JPY'},
    {label:'CHF', value: 'CHF'},
    {label:'AUD', value: 'AUD'},
    {label:'CAD', value: 'CAD'},
    {label:'NZD', value: 'NZD'},
    {label:'ZAR', value: 'ZAR'},
    {label:'MXN', value: 'MXN'},
    {label:'CNY', value: 'CNY'},
    {label:'HKD', value: 'HKD'},
    {label:'SGD', value: 'SGD'},
    {label:'NOK', value: 'NOK'},
    {label:'SEK', value: 'SEK'},
    {label:'TRY', value: 'TRY'},
    {label:'RUB', value: 'RUB'},
    {label:'INR', value: 'INR'},
    {label:'BRL', value: 'BRL'}
  ]);

  const getData = async () => {
    const response = await finnhubDB.get(epFinnhub.symbols);
    
    const _items = response.data.map((symbol) => ({
      label: symbol.displaySymbol,
      value: symbol.symbol,
    }));
    setSymbols(_items);
    setLoadingSymbols(true);
  };

  const setSymbolVal = async (obj) => {
    setLots("--");
    setUnits("--");
    setRiskMoney("--");
    if (currencyId) {
      const instrumentArray = obj.split(":")[1].split("_");
      const currencyFrom = currencyId;
      setCurrencyResultText(currencyFrom);
      const instrumentFrom = instrumentArray[0];
      const to = instrumentArray[1];
      if (currencyFrom.toLowerCase() === to.toLowerCase()) {
        setPrice("1");
      } else {
        const type = instrumentArray[3];

        getPrice(type, currencyFrom, to);
      }
      setInstrumentText(`${instrumentFrom}${to}`);
      setCurrencyText(`${currencyFrom}${to}`);
    }
  };

  const setCurrencyVal = (obj) => {
    setLots("--");
    setUnits("--");
    setRiskMoney("--");
    setCurrencyId(obj);

    if (instrumentId) {
      const instrumentArray = instrumentId.split(":")[1].split("_");
      const instrumentFrom = instrumentArray[0];
      const currencyFrom = obj;
      setCurrencyResultText(currencyFrom);
      const to = instrumentArray[1];
      const type = 'forex';
      if (currencyFrom.toLowerCase() === to.toLowerCase()) {
        setPrice("1");
      } else {
        getPrice(type, currencyFrom, to);
      }
      setInstrumentText(`${instrumentFrom}${to}`);
      setCurrencyText(`${currencyFrom}${to}`);
    }
  };

  const getPrice = async (type, from, to) => {
    if (type === "crypto") {
      alphaAdvantageDB
        .get(epAlphaAdvantage.crypto, {
          params: {
            symbol: from,
            market: to,
          },
        })
        .then((res) => {
          if (res.data["Error Message"]) {
            setPrice("-E-");
          } else {
            const results = res.data["Time Series Crypto (5min)"];
            setPrice(results[Object.keys(results).sort().pop()]["4. close"]);
          }
        })
        .catch((ex) => {
          setPromiseStatus(`Error al cargar datos: ${ex}`);
        });
    } else {
      alphaAdvantageDB
        .get(epAlphaAdvantage.forex, {
          params: {
            from_currency: from,
            to_currency: to,
          },
        })
        .then((res) => {
          if (res.data["Error Message"]) {
            console.log("data", res.data);
            setPrice("-E-");
          } else {
            setPrice(
              res.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
            );
          }
        })
        .catch((ex) => {
          setPromiseStatus(`Error al cargar datos: ${ex}`);
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const calculate = () => {
    if(accountSize === 0 || stopLostPips === 0 || risk === 0 || price === 0 || contractSize === 0 || pipSize === 0) {
      return;
    }

    const _risk = parseFloat(accountSize * (risk / 100));
    setRiskMoney(_risk);
    const _units = parseFloat((_risk / (stopLostPips * pipSize)) * price);
    setUnits(_units);
    const _lots = parseFloat(_units / contractSize).toFixed(3);
    setLots(_lots);
  };
  return (
    <View>
      <CardContainer>
        <ContainerForm>
          <Row>
            <DropDownInfoGroup>
              <Label>Instrumento</Label>
              {
                <DropDownPicker
                  open={symbolOpen}
                  value={instrumentId}
                  items={symbols}
                  setOpen={setSymbolOpen}
                  setValue={setInstrumentId}
                  setItems={setSymbols}
                  searchable={true}
                  onChangeValue={(obj) => setSymbolVal(obj)}
                  loading={loadingSymbols}
                  theme="DARK"
                />
              }
            </DropDownInfoGroup>
            <DropDownInfoGroup>
              <Label>Moneda de cambio</Label>
              <InputGroup>
                {
                  <DropDownPicker
                    open={currencyOpen}
                    value={currencyId}
                    items={currencies}
                    setOpen={setCurrencyOpen}
                    setValue={setCurrencyId}
                    setItems={setCurrencies}
                    searchable={true}
                    onChangeValue={(obj) => setCurrencyVal(obj)}
                    loading={loadingSymbols}
                    theme="DARK"
                  />
                }
              </InputGroup>
            </DropDownInfoGroup>
          </Row>
          <Row>
            <InputGroup>
              <Label>Saldo de la cuenta</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(text) => setAccountSize(Number(text))}
              />
            </InputGroup>
            <InfoGroup>
              <Label>Precio ({currencyText})</Label>
              <Input
                keyboardType="numeric"
                editable={false}
                value={price}
                onChangeText={(text) => setPrice(Number(text))}
              />
            </InfoGroup>
          </Row>
          <Row>
            <InputGroup>
              <Label>Stop loss (en PIPs)</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(text) => setStopLostPips(Number(text))}
              />
            </InputGroup>
            <InputGroup>
              <Label>Tamaño del contrato</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(text) => setContractSize(Number(text))}
              />
            </InputGroup>
          </Row>
          <Row></Row>
          <Row>
            <InputGroup>
              <Label>Tamaño de PIP ({instrumentText})</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(text) => setPipSize(Number(text))}
              />
            </InputGroup>
            <InputGroup>
              <Label>Riesgo (%)</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(text) => setRisk(text)}
              />
            </InputGroup>
          </Row>
        </ContainerForm>
        <ContainerForm>
          <Row>
            <ButtonInput onPress={calculate}>
              <Text
                style={{ color: "black", textAlign: "center", fontSize: 16 }}
              >
                Calcular
              </Text>
            </ButtonInput>
          </Row>
        </ContainerForm>
      </CardContainer>
      <CardContainer>
        <View style={{ marginVertical: 16 }}>
          <RowLine>
            <InfoGroup>
              <TextInfoLabel>Lotes</TextInfoLabel>
            </InfoGroup>
            <InfoGroup>
              <TextInfo>{lots}</TextInfo>
            </InfoGroup>
          </RowLine>
          <RowLine>
            <InfoGroup>
              <TextInfoLabel>Unidades</TextInfoLabel>
            </InfoGroup>
            <InfoGroup>
              <TextInfo>{units}</TextInfo>
            </InfoGroup>
          </RowLine>
          <RowLine>
            <InfoGroup>
              <TextInfoLabel>Dinero en riesgo</TextInfoLabel>
            </InfoGroup>
            <InfoGroup>
              <TextInfo>{`${riskMoney} ${currencyResultText}`}</TextInfo>
            </InfoGroup>
          </RowLine>
        </View>
      </CardContainer>
    </View>
  );
}

const ContainerForm = styled.View`
  margin-horizontal: 2px;
  margin-vertical: 2px;
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

const RowLine = styled.View`
  flex-direction: row;
  margin-horizontal: 1%;
  border-bottom-width: 1px;
  border-bottom-color: #45464f;
  margin-top: 10px;
`;

const InputGroup = styled.View`
  margin-vertical: 4px;
`;

const TextInfoLabel = styled.Text`
  font-weight: 600;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const TextInfo = styled.Text`
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 15px;
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

const DropDownInfoGroup = styled.View`
  width: 45%;
  margin: 2%;
`;

const InfoGroup = styled.View`
  width: 45%;
  margin-horizontal: 2%;
`;

const ButtonInput = styled.TouchableOpacity`
  flex: 1;
  font-weight: 700;
  padding-vertical: 14px;
  background-color: #cda434;
  border-radius: 8px;
  margin-vertical: 12px;
  margin-horizontal: 3%;
`;
