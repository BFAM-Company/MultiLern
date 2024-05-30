import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Image, ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import Comments from './Comments';



interface PostContentProps{
    id:number,
    title: string,
    user_data: any[],
    date: string,
    content: string,
    handleClose: any,
    posts_images: any[]
}


function PostContent({id, title, handleClose, posts_images, content, user_data, date}: PostContentProps) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [imageZoom, setImageZoom] = useState<boolean>(false)
    const [zoomedImage, setZoomedImage] = useState<string>('');

    useEffect(()=>{
        //console.log(JSON.stringify(posts_images))
    },[])

    const _renderItem = ({item, index}: any) => {
        return (
            <TouchableOpacity
                style={styles.imageContainer}
                activeOpacity={1}
                onPress={()=>{
                    setZoomedImage(item.images.img)
                    setImageZoom(true)
                }}
                testID={`image-touchable-${index}`}
            >
                <Image 
                    key={index}
                    source={{uri: item.images.img}}
                    style={styles.postImage}
                />
            </TouchableOpacity>
        );
    }
  return (
    <View        
        style={styles.fixedContainerBgc}
        >   
            <ScrollView
                onScroll={handleClose}
            >
                <View style={styles.separator}></View>
                <View style={styles.contentContainer}>
                    <View
                        style={{width:windowWidth, display:'flex', alignItems:'center', justifyContent:'center'}}
                    >
                        <View style={{width:100, height:3, backgroundColor:'lightgray', marginTop:5, marginBottom:50}}></View>
                    </View>
                    <View style={styles.userInfoContainer}>
                        <Image
                            style={styles.userIcon}
                            source={user_data[0].users.avatar?{uri: user_data[0].users.avatar}:require('./../../../assets/demo-user-icon.png')}
                        />
                        <View style={styles.verticalContainer}>
                            <Text
                                style={styles.nickname}
                            >{user_data[0].users.nickname}</Text>
                            <Text
                                style={styles.date}
                            >{date}</Text>
                        </View>
                    </View>
                    <Carousel
                        ref={(c) => { let _carousel = c }}
                        data={posts_images}
                        renderItem={_renderItem}
                        sliderWidth={windowWidth}
                        itemWidth={windowWidth*0.8}
                        layout={'stack'} 
                        layoutCardOffset={20} 
                    />
                    <Text 
                        numberOfLines={4}
                        style={styles.postTitle}
                    >
                        {title}
                    </Text>
                    <Text
                        style={styles.contentText}
                    >
                        {content}
                    </Text>
                    <Comments id={id} />
                    {/* <View style={{height:100}}></View> */}
                </View>
            </ScrollView>
            <Modal
                visible={imageZoom}
                testID='zoom-modal'
            >
                <TouchableOpacity
                    onPress={()=>{setImageZoom(false)}}
                >
                    <Image
                        testID='zoomed-image'
                        source={{uri: zoomedImage}}
                        style={{width:windowWidth, height:windowHeight, resizeMode:'contain'}}
                    />
                    {/* <ImageViewer imageUrls={[{url: zoomedImage}]} /> */}
                </TouchableOpacity>
            </Modal>
        </View>
  );
}




const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    fixedContainerBgc:{
        width:'100%',
        backgroundColor:'transparent'
    },
    separator:{
        width:'100%',
        height:250,
    },
    contentContainer:{
        width:'100%',
        marginTop:-50,
        height:'auto',
        //paddingBottom:100,
        display: 'flex',
        alignItems: 'center',
        justifyContent:'flex-start',
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        backgroundColor:'#fff',
        shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 0,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
    },
    postImage:{
        width:'100%',
        height:300,
        resizeMode:'cover',
        borderRadius:10,
    },
    userIcon:{
        width:50,
        height:50,
        borderRadius:100,
      },
    postTitle:{
        fontSize:30,
        fontWeight:'900',
        paddingTop:50,
        margin:20,
        paddingRight:10,
        color:'black'
    },
    imageContainer:{
        width:'auto',
        height:'auto'
    },
    contentText:{
        fontSize:22,
        marginTop:50,
        margin:20,
        fontWeight:'700',
        color:'rgb(45,45,55)'
    },
    userInfoContainer:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        padding:20,
        marginBottom:10,
    },
    verticalContainer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'space-around',
        marginLeft:40,
    },
    nickname:{
        fontSize:22,
        fontWeight:'700',
        color:'rgb(45,45,55)'
    },
    date:{
        fontSize:16,
        fontWeight:'500',
        color:'gray',
    }
})

export default PostContent;