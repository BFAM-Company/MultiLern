import React, { useState } from 'react'
import { Dimensions, Image, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import SearchBar from '../SearchBar/SearchBar'
function Footer({pageSwitcher}: any) {
  const [modalVisibility, setModalVisibility] = useState<boolean>(false)

  return (
    <View style={styles.footerContainer}>

        <Modal 
          deviceWidth={Dimensions.get("window").width} 
          style={styles.modal} 
          isVisible={modalVisibility} 
          onBackdropPress={() => setModalVisibility(false)}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{display: 'flex',alignItems: 'center', width: 200}}
          >
            <SearchBar modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} pageSwitcher={pageSwitcher}/>
          </KeyboardAvoidingView>
        </Modal>


        <View style={[styles.shadowContainer, styles.shadow]}>
        <TouchableOpacity style={[styles.button]}>
          <Image
              source={require('./../../assets/demo-user-icon.png')}
              style={[styles.image]}
              />
        </TouchableOpacity>
        <View style={styles.verticalLine}/>
        <TouchableOpacity testID='homeIcon' style={[styles.button]} onPress={() => pageSwitcher('Main')}>
            <Image
                source={require('./../../assets/home-icon.png')}
                style={[styles.bellIcon]}
                />
        </TouchableOpacity>
        <View style={styles.verticalLine}/>
        <TouchableOpacity style={[styles.button]}>
            <Image
                source={require('./../../assets/note-icon.png')}
                style={[styles.bellIcon]}
                />
        </TouchableOpacity>
        <View style={styles.verticalLine}/>
        <TouchableOpacity testID='bellIcon' style={[styles.button]} onPress={() => setModalVisibility(true)}>
            <Image
                source={require('./../../assets/search-icon.png')}
                style={[styles.bellIcon]}
                />
        </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    width:'100%',
    height:'100%',
    margin:0,
    display:'flex',
    alignItems:'center',  
    flex: 1   
  },
  footerContainer:{
    position:'absolute',
    bottom:0,
    left:0,
    zIndex:10000,
    width:'100%',
    height:120,
    marginBottom: -10,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom:-5,
  },
  shadowContainer:{
      width:'100%',
      height:100,
      paddingBottom:30,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
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
      width:30,
      height:30,
  },
  verticalLine: {
    // height: '75%',
    // width: 1,
    // backgroundColor: '#rgb(33,33,43)',
  },
  bellIcon:{
      width:25,
      height:25,
      tintColor:'#c085ff',
  },
})


export default Footer