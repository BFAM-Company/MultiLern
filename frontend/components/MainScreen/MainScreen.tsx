import React, { useRef } from 'react';
import { Animated, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Image, TouchableOpacity, Platform } from 'react-native';
import { StylesVariables } from '../../utils/GLOBALS';
import DynamicHeader from './MainScreenComponents/DynamicHeader';
import BoxCarousel from './MainScreenComponents/BoxCarousel';
import StickyNavbar from './MainScreenComponents/StickyNavbar';
import NotepadSection from './MainScreenComponents/NotepadSection';
import FlashcardsSection from './MainScreenComponents/FlashcardsSection';
import SubjectsSection from './MainScreenComponents/SubjectsSection';
import ExamsSection from './MainScreenComponents/ExamsSection';



function MainScreen({pageSwitcher}: any) {
    const scrollY  = useRef(new Animated.Value(0)).current;

    const translateY = scrollY.interpolate({
        inputRange: [0, 100], // Zakres, w którym chcesz zastosować animację
        outputRange: [0, -50], // Przesunięcie elementu w górę
        extrapolate: 'clamp',
    })

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.mainContainer, {flex:1}]}
    >
        <ImageBackground
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
                <StickyNavbar />
                <View style={styles.contentContainer}>
                    <View style={{width:100, height:3, backgroundColor:'lightgray', marginTop:5, marginBottom:150}}></View>
                    <BoxCarousel />
                    <NotepadSection />
                    <FlashcardsSection pageSwitcher={pageSwitcher}/>
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
                <DynamicHeader/>
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