import axios from 'axios';
import {FINNHUB_KEY} from '@env'

const finnhubDB = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: FINNHUB_KEY,
  },
});

export default finnhubDB;

export const endpoints = {
  events: "/calendar/economic", //&from=date&to=date
}
