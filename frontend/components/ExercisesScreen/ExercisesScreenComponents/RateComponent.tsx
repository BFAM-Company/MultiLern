import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import YellowStar from './YellowStar';


interface RateComponentProps {
  rate: number
}

function RateComponent({rate}: RateComponentProps) {

  let rates = [0,0,0,0,0]
  for(let i = 0; i<rates.length; i++){
    if(rate >= (i+1)){
        rates[i] = 1
    }
    else{
        rates[i] = rate%1;
        break;
    }
  }

  return (
    <View
        style={styles.container}
    >
        <YellowStar rate={rates[0]}/>
        <YellowStar rate={rates[1]}/>
        <YellowStar rate={rates[2]}/>
        <YellowStar rate={rates[3]}/>
        <YellowStar rate={rates[4]}/>
    </View>
  );
}




const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
})

export default RateComponent;