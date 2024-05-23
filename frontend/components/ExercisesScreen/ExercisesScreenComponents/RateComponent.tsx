import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import YellowStar from './YellowStar';


interface RateComponentProps {
  rate: number
}

function RateComponent({rate}: RateComponentProps) {
  const [currentRates, setCurrentRates] = useState<number[]>([0,0,0,0,0])
   
  const calcStars = (rating: number) =>{
    let rates = [0,0,0,0,0]
  
    for(let i = 0; i<rates.length; i++){
      if(rating >= (i+1)){
          rates[i] = 1
      }
      else{
          rates[i] = rating%1;
          break;
      }
    }
    setCurrentRates(rates)
  }
  const userRateEvent = async(value: number) =>{
    //tu dodac fetcha i inne
    calcStars(value)
  }

  useEffect(()=>{
    calcStars(rate)
  },[])
  

  return (
    <View
        style={styles.container}
    >
        <YellowStar rate={currentRates[0]} handlePress={()=>userRateEvent(1)}/>
        <YellowStar rate={currentRates[1]} handlePress={()=>userRateEvent(2)}/>
        <YellowStar rate={currentRates[2]} handlePress={()=>userRateEvent(3)}/>
        <YellowStar rate={currentRates[3]} handlePress={()=>userRateEvent(4)}/>
        <YellowStar rate={currentRates[4]} handlePress={()=>userRateEvent(5)}/>
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