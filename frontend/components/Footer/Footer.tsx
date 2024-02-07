import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import SearchBar from '../SearchBar/SearchBar'
function Footer({pageSwitcher}: any) {
  const [modalVisibility, setModalVisibility] = useState<boolean>(false)

  return (
    <View style={styles.footerContainer}>
        <Modal style={styles.modal} isVisible={modalVisibility} onBackdropPress={() => setModalVisibility(false)}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex:1}}
          >
            <SearchBar setModalVisibility={setModalVisibility} pageSwitcher={pageSwitcher}/>
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
        <TouchableOpacity style={[styles.button]} onPress={() => pageSwitcher('Main')}>
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
        <TouchableOpacity style={[styles.button]} onPress={() => setModalVisibility(true)}>
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
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerContainer:{
    position:'absolute',
    bottom:0,
    left:0,
    zIndex:10000,
    width:'100%',
    height:100,
    marginBottom: -10,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    overflow:'hidden',
    paddingBottom:-5,
  },
  shadowContainer:{
      width:'100%',
      height:120,
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
      width:50,
      height:50,
  },
  verticalLine: {
    height: '75%',
    width: 1,
    backgroundColor: '#rgb(33,33,43)',
  },
  bellIcon:{
      width:30,
      height:30,
  },
})


export default Footer