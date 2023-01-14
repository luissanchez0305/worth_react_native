import axios from 'axios';
import { Platform } from 'react-native';
import { IOS_API_URL, ANDROID_API_URL, API_URL } from '@env';
import * as Device from 'expo-device';

const worthDB = axios.create({
    baseURL: Device.deviceName === 'sdk_gphone64_x86_64' ? 
    (Platform.OS == "android" ? ANDROID_API_URL : IOS_API_URL) : API_URL
})
export default worthDB;

export const endpoints = {
    getAllSymbols: "/symbols",
    getAllActiveSymbols: "/symbols/active",
    getAllUsers: "/users",
    getUserByEmail: (email) => { return `/users/email/${email}` }, //&email=
    getAllCurrencies: "/currencies",
    createNewUser: "/users",
    updateUser: (email) => { return `/users/${email}` },
    updateDeviceUser: (email) => { return `/users/device/${email}` },
    login: "/auth/login",
    getAllSignals: "/signals",
    validateEmailCode: "/messages/email-code-validate", //&email= &code=
    validateSMSCode: "/messages/sms-code-validate", //&email= &code=
    sendEmailCode: "/messages/email-code-send", //&email=
    sendSMSCode: "/messages/sms-code-send", //&email=
    getSymbolPrice: (symbol) => { return `/websocket/price/${symbol}` },
    getSignalLogs: (signalId) => { return `/signal_logs/signal/${signalId}` },
    sendDeviceData: "/orphan-device/send-device-data",
    deleteOrphanDevice: (email) => {return `/orphan-device/${email}`}
}