import axios from 'axios';
import { Platform } from 'react-native';
import { IOS_API_URL, ANDROID_API_URL } from '@env';

const worthDB = axios.create({
    baseURL: Platform.OS == "android" ? ANDROID_API_URL : IOS_API_URL
})
export default worthDB;

export const endpoints = {
    getAllSymbols: "/symbols",
    getAllActiveSymbols: "/symbols/active",
    getAllUsers: "/users",
    getUser: (email) => { return `/users/email/${email}` }, //&email=
    getAllCurrencies: "/currencies",
    createNewUser: "/users",
    login: "/auth/login",
    getAllSignals: "/signals",
    sendEmailCode: "/messages/email-code-validate", //&email=
    sendSMSCode: "/messages/sms-code-validate", //&email=
    getSymbolPrice: (symbol) => { return `/websocket/price/${symbol}` },
    getSignalLogs: (signalId) => { return `/signal_logs/signal/${signalId}` }
}