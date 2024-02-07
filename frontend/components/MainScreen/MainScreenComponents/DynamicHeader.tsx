import React from 'react';
import { Animated } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import SearchBar from '../../SearchBar/SearchBar';

function DynamicHeader({pageSwitcher}: any) {
  return (
    <Animated.View 
        style={styles.fixedContainer}
    >
            <View style={styles.LogoContainer}>
                <Image source={require('./../../../assets/multilern-logo.png')} style={styles.LogoImage}/>
                <Text style={styles.titleText}>MultiLern</Text>
            </View>
            <SearchBar pageSwitcher={pageSwitcher}/>            
    </Animated.View>
  );
}

const styles = StyleSheet.create({
    fixedContainer:{
        width:'100%',
        height:350,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        top:0,
        left:0,
    },
    LogoContainer:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    titleText:{
        fontSize:30,
        color:'rgb(33,33,43)',
        fontWeight:'600',
        margin:10
    },
    LogoImage:{
        width:30,
        height:30,
    },

})


export default DynamicHeader;