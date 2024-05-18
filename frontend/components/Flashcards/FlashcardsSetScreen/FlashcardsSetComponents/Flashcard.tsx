import { LinearGradient } from 'expo-linear-gradient';
import React, { Dispatch, Fragment, SetStateAction, useCallback, useEffect, useState } from 'react'
import {Animated as ReactNativeAnimated, Dimensions, StyleSheet, Text, TouchableOpacity, View, Animated, Easing} from 'react-native'
import Choice from './Choice';
import { shadow } from 'react-native-paper';

interface FlashcardProps {
  testID: string,
  foreignTranslation: string,
  polishTranslation: string,
  isFirst: boolean,
  swipe: ReactNativeAnimated.ValueXY
  titlSign: ReactNativeAnimated.Value,
  flashcardRotationValue: Animated.Value,
}


function Flashcard({testID, foreignTranslation, polishTranslation, isFirst, swipe, titlSign,flashcardRotationValue ,...rest }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(flashcardRotationValue);

  useEffect(() => {
      setAnimatedValue(flashcardRotationValue);
      setIsFlipped(false)
  }, [flashcardRotationValue]);


  const flipCard = () => {
    setIsFlipped(!isFlipped);
    Animated.timing(animatedValue, {
      toValue: isFlipped ? 0 : 180,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };


  const rotate = ReactNativeAnimated.multiply(swipe.x,titlSign).interpolate({
    inputRange: [-100,0,100],
    outputRange: ['8deg', '0deg', '-8deg']
  });

  const animatedCardStyle = {
      transform: [...swipe.getTranslateTransform(), { rotate }],

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
            <ReactNativeAnimated.View
            style={[
              styles.choiceContainer, 
              styles.likeContainer,
              { opacity: likeOpacity }
              ]}>
              <Choice type="umiem" />
            </ReactNativeAnimated.View>
            <ReactNativeAnimated.View 
              style={[
                  styles.choiceContainer, 
                  styles.nopeContainer,
              { opacity: nopeOpacity }
                  ]}>
              <Choice type="ćwiczę" />
            </ReactNativeAnimated.View>
        </Fragment>
      )
  },[likeOpacity, nopeOpacity])

  return (
      <Animated.View
        testID={testID}
          style={[
            styles.container,
            isFirst && animatedCardStyle,
            ]} {...rest}>
          <TouchableOpacity activeOpacity={1} onPress={flipCard} style={{flex: 1, width: '100%'}}>
            <Animated.View style={[styles.card, frontAnimatedStyle]}>
              <LinearGradient
                colors={['#c691ff', '#60388a']}
                style={styles.gradient}
              >
                <Text style={styles.flashcardText}>{foreignTranslation}</Text>
              </LinearGradient>
            </Animated.View>
            <Animated.View style={[styles.card, backAnimatedStyle]}>
              <LinearGradient
                colors={['#c691ff', '#60388a']}
                style={styles.gradient}
              >
                <Text style={styles.flashcardText}>{polishTranslation}</Text>
              </LinearGradient>
            </Animated.View>
            
          </TouchableOpacity>
          
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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 0,
        },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
    
      elevation: 16,
  },
  gradient: {
      flex: 1,
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
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    height: '100%',
    width: '100%',
    flex: 1
  }
})
export default Flashcard