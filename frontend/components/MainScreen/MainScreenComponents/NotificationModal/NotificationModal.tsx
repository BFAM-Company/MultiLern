import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import Modal from 'react-native-modal'
import { UserDataState } from '../../../context/UserContext/UserContext';

interface NotificationModalProps{
    buttonAction: any
    hideHandler: () => void
    isVisible: boolean
    user: UserDataState | undefined
}
interface NotificationProps{
  buttonAction: any
  icon: any,
  content: string
  coloredIcon?: boolean
}

function Notification({buttonAction, icon, content, coloredIcon = true}: NotificationProps){
  return(
    <TouchableOpacity 
      style={styles.modalButton}
      onPress={buttonAction}
    >
      <Image style={[styles.buttonIcon, coloredIcon?{tintColor:'rgb(33,33,43)'}:null]} source={{uri: icon}}/>
      <Text style={{fontSize:16,}}>{content}</Text>
    </TouchableOpacity>
  );
}



function NotificationModal({buttonAction, hideHandler, isVisible, user}: NotificationModalProps) {
  const [modalVisible, setModalVisible] = useState(false);
    
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get('window').height;

  useEffect(()=>{
    setModalVisible(isVisible)
  })
  return (
    <Modal
        style={styles.Modal}
        animationIn={"slideInRight"}
        animationOut={"slideOutRight"}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        isVisible={modalVisible}
        // INFO FOR MR.PALACZ: nie da się testowac tego :c
        onBackdropPress={() => hideHandler()}
        onSwipeComplete={() => hideHandler()}
        swipeDirection="left"
        testID='notificationModal'
        >
        <View style={styles.mainModalContainer}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              onPress={()=>{hideHandler()}}
              style={styles.closeButton}
              testID="hideNotificationModalButton"
            >
              <Image 
                source={require('../../../../assets/close-icon-bold.png')}
                style={styles.closeButtonIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer}>
            <Notification content={'Wyszukaj'} icon={require('../../../../assets/search-icon.png')} buttonAction={()=>{buttonAction('Home')}}/>
            <Notification content={'Twoje Zadania'} icon={require('../../../../assets/exercises-icon.png')} buttonAction={()=>{buttonAction('Home')}}/>
            <Notification content={'Konto'} icon={{uri: user?.avatar}} buttonAction={()=>{buttonAction('Home')}} coloredIcon={false}/>
            <Notification content={'Ustawienia'} icon={require('../../../../assets/settings-icon.png')} buttonAction={()=>{buttonAction('Home')}}/>
          </View>
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    Modal:{
        width:'100%',
        height:'100%',
        margin:0,
        display:'flex',
        alignItems:'flex-end',        
    },
    mainModalContainer:{
        width:"100%",
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
      width:30,
      height:30,
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
      closeButtonContainer:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignContent:'center',
        margin:10,
      },
      closeButton:{
        width:'auto',
        margin:10,
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
      },
      closeButtonIcon:{
        width:30,
        height:30,
        tintColor:'rgb(33,33,43)',
      }
})


export default NotificationModal;