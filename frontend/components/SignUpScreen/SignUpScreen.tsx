import React, { useEffect } from 'react';
import {Animated, Dimensions, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, ImageBackground, Image, Platform } from 'react-native';
import Button from '../Button/Button';
import { useState } from 'react';
import { StylesVariables } from '../../utils/GLOBALS';


function SignUpScreen(props: any) {
	const [login, setLogin] = useState<string | undefined>(undefined)
	const [passwordText, setPasswordText] = useState<string | undefined>(undefined)
    const [scroll, setScroll] = useState<boolean>(false)

    const fadeAnimHeader = React.useRef(new Animated.Value(0)).current;
    const fadeAnimContainer = React.useRef(new Animated.Value(1)).current;

    useEffect(() => {
        fadeIn(fadeAnimHeader, 3000);
        //fadeIn(fadeAnimContainer, 5000);
      }, []);

    const fadeIn = (animVariable: Animated.Value, durationValue: number | undefined) => {
        Animated.timing(animVariable, {
        toValue: 1,
        duration: durationValue,
        useNativeDriver: true,
        }).start();
    };
    const scrollBehaviorChange = () =>{
        setScroll(!scroll)
    }

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.mainContainer, {flex:1}]}
    >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={scroll}>
        <ImageBackground
            source= {require('./../../assets/gradientBackground.png')}
            style={styles.image}
            resizeMode='cover'
            blurRadius={40}
        >
            <View style={styles.AccountCreateContainer}>
                <Animated.View
                        style={[
                            styles.fadingHeader,
                            {
                                opacity: fadeAnimHeader,
                            },
                        ]}>
                    <View style={styles.LogoContainer}>
                        <Image source={require('./../../assets/multilern-logo.png')} style={styles.LogoImage}/>
                        <Text style={styles.titleText}>MultiLern</Text>
                    </View>
                    <View style={styles.mainTextContainer}>
                        <Text style={styles.mainText}>Dołącz do nas i podnieść swoją naukę na wyższy poziom</Text>
                    </View>
                </Animated.View>
                <Animated.View
                    style={[
                        styles.fadingHeader,
                        {
                            opacity: fadeAnimContainer,
                        },
                    ]}>
                        <View style={styles.buttonsContainer}>
                            <TextInput 
                                style={styles.input} 
                                value={login} 
                                onChangeText={setLogin} 
                                placeholder='nazwa użytkownika lub email'
                                onPressIn={scrollBehaviorChange}
                                onPressOut={scrollBehaviorChange}
                                />
                            <TextInput 
                                style={styles.input} 
                                value={passwordText} 
                                secureTextEntry={true}
                                onChangeText={setPasswordText} 
                                placeholder='Hasło '
                                onPressIn={scrollBehaviorChange}
                                onPressOut={scrollBehaviorChange}
                                />


                            <Button
                                colors={['rgb(33,33,43)','rgb(13,13,23)']}
                                buttonAction={() => {props.pageSwitcher('SignUp')}}
                                icons={[require('./../../assets/logIn-icon.png')]}
                                fontColor='white'>
                                Zaloguj się
                            </Button>
                            

                            <View style={styles.ORTextContainer}>
                                <Text style={styles.mainText}>~ LUB UŻYJ ~</Text>
                            </View>
                            <Button
                                colors={['white']}
                                buttonAction={() => {props.pageSwitcher('SignUp')}}
                                icons={[require('./../../assets/googleIcon.png')]}>
                            Google account
                            </Button>
                                                <Button
                                    colors={['white']}
                                    buttonAction={() => {props.pageSwitcher('SignUp')}}
                                    icons={[require('./../../assets/apple-icon.png')]}>
                                Apple ID
                            </Button>
                            <Button
                                    colors={['white']}
                                    buttonAction={() => {props.pageSwitcher('SignUp')}}
                                    icons={[require('./../../assets/facebook-icon.png')]}>
                                Facebook account
                            </Button>
                            <Button
                                    colors={['white']}
                                    buttonAction={() => {props.pageSwitcher('SignUp')}}
                                    icons={[require('./../../assets/lock-alt.png')]}>
                                Utwórz konto w MultiLern
                            </Button>
                        </View>
                </Animated.View>
            </View>
        </ImageBackground>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        height:'100%',
        backgroundColor: 'white',
    },
    image:{
        width:'100%',
        height:'100%',
        display:'flex',
        
        alignItems:'center',
        objectFit: 'cover',
        ...Platform.select({
            web: {
                justifyContent:'center',
            },
            default: {
                justifyContent:'flex-end',
            }
        }),
        
    },
    fadingHeader:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent: 'center',
    },
    AccountCreateContainer:{
        height:'60%',
        display:'flex',
        justifyContent:'space-around',
        ...Platform.select({
            web: {
                alignItems:'center',
								width: '75%'
            },
            default: {
								width:'100%',	
								justifyContent: 'flex-end',
                marginBottom:20,
            }
        }),
    }, 
    LogoContainer:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    LogoImage:{
        width:StylesVariables.LogoSize,
        height:StylesVariables.LogoSize,        
        borderRadius:5,
    },
    titleText:{
        fontSize:30,
        color:'rgb(33,33,43)',
        fontWeight:'600',
        margin:10
    },
    mainTextContainer:{
        width:'100%',
        display:'flex',
        alignItems:'center',
    },
    mainText:{
        width:'90%',
        fontSize:19,
        fontWeight:'700',
        color:'gray',
        textAlign:'center',
    },
		ORTextContainer: {
			width: '100%',
			display: 'flex',
			alignItems: 'center',
			margin: 10
		},
    buttonsContainer:{
        ...Platform.select({
            web: {
                width: '50%'
            },
            default: {
                width: '100%'
            }
        }),
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center',
        margin:10,
    },
    loginButton:{
        width:'80%',
        borderRadius:20,
        height:StylesVariables.InputSize,
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    input: {
        backgroundColor: 'white',
        width:'80%',
        height: StylesVariables.InputSize,
        borderRadius:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin:15,
        paddingLeft:40,
        paddingRight:40,
        shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
    }
})


export default SignUpScreen;