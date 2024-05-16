import React, { useContext, useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Animated, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ExcercisesCard from "./ExercisesScreenComponents/ExercisesCard";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";
import { AxiosContext } from "../context/AxiosProvider";
import { ActivityIndicator } from "react-native-paper";

function ExcercisesScreen({pageSwitcher, searchableText}: any) {
  const {publicAxios, authAxios} = useContext(AxiosContext);
  const [loading, setLoading] = useState(false);
  const [filteredExercises, setFilteredExercises] = useState<any[]>([])

  useEffect(()=>{
    const fetchPosts = async() =>{
      setLoading(true)
      const result = await publicAxios.get(`/posts/search/${searchableText}`)
      if(result){
        setLoading(false)
        setFilteredExercises(result.data)
      }
    }
    fetchPosts()
  }, [searchableText])

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

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.mainContainer, {flex:1}]}
      >
      <SafeAreaView>
        <ScrollView style={{width: '100%'}}>
          <View style={styles.SearchBarContainer}>
            <SearchBar pageSwitcher={pageSwitcher} currentText={searchableText} />
          </View>
          <Text
            style={styles.boldText}
          >
            Najlepsze trafienia
          </Text>
          <View style={styles.excercisesCardsSection}>
            {loading ? (
              <ActivityIndicator color="gray" style={{ margin: 15 }} />
            ) : null}
            {filteredExercises.map(excercise => {
              const rating = calcRating(excercise)
              const isoDateString = excercise.date
              const formattedDate = formatDate(isoDateString);
              return(
                <ExcercisesCard  
                  key={excercise.id} 
                  user_data={excercise.users_posts}
                  id={1} category={excercise.category} 
                  title={excercise.title} 
                  description={excercise.content} 
                  rate={rating} date={formattedDate} 
                  posts_images={excercise.posts_images}/>)
            })}
          </View>
          <View style={{height: 200}}></View>
        </ScrollView>
      </SafeAreaView>
      <Footer pageSwitcher={pageSwitcher}/>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
      width:'100%',
      height:'100%',
      backgroundColor: 'white'
  },
  fixedContainerBgc:{
      width:'100%',
  },
  resultsOfSearching: {
    fontSize:24,
    fontWeight:'500',
    color:'rgb(33,33,43)',
    margin: 10
  },
  searchedPhrase: {
    fontWeight:'900',
  },
  excercisesCardsSection: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  footerContainer:{
    position:'absolute',
    bottom:0,
    left:0,
    zIndex:10000,
    width:'100%',
    height:100,
    marginBottom: 10,
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
  SearchBarContainer:{
    width:'100%',
    marginTop:20,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  boldText:{
    fontSize:25,
    fontWeight: '900',
    paddingTop:50,
    paddingLeft: 20,
    paddingBottom:20,
  },
})


export default ExcercisesScreen;