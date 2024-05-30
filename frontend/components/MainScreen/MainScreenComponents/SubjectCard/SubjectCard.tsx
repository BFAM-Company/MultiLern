import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { Dimensions, Image, Platform, StyleProp, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


interface SubjectCardProps {
  buttonAction: any,
  image?: any[],
  title: string
}

function SubjectCard({buttonAction, image, title}: SubjectCardProps) {

  return (
    <TouchableOpacity
        onPress={()=>{buttonAction('PostByCategory', {category: title.toLowerCase()})}}
        style={styles.cardContainer}
    >
        <Image
            source={image}
            style={styles.image}
        />
        <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}




const styles = StyleSheet.create({
  cardContainer:{
    margin:10,
    width:'90%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderRadius:20,
    padding:20,
    backgroundColor:'#fff',
    shadowColor: "#000",
    shadowOffset: {
            width: 0,
            height: 0,
            // height: -100,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },

  image:{
    width:50,
    height:50,
  },
  title:{
    fontSize: 24,
    fontWeight:'900',
    color:'#c085ff',
  },
})

export default SubjectCard;