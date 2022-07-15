import React from 'react';
import PropTypes from "prop-types";
import {scaleTime} from "d3-scale";
import {ChartCanvas, Chart} from "react-stockcharts";
import {CandleStickSeries} from "react-stockcharts/lib/series";
import {XAxis, YAxis} from "react-stockcharts/lib/axes";
import {utcDay} from "d3-time-format";
import {fitWidth} from "react-stockcharts/lib/helper";
import {timeIntervalBarWidth} from "react-stockcharts/lib/utils";
import { SafeAreaView } from 'react-native';

const TradingChart = (props) => {
    const {type,width,ratio,data} = props
  return (
    <SafeAreaView>
        <ChartCanvas
            height={400}
            width={width}
            margin={{left: 50, right: 50, top: 10, bottom: 30}}
            type={type}
            data={data}
            seriesName="MSFT"
            xAccesor={d => d.date}
            xScale={scaleTime()}
            xExtents={[new Date(2020,0,30), new Date(202,1,16)]}>
                <Chart
                    id={1}
                    yExtents={(d => [d.high,d.low])}
                >
                    <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
                    <YAxis axisAt="left" orient="left" ticks={5} />
                    <CandleStickSeries width={timeIntervalBarWidth(utcDay)} />
                </Chart>
        </ChartCanvas>
    </SafeAreaView>
  )
}
TradingChart.prototype = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

TradingChart.defaultProps = {
    type: "svg",
}

// TradingChart = fitWidth(TradingChart);
export default TradingChart;
