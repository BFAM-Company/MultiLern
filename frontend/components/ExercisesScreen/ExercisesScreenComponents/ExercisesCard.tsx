import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import RateComponent from './RateComponent';



interface SubjectCardProps {
  id: number,
  buttonAction: any,
  category?: any[],
  title: string,
  description: string,
  rate: number,
  date: string
}

function ExcercisesCard({id, buttonAction, category, title, description, rate, date}: SubjectCardProps) {
  return (
    <TouchableOpacity
        onPress={()=>{buttonAction('Main')}}
        style={styles.cardContainer}
    >
        <ImageBackground
          style={styles.ImageBackground}
          source={require('./../../../assets/cool-background.png')}
          imageStyle={{
            borderRadius:20,
          }}
          blurRadius={100}
        >
          <View
            style={styles.infoContainer}
          >
            <Text
              style={styles.categoryText}
              numberOfLines={1}
            >
              {category}
            </Text>
            <Text 
              style={styles.titleText}
              numberOfLines={2}
            >
              {title}
            </Text>
            <Text
              numberOfLines={2}
            >
              {description}
            </Text>
          </View>
          <View
            style={styles.userInfoContainer}
          >
            <Image
              style={styles.userIcon}
              source={require('./../../../assets/demo-user-icon.png')}
            />
            <View>
              <Text>
                UserName
              </Text>
              <Text>
                {date}
              </Text>
            </View>
            <View
              style={styles.ratingContainer}
            >
              <RateComponent rate={rate}/>
            </View>
          </View>
        </ImageBackground>
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
  ImageBackground:{
    width:'100%',
    height:250,
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'flex-end',
  },
  infoContainer:{
    width:'100%',
    display:'flex',
    flexDirection:'column',
    paddingLeft:20,
  },
  categoryText:{
    fontSize:20,
    color:'gray'
  },
  titleText:{
    fontSize:22,
    fontWeight:'900',
  },
  userInfoContainer:{
    width:'100%',
    height:60,
    marginTop:10,
    backgroundColor:'white',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding:20,
  },
  userIcon:{
    width:40,
    height:40,
  },
  ratingContainer:{
    width:'40%',
  },
})

export default ExcercisesCard;