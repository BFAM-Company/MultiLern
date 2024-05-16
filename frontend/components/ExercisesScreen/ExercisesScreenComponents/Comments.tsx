import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SearchBar from '../../SearchBar/SearchBar';
import { AxiosContext } from '../../context/AxiosProvider';
      

interface CommentsProps{
    id: number
}

function Comments({id}: CommentsProps) {
  const {publicAxios, authAxios} = useContext(AxiosContext);
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false);


    useEffect(()=>{
        const fetchPosts = async() =>{
          setLoading(true)
          const result = await publicAxios.get(`/posts/postComments/${id}`)
          if(result){
            setLoading(false)
            setComments(result.data)
          }
        }
        fetchPosts()
      }, [id])
  return (
    <View
        style={styles.container}
    >
        <Text
            style={styles.boldText}
        >Odpowiedzi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        padding:20,
        backgroundColor:'rgb(230,230,230)',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        marginTop:50,
    },
    boldText:{
        fontSize:20,
        fontWeight:'900',
        color:'rgb(45,45,55)',
    },
})


export default Comments;