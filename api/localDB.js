import axios from 'axios';
import { Platform } from 'react-native';

const worthDB = axios.create({
    baseURL: Platform.OS == "ios" ? 'http://localhost:3001' : 'http://192.168.1.111:3000'
})
export default worthDB;

export const endpoints = {
    getAllSymbols: "/symbols",
    getAllActiveSymbols: "/symbols/active",
    getAllUsers: "/users",
    getAllCurrencies: "/currencies",
    createNewUser: "/users",
    login: "/auth/login",
    getAllSignals: "/signals",
}