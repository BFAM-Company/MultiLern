import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SearchBar from '../../SearchBar/SearchBar';
import { AxiosContext } from '../../context/AxiosProvider';
import SingleComment from './SingleComment';
import { ActivityIndicator } from 'react-native-paper';
import CommentButton from './CommentButton';
      

interface CommentsProps{
    id: number
}

function Comments({id}: CommentsProps) {
    const {publicAxios, authAxios} = useContext(AxiosContext);
    const [comments, setComments] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(()=>{
        fetchPosts()
        }, [id])

    const fetchPosts = async() =>{
        setLoading(true)
        const result = await publicAxios.get(`/posts/postcomments/${id}`)
        if(result){
            //console.log(result.data)
            setLoading(false)
            setComments(result.data)
        }
    }

    function formatDate(isoDateString: string) {
        const months = [
            "styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec",
            "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
        ];
    
        const date = new Date(isoDateString);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
    
        const formattedDate = `${day} ${months[monthIndex]} ${year}`;
        return formattedDate;
    }

    const calcRating = (exercise: any) =>{
        let rating = 0
        let counter = 0;
        //console.log(exercise.posts_reviews)
        if (exercise.posts_reviews && Array.isArray(exercise.posts_reviews)) {
          for(let i = 0; i < exercise.posts_reviews.length; i++){
            counter++
            rating += exercise.posts_reviews[i].reviews.rate
          }
          if (counter > 0) {
              return rating / counter;
          } else {
              return 0;
          }
        } else {
            return 0;
        }
      }
  return (
    <View
        style={styles.container}
    >
        <Text
            style={styles.boldText}
        >Odpowiedzi</Text>
        <View>
        {loading ? (
              <ActivityIndicator color="gray" style={{ margin: 15 }} />
            ) : null}
            {comments.map(comment => {
              const rating = calcRating(comment)
              const isoDateString = comment.date
              const formattedDate = formatDate(isoDateString);
              return(
                <SingleComment  
                  key={comment.id} 
                  user_data={comment.users_posts}
                  id={comment.id}
                  title={comment.title} 
                  description={comment.content} 
                  rate={rating} 
                  date={formattedDate} 
                  posts_images={comment.posts_images}/>)
            })}
            {
                !comments.length?(<Text style={{fontSize:18, color:'gray', fontWeight:'900', margin:10}}>Nic tu nie ma. Bądź pierwszy, który skomentuje!</Text>):null
            }

            <CommentButton id={id} handleRefresh={fetchPosts}/>
        </View>
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
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        marginTop:50,
    },
    boldText:{
        fontSize:20,
        fontWeight:'900',
        color:'rgb(45,45,55)',
    },
})


export default Comments;