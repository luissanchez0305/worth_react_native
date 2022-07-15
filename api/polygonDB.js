import axios from 'axios';

const polygonDB = axios.create({
  baseURL: 'https://api.polygon.io',
  params: {
    apiKey: 'ixzl1O8HlkWh_c_qSRpSyYLr1aTX6pZV',
  },
});

export default polygonDB;

export const endpoints = {
  ticker: "/v2/aggs/ticker",
  openCloseCrypto: "/v1/open-close/crypto",
}
