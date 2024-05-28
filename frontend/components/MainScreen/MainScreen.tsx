import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Image, TouchableOpacity, Platform } from 'react-native';
import { StylesVariables } from '../../utils/GLOBALS';
import DynamicHeader from './MainScreenComponents/DynamicHeader/DynamicHeader';
import BoxCarousel from './MainScreenComponents/BoxCarousel/BoxCarousel';
import StickyNavbar from './MainScreenComponents/StickyNavbar';
import NotepadSection from './MainScreenComponents/NotepadSection/NotepadSection';
import FlashcardsSection from './MainScreenComponents/FlashcardsSection/FlashcardsSection';
import SubjectsSection from './MainScreenComponents/SubjectsSection/SubjectsSection';
import ExamsSection from './MainScreenComponents/ExamsSection/ExamsSection';
import UserModal from './MainScreenComponents/UserModal/UserModal';
import NotificationModal from './MainScreenComponents/NotificationModal/NotificationModal';
import Footer from '../Footer/Footer';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { AxiosContext } from '../context/AxiosProvider/AxiosProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDataContext } from '../context/UserContext/UserContext';
import ExercisesSection from './MainScreenComponents/ExercisesSection/ExercisesSection';



function MainScreen({pageSwitcher}: any) {
    const scrollY  = useRef(new Animated.Value(0)).current;
    const [userModalVisible, setUserModalVisible] = useState<boolean>(false)
    const [notiModalVisible, setNotiModalVisible] = useState<boolean>(false)
    const authContext = useContext(AuthContext)
    const { authAxios } = useContext(AxiosContext);
    const userContext = useContext(UserDataContext)


    useEffect(() => {
        fetchUserData()
    }, [authContext?.authState.authenticated])

    const fetchUserData = async () => {
       try {
            if(!authContext?.authState.isLoggingByGuest) {
                const userDataResponse = await authAxios.get('/users/me');
                if(userDataResponse.data)
                    userContext?.setUserData({
                        id: userDataResponse.data.id,
                        nickname: userDataResponse.data.nickname,
                        avatar: {uri: userDataResponse.data.avatar},
                        email: userDataResponse.data.email,
                    })
                else {
                    userContext?.setUserData({
                        id: -1,
                        nickname: 'Gość',
                        avatar: require('./../../assets/demo-user-icon.png'),
                        email: '',
                    })
                }
            }
            else {
                userContext?.setUserData({
                    id: -1,
                    nickname: 'Gość',
                    avatar: require('./../../assets/demo-user-icon.png'),
                    email: '',})
            }  
        } catch (error: any) {
            await AsyncStorage.clear()
            authContext?.setAuthState({
                accessToken: '',
                refreshToken: '',
                authenticated: false,
            })
        }

    }

    const translateY = scrollY.interpolate({
        inputRange: [0, 100], 
        outputRange: [0, -50], 
        extrapolate: 'clamp',
    })

    const userModalShowHandler = () =>{
        setUserModalVisible(true)
        // console.log(userModalVisible)
    }
    const userModalHideHandler = () =>{
        setUserModalVisible(false)
        // console.log(userModalVisible)
    }

    const notificationModalShowHandler = () =>{
        setNotiModalVisible(true)
        // console.log(userModalVisible)
    }
    const notificationModalHideHandler = () =>{
        setNotiModalVisible(false)
        // console.log(userModalVisible)
    }

    const user ={
        username: 'Johny123',
        email:'john.smith@example.com',
        avatar: require('./../../assets/demo-user-icon.png')
    }
  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.mainContainer, {flex:1}]}
    >
        <UserModal isVisible={userModalVisible} hideHandler={userModalHideHandler} user={userContext?.userData} buttonAction={pageSwitcher}/>
        <NotificationModal isVisible={notiModalVisible} hideHandler={notificationModalHideHandler} user={userContext?.userData} buttonAction={pageSwitcher}/>
        <ImageBackground
                testID='dupa'
                source= {require('./../../assets/gradientBoobles.png')}
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
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={false}
            >
                <StickyNavbar userModalHandler={()=>{userModalShowHandler()}} notificationModalHandler={()=>{notificationModalShowHandler()}} />
                <View style={styles.contentContainer}>
                    <View style={{width:100, height:3, backgroundColor:'lightgray', marginTop:5, marginBottom:150}}></View>
                    <BoxCarousel pageSwitcher={pageSwitcher}/>
                    <NotepadSection pageSwitcher={pageSwitcher}/>
                    <FlashcardsSection pageSwitcher={pageSwitcher}/>
                    <ExercisesSection pageSwitcher={pageSwitcher}/>
                    <SubjectsSection pageSwitcher={pageSwitcher}/>
                    <ExamsSection pageSwitcher={pageSwitcher} />
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
                //height: translateY, // Ustawienia animacji wysokości, jeśli używasz interpolacji
                }}
            >
                <DynamicHeader pageSwitcher={pageSwitcher}/>
                
            </Animated.View>
        </ImageBackground>
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
    }
})


export default MainScreen;