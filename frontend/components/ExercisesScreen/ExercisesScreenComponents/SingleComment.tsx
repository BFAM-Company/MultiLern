import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import RateComponent from './RateComponent';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import PostContent from './PostContent';


interface SubjectCardProps {
  id: number,
  user_data: any[],
  category?: any[],
  title: string,
  description: string,
  rate: number,
  date: string
  posts_images: any[],
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function SingleComment({id, category, title, description, rate, date, posts_images, user_data}: SubjectCardProps) {
  
  const width = useSharedValue(windowWidth*0.9)
  const height = useSharedValue(200)
  const [isActive, setIsActive] = useState<boolean>(false)


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
  };

  const handleClose = () =>{
    width.value = withSpring(windowWidth*0.9)
    height.value = withSpring(200),
    setIsActive(false)
  }


  return (
    <>
      <TouchableOpacity
          onPress={()=>{handlePress()}}
          style={[styles.cardContainer,{display:isActive?'none':'flex'}]}
        >
          <Animated.View
            style={[styles.commentContainer,{width, height}]}
          >
            <View style={styles.userContainer}>
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
            <Text
                numberOfLines={2}
                style={styles.commentTitleText}
            >
                {title}
            </Text>
            <Text
                numberOfLines={4}
                style={styles.commentContent}
            >
                {description}
            </Text>
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
userContainer:{
    width:'100%',
    height:70,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding:10,
},
commentContainer:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    padding:10,
    height:200,
    width: windowWidth * .9
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
  commentTitleText:{
    fontSize:18,
    fontWeight:'900',
    color:'rgb(45,45,55)',
  },
  commentContent:{
    fontSize:16,
    color:'gray',
    fontWeight:'500',
  },
})

export default SingleComment;