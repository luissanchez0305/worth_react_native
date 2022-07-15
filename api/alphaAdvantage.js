import axios from 'axios';

const alphaAdvantageDB = axios.create({
  baseURL: 'https://www.alphavantage.co/query',
  params: {
    apikey: 'YTKNHWWPRX3K6Q1S',
  },
});

export default alphaAdvantageDB;

export const endpoints = {
  crypto: "?function=CRYPTO_INTRADAY&interval=5min", //&symbol=ETH&market=USD
  forex: "?function=CURRENCY_EXCHANGE_RATE", //&from_currency=EUR&to_currency=USD
}
