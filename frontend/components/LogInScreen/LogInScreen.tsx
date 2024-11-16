import React, { useContext, useEffect } from 'react';
import {Alert, Animated, Dimensions, KeyboardAvoidingView, Linking, Modal, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, ImageBackground, Image, Platform } from 'react-native';
import Button from '../Button/Button';
import { useState } from 'react';
import { StylesVariables } from '../../utils/GLOBALS';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { AxiosContext } from '../context/AxiosProvider/AxiosProvider';
// import { setGenericPassword } from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dismissBrowser, openAuthSessionAsync } from 'expo-web-browser';


function LogInScreen({pageSwitcher}: any) {
	const [login, setLogin] = useState<string | undefined>(undefined)
	const [passwordText, setPasswordText] = useState<string | undefined>(undefined)
    const authContext = useContext(AuthContext)
    const { authAxios } = useContext(AxiosContext);

    const onLogin = async () => {
        try {
            const res = await authAxios.post('/login', {
                username: login,
                password: passwordText,
                isLogingFromOutside: false,
                logginMethod: 'Multilern'
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(res.data) {
                const {accessToken, refreshToken} = res.data;
                await AsyncStorage.setItem('auth', JSON.stringify({
                    accessToken,
                    refreshToken,
                }))

                authContext?.setAuthState({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    authenticated: true,
                });
            }
            else Alert.alert('Login Failed', 'Nieprawidłowe dane spierdalaj')
        }
        catch(error: any){
            Alert.alert('Login Failed', error.response.data.message);
        }
        
    }

    const loginByDiscord = async () => {
        const response = await openAuthSessionAsync('http://localhost:3001/auth/discord', 'http://localhost:3001/auth/discord/callback')
        if(response.type === 'success') {
            const REGEX =  /[?&]([^=#]+)=([^&#]*)/g
            let params: any = {}, match;
            while (match = REGEX.exec(response.url)) {
                params[match[1]] = match[2];
            }
            const {accessToken, refreshToken} = params
            await AsyncStorage.setItem('auth', JSON.stringify({
                    accessToken,
                    refreshToken,
                }))

                authContext?.setAuthState({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    authenticated: true,
                });
        }            
        dismissBrowser()
    }

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

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.mainContainer, {flex:1}]}
    >
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            bounces={false}
            overScrollMode='never'
        >
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
                                placeholder='Nazwa użytkownika lub email'
                                autoCapitalize='none'
                                autoCorrect={false}
                                />
                            <TextInput 
                                style={styles.input} 
                                value={passwordText} 
                                secureTextEntry={true}
                                onChangeText={setPasswordText} 
                                placeholder='Hasło '
                                autoCapitalize='none'
                                autoCorrect={false}
                                />


                            <Button
                                colors={['rgb(33,33,43)','rgb(13,13,23)']}
                                buttonAction={() => {onLogin()}}
                                icons={[require('./../../assets/logIn-icon.png')]}
                                fontColor='white'>
                                Zaloguj się
                            </Button>
                            

                            <View style={styles.ORTextContainer}>
                                <Text style={styles.mainText}>~ LUB UŻYJ ~</Text>
                            </View>
                            <Button
                                colors={['white']}
                                buttonAction={loginByDiscord}
                                icons={[require('./../../assets/discord-icon.png')]}>
                            Discord
                            </Button>
                             <Button
                                    colors={['white']}
                                    buttonAction={() => {pageSwitcher('SignUp')}}
                                    icons={[require('./../../assets/apple-icon.png')]}>
                                Apple ID
                            </Button>
                            <Button
                                    colors={['white']}
                                    buttonAction={() => {pageSwitcher('SignUp')}}
                                    icons={[require('./../../assets/facebook-icon.png')]}>
                                Facebook account
                            </Button>
                            <Button
                                    colors={['white']}
                                    buttonAction={() => {pageSwitcher('SignUp')}}
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


export default LogInScreen;