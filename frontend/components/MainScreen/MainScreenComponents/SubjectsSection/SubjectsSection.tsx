import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SubjectCard from '../SubjectCard/SubjectCard';
import { LinearGradient } from 'expo-linear-gradient';

interface SubjectsSectionProps{
    pageSwitcher: any
}

function SubjectsSection({pageSwitcher}: SubjectsSectionProps) {
    const [buttonValue, setButtonValue] = useState<string>('więcej');
    const [heightValue, setHeightValue] = useState<any>(500);

    useEffect(() => {
        setButtonValue('więcej')
        setHeightValue(500)
    }, []);

    const heightChange = () =>{
        setHeightValue(heightValue === 500?'auto':500)
        setButtonValue(buttonValue === 'więcej'?'mniej':'więcej')
    }

  return (
    <Animated.View
        style={[styles.mainContainer, {height:heightValue}]}
    >
        <View style={styles.TopHeader}>
            <Text style={styles.title}>Przedmioty</Text>
        </View>
        <SubjectCard 
            buttonAction={pageSwitcher} 
            title={'Matematyka'} 
            image={require('../../../../assets/matematyka-icon.png')}
        />
        <SubjectCard 
            buttonAction={pageSwitcher} 
            title={'Język Polski'} 
            image={require('../../../../assets/polski-icon.png')}
        />
        <SubjectCard 
            buttonAction={pageSwitcher} 
            title={'Języki Obce'} 
            image={require('../../../../assets/obce-icon.png')}
        />
        <SubjectCard 
            buttonAction={pageSwitcher} 
            title={'Geografia'} 
            image={require('../../../../assets/geografia-icon.png')}
        />
        <SubjectCard 
            buttonAction={pageSwitcher} 
            title={'Fizyka'} 
            image={require('../../../../assets/fizyka-icon.png')}
        />
        <SubjectCard 
            buttonAction={pageSwitcher} 
            title={'Biologia'} 
            image={require('../../../../assets/biologia-icon.png')}
        />
        <SubjectCard 
            buttonAction={pageSwitcher} 
            title={'Chemia'} 
            image={require('../../../../assets/chemia-icon.png')}
        />
        <SubjectCard 
            buttonAction={pageSwitcher} 
            title={'Informatyka'} 
            image={require('../../../../assets/informatyka-icon.png')}
        />
        <TouchableOpacity
            style={styles.plusButton}
            onPress={heightChange}
            testID='plusButton'
        >
            <LinearGradient
                colors={['rgba(0,0,0, 0.1)','lightgray','#fff']}
                style={styles.LinearGradient}
            >
                <View
                    style={styles.button}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        {buttonValue}
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around',
        alignItems:'center',
        overflow:'hidden',
        paddingBottom:100,
    },
    TopHeader:{
        width:'100%',
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'center',
        padding:20,
    },
    title:{
        fontSize:24,
        fontWeight:'900',
        color:'rgb(33,33,43)',
    },

    plusButton:{
        height:50,
        position:'absolute',
        bottom:0,
        left:0,
        width:'100%',
    },
    LinearGradient:{
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        width:100,
        height:40,
        backgroundColor:'rgb(33,33,43)',
        borderRadius:100,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    buttonText:{
        color:'#fff',
        fontSize:18,
        
        fontWeight:'900',
    },
})

export default SubjectsSection;