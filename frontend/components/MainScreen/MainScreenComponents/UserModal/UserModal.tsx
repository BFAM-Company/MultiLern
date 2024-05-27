import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, Platform, Image, Pressable } from 'react-native';
import Modal from 'react-native-modal'
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { UserDataState } from '../../../context/UserContext/UserContext';

interface UserModalProps{
    buttonAction: any
    hideHandler: () => void
    isVisible: boolean
    user: UserDataState | undefined
}
interface ButtonProps{
  buttonAction: any
  icon: any,
  content: string
  coloredIcon?: boolean
}

function Button({buttonAction, icon, content, coloredIcon = true}: ButtonProps){
  return(
    <TouchableOpacity 
      style={styles.modalButton}
      onPress={buttonAction}
    >
      <Image style={[styles.buttonIcon, coloredIcon?{tintColor:'rgb(33,33,43)'}:null]} source={icon}/>
      <Text style={{fontSize:16,}}>{content}</Text>
    </TouchableOpacity>
  );
}



function UserModal({buttonAction, hideHandler, isVisible, user}: UserModalProps) {
  const authContext = useContext(AuthContext)
  const [modalVisible, setModalVisible] = useState(false);
    
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get('window').height;

  useEffect(()=>{
    setModalVisible(isVisible)
  })

  const logout = async() => {
    await authContext?.logout()
  }

  return (
    <Modal
        style={styles.Modal}
        animationIn={"slideInLeft"}
        animationOut={"slideOutLeft"}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        isVisible={modalVisible}
        onBackdropPress={hideHandler}
        testID="userModalBackdrop"
        onSwipeComplete={hideHandler}
        swipeDirection="left"
        >
        <View style={styles.mainModalContainer}>
          <LinearGradient colors={['rgb(33,33,43)', 'rgb(53,53,53)']} style={styles.accountContainer}>
            <View>
              <Text style={styles.usernameTitle}>{user?.nickname}</Text>
              <Text style={styles.emailText}>{user?.email}</Text>
            </View>
            <Image style={styles.avatarImage} source={user?.avatar} />
          </LinearGradient>
          <LinearGradient colors={['#fff', '#eee' , '#CDE1F1']} style={styles.buttonsContainer}>
            <Button content={'Wyszukaj'} icon={require('../../../../assets/search-icon.png')} buttonAction={()=>{buttonAction('Home')}}/>
            <Button content={'Twoje Zadania'} icon={require('../../../../assets/exercises-icon.png')} buttonAction={()=>{buttonAction('Home')}}/>
            <Button content={'Konto'} icon={user?.avatar} buttonAction={()=>{buttonAction('Home')}} coloredIcon={false}/>
            <Button content={'Ustawienia'} icon={require('../../../../assets/settings-icon.png')} buttonAction={()=>{buttonAction('Home')}}/>
            <Pressable onPress={logout}><Text>Wyloguj się</Text></Pressable>
          </LinearGradient>
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    Modal:{
        width:'100%',
        height:'100%',
        margin:0,
    },
    mainModalContainer:{
        width:"70%",
        height:'100%',
        backgroundColor:'#fff',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    accountContainer:{
      width:'100%',
      height:'20%',
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
      backgroundColor:'rgb(33,33,43)',
    },
    usernameTitle:{
      fontSize: 22,
      color:'#fff',
    },
    emailText:{
      fontSize: 16,
      color:'#fff',
    },
    avatarImage:{
      width:50,
      height:50,
      borderRadius: 100
    },
    buttonsContainer:{
      width:'100%',
      height:'80%',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'flex-start',
    },
    buttonIcon:{
      width:20,
      height:20,    
    },
    modalButton:{
      width:'100%',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      padding:20,
      marginTop:5,
      borderRadius:5,
      backgroundColor:'#fff',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,

      elevation: 16,
      },
})


export default UserModal;