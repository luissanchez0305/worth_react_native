import React from 'react'
import { Animated, StyleSheet, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

export const GradientBackground = ({children, start, end}) => {
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
