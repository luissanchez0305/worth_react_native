import AsyncStorage from "@react-native-async-storage/async-storage";
import finnhubDB, { endpoints as epFinnhub } from "../api/finnhubDB";
import {FINNHUB_KEY} from '@env'
import { useEffect, useRef } from "react";
import Toast from "react-native-root-toast";
import { Platform, ToastAndroid } from "react-native";

export const getEvents = async (date) => {
    const finnhubRes = await finnhubDB
      .get(epFinnhub.events(FINNHUB_KEY, date, date))
      .catch((ex) => {
        throw `Error al traer eventos: ${ex}`
      });
    return finnhubRes.data["economicCalendar"];
  }

export const getTodayDateString = () => {
    const today = new Date();
    const _today = getDateFormat(today);
    return _today;
}

export const getDateFormat = (date) => {      
    var dd = String(date.getUTCDate()).padStart(2, '0');
    var mm = String(date.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getUTCFullYear();

    return `${yyyy}-${mm}-${dd}`;
}

export const getRandomNumber = (from, to) => {
    return (Math.floor(Math.random() * (to - from + 1)) + from).toString()
}

export const getDateFormatComplete = (date) => {
    const _dateObj = new Date(date);
    const _date = getDateFormat(_dateObj);
    var hh = String(_dateObj.getHours());
    var mm = String(_dateObj.getMinutes()).padStart(2, '0');

    return `${_date} ${hh}:${mm}`;
}

export const formatCurrencyDecimals = (val) => 
    val ? Number(val).toFixed(2) : '';

export const cleanPrice = (data) => {
    try {
        if(data.ticker && data.results){
            const change = parseFloat((1 - data.results[0].c / data.results[0].o)*100).toFixed(2);
            return {
                title: String(data.ticker).replace('C:',''),
                price: Number(parseFloat(data.results[0].c).toFixed(4)),
                change: Math.abs(change),
                isGain: (data.results[0].c - data.results[0].o) > 0,
            }
        }
        else {
            if(data.closingTrades.length === 0 || data.openTrades.length === 0){
                return {
                    title: String(data.symbol).replace('-',''),
                    price: 0,
                    change: 0,
                    isGain: false,
                }
            }
            const change = parseFloat((1 - data.closingTrades[0].p / data.openTrades[0].p)*100).toFixed(2);
            return {
                title: String(data.symbol).replace('-',''),
                price: data.closingTrades[0].p,
                change: Math.abs(change),
                isGain: (data.closingTrades[0].p - data.openTrades[0].p) > 0,
            }
        }
    }
    catch(e){
        console.log(e);
    }
}

export const cleanVideo  = (data) => {
    const snippet = data['snippet']
    const imageUrl = snippet.thumbnails.medium.url;
    
    return {
        image: imageUrl,
        title: snippet.title,
        videoId: data.id.videoId,
        description: snippet.description,
        tag: "#tag #tag",
        channel: "Canal Youtube",
    }
}

export const getStorageItem = async (data) => {
    let value = await AsyncStorage.getItem(data);
    return value
}

export const removeUserTokenStorage = async () => {
    await AsyncStorage.removeItem('@worthapp');
}

export const useComponentDidMount = handler => {
    return useEffect(() => handler(), []);
};
  
export const useComponentDidUpdate = (handler, deps) => {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
        isInitialMount.current = false;

        return;
        }

        return handler();
    }, deps);
};

export const useComponentWillUnmount = handler => {
    return useEffect(() => handler, []);
};

export const raiseToast = (message) => {
    if (Platform.OS === "ios") {
        Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
      } else {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
      }
}