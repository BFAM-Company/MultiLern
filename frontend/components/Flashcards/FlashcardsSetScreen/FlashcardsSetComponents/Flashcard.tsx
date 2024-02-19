import { LinearGradient } from 'expo-linear-gradient';
import React, { Fragment, useCallback, useState } from 'react'
import {Animated, Dimensions, StyleSheet, Text, Easing, Touchable, TouchableOpacity, Pressable } from 'react-native'
import Choice from './Choice';

interface FlashcardProps {
  foreignTranslation: string,
  polishTranslation: string,
  isFirst: boolean,
  swipe: Animated.ValueXY
  titlSign: Animated.Value
}
const { width , height } = Dimensions.get("screen");


function Flashcard({ foreignTranslation, polishTranslation, isFirst, swipe, titlSign, ...rest }: FlashcardProps) {
  ////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////      Tinder Swaping    /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  const rotate = Animated.multiply(swipe.x,titlSign).interpolate({
    inputRange: [-100,0,100],
    outputRange: ['8deg', '0deg', '-8deg']
  });

  const animatedCardStyle = {
      transform: [...swipe.getTranslateTransform(), { rotate }]
  }

  const likeOpacity = swipe.x.interpolate({
      inputRange: [25, 100],
      outputRange: [0,1],
      extrapolate: 'clamp'
  });

  const nopeOpacity = swipe.x.interpolate({
      inputRange: [-100, -25],
      outputRange: [1,0],
      extrapolate: 'clamp'
  });

  const renderChoice = useCallback(()=>{
      return (
        <Fragment>
            <Animated.View
            style={[
              styles.choiceContainer, 
              styles.likeContainer,
              { opacity: likeOpacity }
              ]}>
              <Choice type="umiem" />
            </Animated.View>
            <Animated.View 
              style={[
                  styles.choiceContainer, 
                  styles.nopeContainer,
              { opacity: nopeOpacity }
                  ]}>
              <Choice type="ćwiczę" />
            </Animated.View>
        </Fragment>
      )
  },[likeOpacity, nopeOpacity])

  return (
      <Animated.View style={[
          styles.container,
          isFirst && animatedCardStyle
          ]} {...rest}>
          <LinearGradient
            colors={['#c691ff', '#60388a']}
            style={styles.gradient}
          >
          </LinearGradient>
          {isFirst && renderChoice()}
      </Animated.View>

  )
}

const styles = StyleSheet.create({
  container:{
      position: "absolute",
      width: '90%',
      height: '90%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: {
              width: 0,
              height: 0,
              // height: -100,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
  
      elevation: 16,
  },
  gradient: {
      width: '100%',
      height: '100%',
      borderRadius:  20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  },
  choiceContainer: {
     position: 'absolute',
     top: 100
  },
  likeContainer:{
    left: 45,
    transform: [{ rotate: '-30deg' }]
  },
  nopeContainer:{
    right: 45,
    transform: [{ rotate: '30deg' }]
  },
  flashcardText: {
    width: '100%',
    color:'white',
    fontSize: 26,
    fontWeight:'900',
    textAlign: 'center',
    padding: 10,
  }
})
export default Flashcard