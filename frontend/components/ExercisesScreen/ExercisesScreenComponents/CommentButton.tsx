import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext } from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import { Text } from 'react-native-paper';
import { AxiosContext } from '../../context/AxiosProvider';
import { UserDataContext } from '../../context/UserContext';




interface PostContentProps{
    id:number,
    handleRefresh: any,
}


function CommentButton({id, handleRefresh}: PostContentProps) {
  const userContext = useContext(UserDataContext)
  const {publicAxios, authAxios} = useContext(AxiosContext);

     
  const  handleClick = async() =>{
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
})

export default CommentButton;