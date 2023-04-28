import axios from 'axios';

const finnhubDB = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
});

export default finnhubDB;

export const endpoints = {
  events: (token, from, to) => { return `/calendar/economic?from=${from}&to=${to}&token=${token}` }, //&from=date&to=date
  symbols: (token) => `/forex/symbol?exchange=oanda&token=${token}`,
}
