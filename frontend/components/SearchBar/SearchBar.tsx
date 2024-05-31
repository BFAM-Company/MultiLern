import React, { useEffect, useState } from 'react';
import { Pressable, TextInput, TouchableOpacity } from 'react-native';
import { View, StyleSheet, Image } from 'react-native';
import Button from '../Button/Button';

function SearchBar({currentText, pageSwitcher, setModalVisibility, modalVisibility}: any) {
  const [searchedText, setSearchedText] = useState<string>('')

  useEffect(()=>{
    setSearchedText(currentText)
  }, [currentText])
  return (
    <View style={styles.mainContainer}>
        <TextInput
            testID='searchExercise'
            style={styles.TextInput}
            placeholder='wyszukaj zadania...'
						defaultValue={searchedText}
						onChangeText={newText => setSearchedText(newText)}
        />
        <View style={styles.iconContainer}>
            <TouchableOpacity testID='search-icon' onPress={() => { if(modalVisibility) {setModalVisibility(false)};pageSwitcher('Excercises', {searchableText: searchedText})}}>
                <Image 
                    source={require('./../../assets/search-icon.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer:{
        width:'80%',
        height:50,
        maxWidth:700,
        minWidth:300,
        display:'flex',
        flexDirection:'row',
        backgroundColor:'rgb(33,33,43)',
        borderRadius:100,
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
    iconContainer:{
        width:'20%',
        height:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgb(33,33,43)',
        borderTopRightRadius:20,
        borderBottomRightRadius:20,

    },
    icon:{
        width:20,
        height:20,
        tintColor:'#fff'
    },
    TextInput:{
        width:'80%',
        height:'100%',
        backgroundColor:'#fff',
        paddingLeft:10,
        borderRadius:20,
    },
    // button: {
    //     backgroundColor: 'none',
    //     color: 'inherit',
    //     // border: 'none',
    //     elevation: 0,
    //     borderRadius: 0,
    //     padding: 0,
    //     // font: 'inherit',
    // }
})


export default SearchBar;