import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import YellowStar from './YellowStar';
import DynamicHeader from './DynamicHeader';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { BoxShadow } from '@shopify/react-native-skia';



interface PostContentProps{
    title: string,
    content: string,
    handleClose: any,
    posts_images: any[]
}


function PostContent({title, handleClose, posts_images, content}: PostContentProps) {
    const scrollY  = useRef(new Animated.Value(0)).current;
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
    <ImageBackground
                source= {require('./../../../assets/cool-background.png')}
                style={styles.fixedContainerBgc}
                imageStyle={{height:350}}
                resizeMode='cover'
                blurRadius={40}
        >   
            <Animated.ScrollView 
                style={{
                    zIndex:10,
                }}
                contentContainerStyle={{ 
                flexGrow: 1,
                paddingTop:350,
                }}
                onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false,
                                listener:(event:any) => {
                                    //
                                }
                             },
                        )
                }
                scrollEventThrottle={16}
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.contentContainer}>
                    <View
                        style={{width:windowWidth, display:'flex', alignItems:'center', justifyContent:'center'}}
                    >
                        <View style={{width:100, height:3, backgroundColor:'lightgray', marginTop:5, marginBottom:100}}></View>
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
                    <View style={{height:1000}}></View>
                </View>
            </Animated.ScrollView>
            <Animated.View
                style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: scrollY.interpolate({
                    inputRange: [0, 50],
                    outputRange: [100, 0],
                    extrapolate: 'clamp',
                    })
                }}
            >
                <DynamicHeader title={title}/>
            </Animated.View>
            <Modal
                visible={imageZoom}
            >
                <TouchableOpacity
                    onPress={()=>{setImageZoom(false)}}
                >
                    <Image
                        source={{uri: zoomedImage}}
                        style={{width:windowWidth, height:windowHeight, resizeMode:'contain'}}
                    />
                    {/* <ImageViewer imageUrls={[{url: zoomedImage}]} /> */}
                </TouchableOpacity>
            </Modal>
        </ImageBackground>
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
    },

    contentContainer:{
        width:'100%',
        marginTop:-50,
        height:'auto',
        paddingBottom:100,
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
})

export default PostContent;