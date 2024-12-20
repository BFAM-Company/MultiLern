import React, { useRef, useState } from 'react'
import { Dimensions, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View, ScrollView, NativeUIEvent } from 'react-native'
import RateComponent from './RateComponent';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import PostContent from './PostContent';
import { useData } from '@shopify/react-native-skia';



interface SubjectCardProps {
  id: number,
  user_data: any[],
  category?: any[],
  title: string,
  description: string,
  rate: number,
  date: string
  posts_images: any[]
}

function ExcercisesCard({id, category, title, description, rate, date, posts_images, user_data}: SubjectCardProps) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const width = useSharedValue(windowWidth*0.9)
  const height = useSharedValue(250)
  const [isActive, setIsActive] = useState<boolean>(false)

  console.log(`e${id}`)


  // const handleScroll = (event:any) => {
  //   const offsetY = event.nativeEvent.contentOffset.y;

  //   if (offsetY === 0 ) {
  //     // Użytkownik był na górze i próbował jeszcze raz przewinąć do góry
  //    handleClose();
  //   }
  // }

  const handlePress = () =>{
    width.value = withSpring(windowWidth)
    height.value = withSpring(windowHeight)
    setIsActive(true)
  }
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY == 0) {
      handleClose();
    }
  }
  const handleClose = () =>{
    width.value = withSpring(windowWidth*0.9)
    height.value = withSpring(250),
    setIsActive(false)
  }

  return (
    <>
      <TouchableOpacity
          testID={`e${id}`}
          onPress={()=>{handlePress()}}
          style={[styles.cardContainer,{display:isActive?'none':'flex'}]}
        >
          <Animated.View
            style={{width, height}}
          >
            <ImageBackground
              style={styles.ImageBackground}
              source={require('./../../../assets/cool-background.png')}
              imageStyle={{
                borderRadius:20,
              }}
              blurRadius={80}
            >
              <View
                style={styles.infoContainer}
              >
                <Text
                  style={styles.categoryText}
                  numberOfLines={1}
                  testID={`c${id}`}
                >
                  {category}
                </Text>
                <Text 
                  style={styles.titleText}
                  numberOfLines={2}
                  testID='title'
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
                  source={user_data[0].users.avatar?{uri: user_data[0].users.avatar}:require('./../../../assets/demo-user-icon.png')}
                />
                <View>
                  <Text>
                    {user_data[0].users.nickname}
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
          </Animated.View>
      </TouchableOpacity>
      <Modal
        visible={isActive}
        transparent={true}
        style={styles.Modal}
      >
          <View
            style={styles.elementsContainer}
          >
          <Animated.View
            style={{width, height, backgroundColor:'transparent'}}
          >
            <PostContent id={id} title={title} handleClose={handleScroll} posts_images={posts_images} content={description} user_data={user_data} date={date}/>
          </Animated.View>
          </View>
      </Modal>

    </>
  );
}




const styles = StyleSheet.create({
  cardContainer:{
    height:'auto',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    margin:10,
    width:'90%',
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
  fixedContainerBgc:{
    width:'100%',
},
  Modal:{
    width:'100%',
    height:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  elementsContainer:{
    width:'100%',
    height:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  animatedView:{
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
    height:'100%',
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