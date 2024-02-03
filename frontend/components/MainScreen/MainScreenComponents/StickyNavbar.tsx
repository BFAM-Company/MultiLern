import React from 'react';
import { Animated, Dimensions } from 'react-native';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Image, TouchableOpacity, Platform } from 'react-native';
import NotificationDot from './NotificationDot';




function StickyNavbar({pageSwitcher}: any) {
  return (
    <Animated.View
        style={styles.mainContainer}
    >
        <View style={[styles.shadowContainer, styles.shadow]}>
        <TouchableOpacity
            style={[styles.button, styles.shadow]}
        >
            <Image
                source={require('./../../../assets/demo-user-icon.png')}
                style={[styles.image]}
                />
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
        >
            <Image
                source={require('./../../../assets/notification-icon.png')}
                style={styles.bellIcon}
                />
            <NotificationDot dotColor={'#07fa40'}/>
        </TouchableOpacity>
        </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
    mainContainer:{
        position:'absolute',
        top:0,
        left:0,
        zIndex:10000,
        width:'100%',
        height:170,
        //marginTop:50,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        overflow:'hidden',
        paddingTop:-5,
    },
    shadowContainer:{
        width:'100%',
        height:120,
        paddingTop:30,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:20,
        backgroundColor:'#fff',
    },
    button:{
        width:'auto',
        height:'auto',
        borderRadius:100,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 150,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 20,
    },
    image:{
        width:50,
        height:50,
        //tintColor:'rgb(33,33,43)',
    },
    bellIcon:{
        width:30,
        height:30,
    },
})


export default StickyNavbar;