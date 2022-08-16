import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { View, Text } from "react-native";
import React, { useEffect } from "react";
import HeadSection from "./HeadSection";
import { TRADINGVIEW_URL } from '@env';

function ContainerView() {
    useEffect(() => {});

    const INJECTED_JAVASCRIPT = `
    tvWidget.onChartReady(function() {
        tvWidget.chart().onIntervalChanged().subscribe(
            null,
            function(interval) {
                const response = { type: "onIntervalChanged", interval: interval }
                //window.ReactNativeWebView.postMessage accepts one argument, data, 
                //which will be available on the event object, event.nativeEvent.data. data must be a string.
                window.ReactNativeWebView.postMessage(JSON.stringify(response));
            }
        );
    });
    true; // note: this is required, or you'll sometimes get silent failures 
          // (https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md)
  `;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <HeadSection
                    icon={headSection.tradingview.icon}
                    title={headSection.tradingview.title}
                />
            </View>
            <WebView
                style={{
                    backgroundColor: "white",
                    flex: 1
                }}
            //   onLoadProgress={({ nativeEvent }) => console.log(nativeEvent)}
                source={{uri: TRADINGVIEW_URL}}
            //   onLoadEnd={(e) => console.log(e)}r
                injectedJavaScript={INJECTED_JAVASCRIPT}
                javaScriptEnabled={true}
                onMessage={({ nativeEvent }) => console.log(nativeEvent.data)}
            />
        </SafeAreaView>
    );
}

const headSection = {
    tradingview: {
        title: "Trading View",
        icon: require("../assets/headIcons/charts.png"),
    },
};

export default ContainerView;
