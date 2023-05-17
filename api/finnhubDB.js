import axios from 'axios';
import {FINNHUB_KEY, FINNHUB_SANDBOX_KEY} from '@env'

const finnhubDB = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
});

export default finnhubDB;

export const endpoints = {
  events: (from, to) => { return `/calendar/economic?from=${from}&to=${to}&token=${FINNHUB_KEY ?? FINNHUB_SANDBOX_KEY}` }, //&from=date&to=date
  symbols: `/forex/symbol?exchange=oanda&token=${FINNHUB_KEY || FINNHUB_SANDBOX_KEY}`,
}
