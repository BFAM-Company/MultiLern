import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Modal from 'react-native-modal'

interface UserModalProps{
    buttonAction: () => void
    hideHandler: ()=>void
    isVisible: boolean
}

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get('window').height;

function UserModal({buttonAction, hideHandler, isVisible}: UserModalProps) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(()=>{
    setModalVisible(isVisible)
  })
  return (
    <Modal
        style={styles.Modal}
        animationIn={"slideInLeft"}
        animationOut={"slideOutLeft"}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        isVisible={modalVisible}
        onBackdropPress={() => hideHandler()}
        >
        <View style={styles.mainModalContainer}>

        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    Modal:{
        width:'100%',
        height:'100%',
        padding:0,
    },
    mainModalContainer:{
        width:"80%",
        height:2000,
        marginTop:-0,
        marginLeft:-20,
        marginBottom:-50,
        backgroundColor:'#fff',
    }
})


export default UserModal;