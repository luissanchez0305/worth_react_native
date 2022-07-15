import React, { Component } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import HSNZ from 'react-native-hsnz-marquee'
import MarqueeItem from './MarqueeItem.js';
 
const NO_PER_SCREEN = 4;
const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / NO_PER_SCREEN;

export default class Marquee extends Component {
  constructor(props){
    super(props);
    this.end = this.end.bind(this);
    const {data} = this.props;
    this.state ={
      data,
    };
  }
  end(){
    console.log('end of play')
  }

  _renderItem = (item, index) => {
    return (
      <MarqueeItem
        title={item.title}
        price={item.price}
        change={item.change}
        isGain={item.isGain}
        itemWidth={itemWidth}
        key={index}
        style={{
          marginStart: 16,
        }}
      />
    );
  };

  getWrappedData = () => {
    const {data} = this.props;

    // const overlappingNo = this.getOverlappingNo();
    const response = [];
    response.push(...data)
    for(let i = 0; i < 5; i++){
      response.push(...response);
    }
    return {
      data: response
    };
  };

  getOverlappingNo = () => {
    const {data} = this.props;
    const {length} = data;
    let overlappingNo = 10;
    if (length < 10) {
      overlappingNo = length;
    }
    return overlappingNo;
  };
 
  render() {
    const {data} = this.getWrappedData();
    return (
      <View style={styles.container}>
        <HSNZ 
        style={{
          height:43,
          width:Math.floor(screenWidth)
        }}
        onEnd = {this.end}
        loop = {-1}
        autoPlay = {true}
        speed={20}
        >
          <View style={{
            flex: 1,
            flexDirection: "row",
            height:50,
            width:itemWidth*data.length, 
            marginLeft:10
          }}>
            {data.map((item, index)=>(
              this._renderItem(item, index)
            ))}
          </View>
        </HSNZ>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 23,
  }
});