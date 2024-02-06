import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

interface FeatureBoxProps{
    buttonAction: () => void,
    imageSource: any
    title: string,
    children: string | JSX.Element,
    buttonText: string
}

function FeatureBox({buttonAction,imageSource, title, children, buttonText}: FeatureBoxProps) {
  return (
    <View
        style={styles.mainContainer}
    >
        <ImageBackground
            source={imageSource}
            imageStyle={{borderRadius:10}}
            style={styles.ImageBackground}
        >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{children}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={buttonAction}
            >
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer:{
        width:320,
        height:250,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
        backgroundColor:'#fff',
        marginRight:20,
        marginLeft:20,
        marginBottom:40,
    },
    ImageBackground:{
        width:'100%',
        height:'100%',
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'space-around',
        borderRadius:10,
    },
    title:{
        fontSize:24,
        fontWeight:'900',
        marginLeft:10,
        color:'rgb(33,33,43)',
    },
    description:{
        fontSize:18,
        marginLeft:10,
        color:'rgb(33,33,43)',
    },
    button:{
        backgroundColor:'rgb(33,33,43)',
        borderRadius:10,
        width:120,
        height:50,
        marginLeft:10,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText:{
        fontSize:20,
        color:'#fff',
        fontWeight:'700',
    },
})


export default FeatureBox;