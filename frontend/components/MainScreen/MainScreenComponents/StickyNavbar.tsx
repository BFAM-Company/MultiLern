import React, { useContext } from 'react';
import { Animated } from 'react-native';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import NotificationDot from './NotificationDot';
import { UserDataContext } from '../../context/UserContext/UserContext';

interface StickyNavbarProps{
    userModalHandler: ()=>void
    notificationModalHandler: ()=>void
}


function StickyNavbar({userModalHandler, notificationModalHandler}: StickyNavbarProps) {
    const userContext = useContext(UserDataContext)

  return (
    <Animated.View
        style={styles.mainContainer}
    >
        <View style={[styles.shadowContainer, styles.shadow]}>
        <TouchableOpacity
            style={[styles.button, styles.shadow]}
            onPress={userModalHandler}
            testID='userModalButton'
        >
            <Image
                source={userContext?.userData?.avatar}
                style={[styles.image]}
                />
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={notificationModalHandler}
            testID='notificationModalButton'
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
            height: 0,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 20,
    },
    image:{
        width:50,
        height:50,
        borderRadius: 100
    },
    bellIcon:{
        width:30,
        height:30,
    },
})


export default StickyNavbar;