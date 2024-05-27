import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState } from 'react'
import {StyleSheet, TouchableOpacity, Text, Modal, Dimensions, View} from 'react-native'
import { AxiosContext } from '../../context/AxiosProvider/AxiosProvider';
import { UserDataContext } from '../../context/UserContext/UserContext';





interface PostContentProps{
    id:number,
    handleRefresh: any,
}

const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
function CommentButton({id, handleRefresh}: PostContentProps) {
  const userContext = useContext(UserDataContext)
  const {publicAxios, authAxios} = useContext(AxiosContext);
  const [modalVisible, setModalVisibile] = useState<boolean>(false)

     
  const handleClick = () =>{
    setModalVisibile(true)
  }

  const handleSubmit = async() =>{
        const event = new Date();

        await publicAxios.post(`/posts/comment`, {
            title: 'Moja odpowiedz',
            content: 'masz rozwiązanie',
            date: event.toISOString(),
            parentPostId: id,
            userId: userContext?.userData?.id,
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
          })

        await handleRefresh()
      }


  return (
    <>
        <Modal
            visible={modalVisible}
            style={{width:windowWidth, height:windowHeight}}
        >
            <View
                style={styles.modalContainer}
            >

            </View> 
        </Modal>
        <TouchableOpacity
            onPress={handleClick}
            style={styles.button}
        >
            <LinearGradient
                colors={['rgb(45,45,55)', 'rgb(45,45,55)', 'rgb(100,100,110)']}
                style={styles.linearGradient}
            >
                <Text style={{color:'white', fontWeight:'900', fontSize:22}}>Odpowiedz</Text>
            </LinearGradient>
        </TouchableOpacity>
    </>
    
  );
}




const styles = StyleSheet.create({
    button:{
        width:300,
        height:55,
        borderRadius:20,
        margin:20,
    },
    linearGradient:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        borderRadius:20,
        alignItems:'center',
    },
    modalContainer:{
        width:'100%',
        height:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
    },
})

export default CommentButton;