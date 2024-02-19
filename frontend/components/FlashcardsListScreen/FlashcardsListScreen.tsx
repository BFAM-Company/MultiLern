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
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.mainContainer, {flex:1}]}
      >
      <SafeAreaView>
        <ScrollView style={{width: '100%'}}>
          <FlashcardsListItem buttonAction={pageSwitcher} title="Dupa"/>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
      width:'100%',
      height:'100%',
      backgroundColor: 'white'
  },
})


export default FlashcardsListScreen;