import React, { useMemo } from "react";
import { KeyboardAvoidingView, Platform, Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FlashcardsListItem from "./FlashcardsListComponents/FlashcardsListItem";


function FlashcardsListScreen({pageSwitcher, range}: any) {

  if(range === 'all') {
    //TODO:getting from database values of all flashcards
  }
  else if(range === 'my') {
    //TODO:getting from database values of current user flashcards
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.header}>Fiszki</Text>
      <ScrollView style={{width: '100%'}}>
        <View style={styles.optionsContainer}>
          <FlashcardsListItem pageSwitcher={pageSwitcher} flashcardsID={1} title="Dupa"/>
          <FlashcardsListItem pageSwitcher={pageSwitcher} flashcardsID={1} title="Dupa"/>
          <FlashcardsListItem pageSwitcher={pageSwitcher} flashcardsID={1} title="Dupa"/>
          <FlashcardsListItem pageSwitcher={pageSwitcher} flashcardsID={1} title="Dupa"/>
          <FlashcardsListItem pageSwitcher={pageSwitcher} flashcardsID={1} title="Dupa"/>
          <FlashcardsListItem pageSwitcher={pageSwitcher} flashcardsID={1} title="Dupa"/>
          <FlashcardsListItem pageSwitcher={pageSwitcher} flashcardsID={1} title="Dupa"/>
          <FlashcardsListItem pageSwitcher={pageSwitcher} flashcardsID={1} title="Dupa"/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
      width:'100%',
      height: '100%',
  },
  header: {
    width: '100%',
    color:'#c085ff',
    fontSize: 26,
    fontWeight:'900',
    textAlign: 'center',
    padding: 10
  },
  optionsContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})


export default FlashcardsListScreen;