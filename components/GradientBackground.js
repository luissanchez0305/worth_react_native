import React from 'react'
import { Animated, StyleSheet, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

export const GradientBackground = ({children, start={x: 0.1, y: 0.1}, end={x: 0.5, y: 0.8}}) => {
    return (
        <View style={{flex: 1}}>
          <LinearGradient
            colors={['#000', '#ababab', 'white']}
            style={{...StyleSheet.absoluteFillObject}}
            start={start}
            end={end}
          />    
          {children}
        </View>
      );
}
