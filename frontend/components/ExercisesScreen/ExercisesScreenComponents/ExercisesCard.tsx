import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


interface SubjectCardProps {
  buttonAction: any,
  image?: any[],
  title: string,
  description: string
}

function ExcercisesCard({buttonAction, image, title, description}: SubjectCardProps) {

  return (
    <TouchableOpacity
        onPress={()=>{buttonAction('Main')}}
        style={styles.cardContainer}
    >
        <Image
            source={image}
            style={styles.image}
        />
        <View style={styles.textContent}>
          <Text numberOfLines={2} style={styles.title}>{title}</Text>
          <Text numberOfLines={7} style={styles.description}>{description}</Text>
        </View>
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
    width:90,
    height:90,
  },
  title:{
    fontSize: 24,
    fontWeight:'900',
    color:'#c085ff',
    marginBottom: 10
  },
  textContent: {
    marginLeft: 30,
    height: 200,
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
  },
  description: {
    flex: 1,
    flexWrap: 'wrap'
  }

})

export default ExcercisesCard;