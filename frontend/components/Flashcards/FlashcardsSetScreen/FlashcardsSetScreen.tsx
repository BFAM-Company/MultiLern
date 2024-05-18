import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Platform, Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Animated, PanResponder, Dimensions, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Flashcard from "./FlashcardsSetComponents/Flashcard";
import { AxiosContext } from "../../context/AxiosProvider/AxiosProvider";

interface FlashcardSetProps {
  id: number,
  title: string,
  fiches_translations: {
    translations: {
      id: number,
      foreignTranslation: string,
      polishTranslation: string,
    }
  }[]
}

function FlashcardsSetScreen({pageSwitcher, id}: any) {
  const { width, height } = Dimensions.get("screen");
  const [flashcardRotationValue, setFlashcardRotationValue] = useState(new Animated.Value(0));
  const [flashcards,setFlashcards] = useState<FlashcardSetProps | undefined>(undefined);
  const [learnedCounter, setLearnedCounter] = useState(0)
  const [modalVisibility, setModalVisibility] = useState(false)

  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;

  const {publicAxios} = useContext(AxiosContext);

  useEffect(() => {
    const getFicheSet = async() => {
      try {
        setFlashcards((await publicAxios.get(`/fiches/id/${id}`)).data)
        setModalVisibility(false)
      }catch(e: any) {
        console.error(e.message)
      }
    }
    getFicheSet()
  }, [])

  useEffect(()=>{
    if(flashcards?.fiches_translations.length === 0){
      setLearnedCounter(0)
      setModalVisibility(true)
    }
  },[flashcards?.fiches_translations.length])

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: ()=>true,

    onPanResponderMove: (_, {dx, dy, y0})=>{
      swipe.setValue({x: dx, y: dy});
      titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1)
    },

    onPanResponderRelease: (_, { dx, dy })=>{
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;
      if(isActionActive){
        setFlashcardRotationValue(new Animated.Value(0))
        Animated.timing(swipe, {
          duration: 100,
          toValue: {
            x: direction * 500,
            y: dy
          },
          useNativeDriver: true
        }).start(() => {
          if(direction === 1)
            removeTopCard();
          else
            addCardUnderneath()
        });
      }else{
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

  const removeTopCard = useCallback(()=>{
    setFlashcards((prevState) => {
      if (prevState) {
        const newState: FlashcardSetProps = {
          ...prevState,
          fiches_translations: prevState.fiches_translations.slice(1)
        };
        return newState;
      }
      return prevState;
    });
    setLearnedCounter((prevState) => prevState + 1);
    swipe.setValue({ x: 0, y: 0 });
  },[swipe]);

  const addCardUnderneath = useCallback(()=>{
    setFlashcards((prevState) => {
      if (prevState) {
        const stillLearningFlashcard = prevState.fiches_translations[0];
        prevState.fiches_translations.shift()
        const newState: FlashcardSetProps = {
          ...prevState,
          fiches_translations: [...prevState.fiches_translations, stillLearningFlashcard]
        };
        return newState;
      }
      return prevState;
    });
    swipe.setValue({ x: 0, y: 0 });
  },[swipe]);

  return (
    <>
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisibility}
      onRequestClose={() => {
        setModalVisibility(!modalVisibility)
      }}
    >
      <TouchableOpacity
      style={{
          width: '100%',
          height: '100%',
          //@ts-ignore
          cursor: 'default'
        }}
        onPress={() => {setModalVisibility(false); pageSwitcher('FlashcardsList', {range: 'all'})}}
        activeOpacity={1}
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,}}
        >
          <View style={{
            margin: 20,
            height: '20%',
            width: '95%',
            backgroundColor: "white",
            borderRadius: 20,
            padding: 25,
            alignItems: "center",
            justifyContent: 'center',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            flexDirection: 'row'
          }}>
            <Text style={{fontSize: 32, textAlign: 'center', width: '7.5%'}}>🎉</Text>
            <Text style={{fontSize: 22, textAlign: 'center', width: '85%'}}>Nauczyłeś się juz wszystkiego! Zacznij teraz od nowa!</Text>
            <Text style={{fontSize: 32, textAlign: 'center', width: '7.5%'}}>🎉</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.header}>FISZKI</Text>
      <View style={styles.flashcardsContainer} testID="flashcards-container">
       {
        flashcards?.fiches_translations.map((item, index )=> {
          const isFirst = index == 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};

          return (
           <Flashcard
             testID={`swipeable-flashcard`}
             key={index}
             foreignTranslation={item.translations.foreignTranslation}
             polishTranslation={item.translations.polishTranslation}
             isFirst={isFirst}
             swipe={swipe}
             titlSign={titlSign}
             flashcardRotationValue={flashcardRotationValue}
             {...dragHandlers}
           />
          )
        }).reverse()
       }
      </View>
      <View style={styles.counterContainer}>
        <View style={styles.counterInfoContainer}>
          <View style={[styles.numberContainer, {backgroundColor: '#FFB200'}]}>
            <Text style={styles.stillLearningNumber}>{flashcards?.fiches_translations.length}</Text>
          </View>
          <Text style={[styles.text, {left: -15, paddingLeft: 16, borderColor: '#FFB200'}]}>Nadal się ucze</Text>
        </View>
        <View style={styles.counterInfoContainer}>
          <Text style={[styles.text, {right: -15, paddingRight: 16, borderColor: '#89F58E'}]}>Juz umiem</Text>
          <View style={[styles.numberContainer, {backgroundColor: '#89F58E'}]}>
            <Text style={styles.stillLearningNumber}>{learnedCounter}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
    </>
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
  },
  header: {
    width: '100%',
    color:'#c085ff',
    fontSize: 36,
    fontWeight:'900',
    textAlign: 'center',
    padding: 10,
  },
  counterContainer: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 0,
        },
      shadowOpacity: 0.44,
      shadowRadius: 5.32,
  },
  counterInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'red',
  },
   numberContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'red'
  },
  stillLearningNumber: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 20,    
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    
    position: 'relative',
  }
})


export default FlashcardsSetScreen