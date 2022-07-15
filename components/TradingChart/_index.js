import React from 'react'
import { Text, View } from 'react-native'

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockeChartXValues: [],
      stockeChartYValues: []
    }
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    const API_KEY = 'YTKNHWWPRX3K6Q1S'
    const API_CALL = `https://www.alphavantage.co/query?interval=60min&function=TIME_SERIES_INTRADAY
&outputsize=compact&symbol=MSFT&apikey=${API_KEY}`;
    
    const stockChartXValuesFunction = [];
    const stockChartYValuesFunction = [];

    fetch(API_CALL/* , {
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
      }
    } */)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for(var key in data['Time Series (60min)']) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(data['Time Series (60min)']
          [key]['1. open']);

        }
        
        pointerToThis.setState({
          stockeChartXValues: stockChartXValuesFunction,
          stockeChartYValues: stockChartYValuesFunction
        });
      })
  }

  render() {
    return (
      <View>
      </View>
    )
  }
}

export default index
