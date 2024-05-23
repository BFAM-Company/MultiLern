import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Image, TouchableOpacity, Platform } from 'react-native';
import Button from '../Button/Button';
import { StylesVariables } from '../../utils/GLOBALS';
import { AuthContext } from '../context/AuthContext/AuthContext';




function HomeScreen({pageSwitcher}: any) {
    const authContext = useContext(AuthContext)

    const loginByGuest = async () => {
        authContext?.setAuthState({
            accessToken: 'dupa',
            refreshToken: 'dupa',
            authenticated: true,
            isLoggingByGuest: true
        });
    }

  return (
    <View style={styles.mainContainer}>
        <ImageBackground
            source= {require('./../../assets/gradientBackground.png')}
            style={styles.ImageBackground}
            resizeMode='cover'
            blurRadius={40}
        >
            <View style={styles.AccountCreateContainer}>
                <View style={styles.LogoContainer}>
                    <Image testID='logoImage' source={require('./../../assets/multilern-logo.png')} style={styles.LogoImage}/>
                    <Text style={styles.titleText}>MultiLern</Text>
                </View>
                <View style={styles.mainTextContainer}>
                    <Text style={styles.mainText}>Dołącz do nas i podnieść swoją naukę na wyższy poziom</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                            colors={['white']}
                            buttonAction={() => {pageSwitcher('SignUp')}}
                            icons={[require('./../../assets/discord-icon.png'), 
                                    require('./../../assets/apple-icon.png'),
                                    require('./../../assets/facebook-icon.png'),
                                    require('./../../assets/lock-alt.png')
                                    ]}>
                        Zarejestruj się
                    </Button>
                    <Button
                        colors={['white']}
                        buttonAction={() => {pageSwitcher('LogIn')}}
                        icons={[require('./../../assets/logIn-icon.png')]}
                    >
                        Zaloguj się
                    </Button>
                    <Button
                        colors={['rgb(33,33,43)']}
                        fontColor='white'
                        buttonAction={loginByGuest}
                        icons={[require('./../../assets/guest-icon.png')]}
                    >
                        Kontynuuj jako gość
                    </Button>
                </View>
            </View>
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        height:'100%',
        backgroundColor: 'white'
    },
    ImageBackground:{
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
    AccountCreateContainer:{
        height:'50%',
        display:'flex',
        justifyContent:'space-around',
        ...Platform.select({
            web: {
                alignItems:'center',
                width: '75%'
            },
            default: {
                marginBottom:20,
                width:'100%',
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
    }
})


export default HomeScreen;