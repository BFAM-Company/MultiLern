import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext } from 'react'
import { Dimensions, Image, Platform, StyleProp, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IFichesSet } from '../FlashcardsListScreen';
import { FichesContext } from '../../../context/FichesContext';


interface FlashcardsListItemProps {
  pageSwitcher: any
  flashcardsID: number,
  title: string,
  setChosenFlashcardCard: React.Dispatch<React.SetStateAction<IFichesSet | undefined>>
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>
  range: 'all' | 'my'
}

function FlashcardsListItem({flashcardsID, title, pageSwitcher, setChosenFlashcardCard, setModalVisibility, range}: FlashcardsListItemProps) {
  const fichesContext = useContext(FichesContext)
  
  return (
    <TouchableOpacity
        onPress={()=>{pageSwitcher('FlashcardsSet', {id: flashcardsID})}}
        style={styles.cardContainer}
    >
        <Text style={[styles.title, {width: '80%'}]}>{title}</Text>
        <View style={styles.iconContainer}>
          {range === 'my' && 
          <>
            <TouchableOpacity onPress={() => {fichesContext?.setFichesState(flashcardsID);console.log(fichesContext?.fichesState);pageSwitcher('NewFlashcard')}}>
              <Image source={require('./../../../../assets/pen-icon.png')} style={styles.icon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setChosenFlashcardCard({id: flashcardsID, title: title}); setModalVisibility(true)}}>
              <Image source={require('./../../../../assets/trash-icon.png')} style={styles.icon}/>
            </TouchableOpacity>
          </>
        }
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title:{
    fontSize: 24,
    fontWeight:'900',
    color:'#c085ff',
  },
  icon: {
    width:25,
    height:25,
  }, 
  iconContainer: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

export default FlashcardsListItem;