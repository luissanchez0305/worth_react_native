import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import styled from "styled-components/native";
import { CardContainer } from "../../globalStyle";
import DropDownPicker from 'react-native-dropdown-picker';
import worthDB, { endpoints as epWorth } from "../../api/localDB";
import alphaAdvantageDB, { endpoints as epAlphaAdvantage } from "../../api/alphaAdvantage";

export default function CalculatorForm() {
  const [lots, setLots] = useState('--');
  const [units, setUnits] = useState('--');
  const [riskMoney, setRiskMoney] = useState('--');

  const [instrumentId, setInstrumentId] = useState(null);
  const [instrumentText, setInstrumentText] = useState('');
  const [currencyId, setCurrencyId] = useState('');
  const [currencyText, setCurrencyText] = useState('');
  const [currencyResultText,setCurrencyResultText] = useState('');
  const [stopLostPips, setStopLostPips] = useState(0);
  const [accountSize, setAccountSize] = useState(0);
  const [pipSize, setPipSize] = useState(0);
  const [contractSize, setContractSize] = useState(0);
  const [risk, setRisk] = useState(0);
  const [price, setPrice] = useState('');
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [symbolOpen, setSymbolOpen] = useState(false);
  const [loadingSymbols, setLoadingSymbols] = useState(false);
  const [promiseStatus, setPromiseStatus] = useState('Obteniendo los datos...');
  const [symbols, setSymbols] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const promises = [];
  let responses = [];
  const getData = async () => {
    promises.push(worthDB
      .get(epWorth.getAllSymbols));
    promises.push(worthDB
      .get(epWorth.getAllCurrencies));
    
    try{
      responses = await Promise.all(promises);
    }
    catch(ex){
      setPromiseStatus(`Error al cargar datos: ${ex}`);
      return;
    }

    for(let i = 0; i < responses.length; i++) {
      const response = responses[i];
      switch(i){
        case 0:
          const _resSymbols = response.data;
          const _items = [];
          _resSymbols.forEach(element => {
            _items.push({
              label: `${element.from}${element.to}`,
              value: `${element.id}:${element.from}:${element.to}:${element.type}`
            })
          });
          setSymbols(_items);
          break;
        case 1:
          const _resCurrencies = response.data;
          const _currencies = [];
          _resCurrencies.forEach(element => {
            _currencies.push({
              label: element.name,
              value: `${element.id}:${element.name}:${element.type}`,
            })
          });
          setCurrencies(_currencies);
          break;
      }
      setLoadingSymbols(true);
    }
  }

  const setCurrencyVal = (obj) => {
    setLots('--');
    setUnits('--');
    setRiskMoney('--');
    setCurrencyId(obj);

    if(instrumentId){
      const instrumentArray = instrumentId.split(':');
      const currencyArray = obj.split(':');
      const from = currencyArray[1];
      setCurrencyResultText(from);
      const to = instrumentArray[2];
      const type = currencyArray[2];
      if(from.toLowerCase() === to.toLowerCase()){
        setPrice(1);
      }
      else{
        getPrice(type, from, to)
      }
      setCurrencyText(`${from}${to}`)
      setInstrumentText(`${instrumentArray[1]}${to}`);
    }
  }

  const setSymbolVal = async (obj) => {
    setLots('--');
    setUnits('--');
    setRiskMoney('--');
    if(currencyId){
      const instrumentArray = obj.split(':');
      const currencyArray = currencyId.split(':');
      const currencyFrom = currencyArray[1];
      setCurrencyResultText(currencyFrom);
      const instrumentFrom = instrumentArray[1];
      const to = instrumentArray[2];
      if(currencyFrom.toLowerCase() === to.toLowerCase()){
        setPrice(1)
      }
      else{
        const type = instrumentArray[3];
  
        getPrice(type, currencyFrom, to)
      }
      setInstrumentText(`${instrumentFrom}${to}`);
      setCurrencyText(`${currencyFrom}${to}`)
    }
  }

  const getPrice = async (type, from, to) => {
    if(type === 'crypto') {
      alphaAdvantageDB
        .get(epAlphaAdvantage.crypto, {
          params : {
            symbol: from,
            market: to
        }})
        .then((res) => {
          if(res.data['Error Message']){
            setPrice('-E-')
          }
          else {
            const results = res.data['Time Series Crypto (5min)'];
            setPrice(results[Object.keys(results).sort().pop()]["4. close"]);
          }
        })
        .catch((ex) => {
          setPromiseStatus(`Error al cargar datos: ${ex}`);
        });
    } 
    else {
      alphaAdvantageDB
        .get(epAlphaAdvantage.forex, { 
          params: {
            from_currency: from,
            to_currency: to
          }})
        .then((res) => {
          if(res.data['Error Message']){
            console.log('data', res.data)
            setPrice('-E-')
          }
          else {
            setPrice(res.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
          }
        })
        .catch((ex) => {
          setPromiseStatus(`Error al cargar datos: ${ex}`);
        });
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const calculate = () => {
    const _risk = parseFloat(accountSize*(risk/100));
    setRiskMoney(_risk);
    const _units = parseFloat((_risk/(stopLostPips*pipSize))*price);
    setUnits(_units);
    const _lots = parseFloat(_units / contractSize).toFixed(3);
    setLots(_lots);
  }
  return (
    <View>
      <ContainerForm>
        <Row>
          <DropDownInfoGroup>
            <Label>Instrumento</Label>
            {
              (<DropDownPicker
                open={symbolOpen}
                value={instrumentId}
                items={symbols}
                setOpen={setSymbolOpen}
                setValue={setInstrumentId}
                setItems={setSymbols}
                searchable={true}
                onChangeValue={(obj) => setSymbolVal(obj)}
                loading={loadingSymbols}
              />)
            }
          </DropDownInfoGroup>
          <DropDownInfoGroup>
            <Label>Moneda de cambio</Label>
            <InputGroup>
              {
                (<DropDownPicker
                  open={currencyOpen}
                  value={currencyId}
                  items={currencies}
                  setOpen={setCurrencyOpen}
                  setValue={setCurrencyId}
                  setItems={setCurrencies}
                  searchable={true}
                  onChangeValue={(obj) => setCurrencyVal(obj)}
                  loading={loadingSymbols}
                />)
              }
            </InputGroup>
          </DropDownInfoGroup>
        </Row>
        <Row>
          <InputGroup>
            <Label>Saldo de la cuenta</Label>
            <Input placeholder="useless placeholder" keyboardType="numeric" onChangeText={(text) => setAccountSize(Number(text))} />
          </InputGroup>
          <InfoGroup>
            <Label>Precio ({currencyText})</Label>
            <Input placeholder="useless placeholder" keyboardType="numeric" value={price} onChangeText={(text) => setPrice(Number(text))} />
          </InfoGroup>
        </Row>
        <Row>
          <InputGroup>
            <Label>Stop loss (en PIPs)</Label>
            <Input placeholder="useless placeholder" keyboardType="numeric" onChangeText={(text) => setStopLostPips(Number(text))} />
          </InputGroup>
          <InputGroup>
            <Label>Tamaño del contrato</Label>
            <Input placeholder="useless placeholder" keyboardType="numeric" onChangeText={(text) => setContractSize(Number(text))} />
          </InputGroup>
        </Row>
        <Row>

        </Row>
        <Row>
          <InputGroup>
            <Label>Tamaño de PIP ({instrumentText})</Label>
            <Input placeholder="useless placeholder" keyboardType="numeric" onChangeText={(text) => setPipSize(Number(text))} />
          </InputGroup>
          <InputGroup>
            <Label>Riesgo (%)</Label>
            <Input placeholder="useless placeholder" keyboardType="numeric" onChangeText={(text) => setRisk(text)} />
          </InputGroup>
        </Row>
      </ContainerForm>
      <ContainerForm>
        <Row>
          <Button title="Calcular" onPress={calculate} />
        </Row>
      </ContainerForm>
      <CardContainer>
        <Row>
          <InfoGroup>
            <TextInfoLabel>Lotes</TextInfoLabel>
          </InfoGroup>
          <InfoGroup>
            <TextInfo>{lots}</TextInfo>
          </InfoGroup>
        </Row>
        <Row>
          <InfoGroup>
            <TextInfoLabel>Unidades</TextInfoLabel>
          </InfoGroup>
          <InfoGroup>            
            <TextInfo>{units}</TextInfo>
          </InfoGroup>
        </Row>
        <Row>
          <InfoGroup>
            <TextInfoLabel>Dinero en riesgo</TextInfoLabel>
          </InfoGroup>
          <InfoGroup>
            <TextInfo>{`${riskMoney} ${currencyResultText}`}</TextInfo>
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

const TextInfoLabel = styled.Text`
  font-weight: 600;
  color: #fff;
  font-size: 19px;
`;

const TextInfo = styled.Text`
  font-weight: 600;
  font-size: 19px;
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

const DropDownInfoGroup = styled.View`
  width: 45%;
  margin: 2%;
`;

const InfoGroup = styled.View`
  width: 45%;
  margin-horizontal: 2%;
`;
