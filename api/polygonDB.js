import axios from 'axios';
import { POLYGON_KEY } from '@env';

const polygonDB = axios.create({
  baseURL: 'https://api.polygon.io',
  params: {
    apiKey: POLYGON_KEY,
  },
});

export default polygonDB;

export const endpoints = {
  ticker: "/v2/aggs/ticker",
  openCloseCrypto: "/v1/open-close/crypto",
}
