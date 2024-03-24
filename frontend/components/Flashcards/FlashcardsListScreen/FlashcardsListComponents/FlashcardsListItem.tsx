import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { Dimensions, Image, Platform, StyleProp, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


interface FlashcardsListItemProps {
  pageSwitcher: any
  flashcardsID: number,
  title: string
}

function FlashcardsListItem({flashcardsID, title, pageSwitcher}: FlashcardsListItemProps) {

  return (
    <TouchableOpacity
        onPress={()=>{pageSwitcher('FlashcardsSet', {id: flashcardsID})}}
        style={styles.cardContainer}
    >
        <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}




const styles = StyleSheet.create({
  cardContainer:{
    margin:10,
    width:'90%',
    borderRadius:20,
    padding:20,
    backgroundColor:'#fff',
    shadowColor: "#000",
    shadowOffset: {
            width: 0,
            height: 0,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  title:{
    fontSize: 24,
    fontWeight:'900',
    color:'#c085ff',
  },
})

export default FlashcardsListItem;