import axios from 'axios';

const worthDB = axios.create({
    baseURL: 'http://10.0.2.2:3000'
})
export default worthDB;

export const endpoints = {
    getAllSymbols: "/symbols",
    getAllActiveSymbols: "/symbols/active",
    getAllUsers: "/users",
    getAllCurrencies: "/currencies",
}