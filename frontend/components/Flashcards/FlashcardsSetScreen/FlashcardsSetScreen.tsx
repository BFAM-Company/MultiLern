import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Platform, Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Animated, PanResponder, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Flashcard from "./FlashcardsSetComponents/Flashcard";
import { users as usersArray } from "./FlashcardsSet.mock";

function FlashcardsSetScreen({pageSwitcher, id}: any) {
  const { width, height } = Dimensions.get("screen");
  // State to hold the users data
  const [users,setUsers] = useState(usersArray);

  // Animated values for swipe and tilt
  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;

  useEffect(()=>{
    // Reset users data if the array is empty
    if(!users.length){
      setUsers(usersArray);
    }
  },[users.length])

  // PanResponder configuration
  const panResponder = PanResponder.create({
     // Allow pan responder to activate
    onMoveShouldSetPanResponder: ()=>true,

     // Handle card movement while dragging
    onPanResponderMove: (_, {dx, dy, y0})=>{
      swipe.setValue({x: dx, y: dy});
      titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1)
    },

    // Handle card release after dragging
    onPanResponderRelease: (_, { dx, dy })=>{
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;

      if(isActionActive){
        // Swipe the card off the screen
        Animated.timing(swipe, {
          duration: 100,
          toValue: {
            x: direction * 500,
            y: dy
          },
          useNativeDriver: true
        }).start(removeTopCard);

      }else{
        // Return the card to its original position
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0
          },
          useNativeDriver: true,
          friction: 5
        }).start()
      }
    }
  })

  // remove the top card from the users array
  const removeTopCard = useCallback(()=>{
    setUsers((prevState)=>prevState.slice(1));
    swipe.setValue({ x: 0, y: 0});
  },[swipe]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.header}>FISZKI</Text>
      <View style={styles.flashcardsContainer}>
       {
        users.map(({ foreignTranslation, polishTranslation  }, index )=>{
          const isFirst = index == 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};

          return (
           <Flashcard
             key={index}
             foreignTranslation={foreignTranslation}
             polishTranslation={polishTranslation}
             isFirst={isFirst}
             swipe={swipe}
             titlSign={titlSign}
             {...dragHandlers}
           />
          )
        }).reverse()
       }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
      width:'100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: 20
  },
  flashcardsContainer: {
    width:'100%',
    height: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'aqua'
  },
  header: {
    width: '100%',
    color:'#c085ff',
    fontSize: 36,
    fontWeight:'900',
    textAlign: 'center',
    padding: 10,
    // backgroundColor: 'red'
  },
})


export default FlashcardsSetScreen