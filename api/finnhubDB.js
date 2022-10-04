import axios from 'axios';
import {FINNHUB_KEY} from '@env'

const finnhubDB = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
});

export default finnhubDB;

export const endpoints = {
  events: (token, from, to) => { return `/calendar/economic?from=${from}&to=${to}&token=${token}` }, //&from=date&to=date
}
