import React from 'react';
import { Animated, Dimensions, TextInput } from 'react-native';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Image, TouchableOpacity, Platform } from 'react-native';




function SearchBar({pageSwitcher}: any) {
  return (
    <View style={styles.mainContainer}>
        <TextInput 
            style={styles.TextInput}
            placeholder='wyszukaj zadania...'
        />
        <View style={styles.iconContainer}>
            <Image 
                source={require('./../../../assets/search-icon.png')}
                style={styles.icon}
            />
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
                height: -100,
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
    }
})


export default SearchBar;