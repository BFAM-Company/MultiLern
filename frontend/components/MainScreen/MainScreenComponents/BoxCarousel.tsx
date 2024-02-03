import React from 'react';
import { Animated, Dimensions, ScrollView } from 'react-native';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Image, TouchableOpacity, Platform } from 'react-native';
import FeatureBox from './FeatureBox';



function BoxCarousel({pageSwitcher}: any) {
  const IMAGES = {
    ImageBackground1: require('./../../../assets/cool-background.png'),
    ImageBackground2: require('./../../../assets/cool-background (1).png'),
    ImageBackground3: require('./../../../assets/cool-background (2).png'),
    ImageBackground4: require('./../../../assets/cool-background (3).png'),
  }

  return (
    <View style={styles.mainContainer}>
        <ScrollView
            style={styles.scroll}
            horizontal={true}
        >   
            <FeatureBox buttonAction={()=>{pageSwitcher('main')}} title={'Rozwiązania Zadań'} buttonText={'Zobacz'} imageSource={IMAGES.ImageBackground1}>
                Najlepsze rozwiązania zadań. Wszystkie podręcziki i 
                sprawdzone odpowiedzi przez ekspertów i specjalną sztuczną inteligencję
            </FeatureBox>
            <FeatureBox buttonAction={()=>{pageSwitcher('main')}} title={'Rozwiązania Zadań'} buttonText={'Zobacz'} imageSource={IMAGES.ImageBackground2}>
                Najlepsze rozwiązania zadań. Wszystkie podręcziki i 
                sprawdzone odpowiedzi przez ekspertów i specjalną sztuczną inteligencję
            </FeatureBox>
            <FeatureBox buttonAction={()=>{pageSwitcher('main')}} title={'Rozwiązania Zadań'} buttonText={'Zobacz'} imageSource={IMAGES.ImageBackground3}>
                Najlepsze rozwiązania zadań. Wszystkie podręcziki i 
                sprawdzone odpowiedzi przez ekspertów i specjalną sztuczną inteligencję
            </FeatureBox>
            <FeatureBox buttonAction={()=>{pageSwitcher('main')}} title={'Rozwiązania Zadań'} buttonText={'Zobacz'} imageSource={IMAGES.ImageBackground4}>
                Najlepsze rozwiązania zadań. Wszystkie podręcziki i 
                sprawdzone odpowiedzi przez ekspertów i specjalną sztuczną inteligencję
            </FeatureBox>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        marginTop:50,
    },
    scroll:{
        width:'100%',
        height:'auto',
        paddingBottom:20,
        paddingTop:20,
        backgroundColor:'#fff'
    },
})


export default BoxCarousel;