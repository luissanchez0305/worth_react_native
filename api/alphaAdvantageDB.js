import axios from 'axios';
import {ALPHAADVANTAGE_KEY} from '@env'

const alphaAdvantageDB = axios.create({
  baseURL: 'https://www.alphavantage.co/query',
  params: {
    apikey: ALPHAADVANTAGE_KEY,
  },
});

export default alphaAdvantageDB;

export const endpoints = {
  crypto: "?function=CRYPTO_INTRADAY&interval=5min", //&symbol=ETH&market=USD
  forex: "?function=CURRENCY_EXCHANGE_RATE", //&from_currency=EUR&to_currency=USD
}
