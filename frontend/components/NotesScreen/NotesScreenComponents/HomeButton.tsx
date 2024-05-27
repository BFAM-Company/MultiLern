import React,{useState} from 'react';
import { StyleSheet, View, Text, Image, Modal, TouchableOpacity} from 'react-native';


function HomeButton({pageSwitcher}:any) {

  return (
      <View style={styles.container}>
        <TouchableOpacity
            onPress={pageSwitcher}
        >
            <Image source={require('./../../../assets/home-icon.png')} style={{tintColor:'rgb(45,45,55)', width:30, height:30,}}/>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container:{
    position:'absolute',
    zIndex:10000000,
    top:10,
    left:10,
    right:10,
  },
})

export default HomeButton;