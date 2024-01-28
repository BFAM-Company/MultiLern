import React from 'react';
import { Dimensions, TextInput } from 'react-native';
import { View, Text, StyleSheet, ImageBackground, Image, Platform } from 'react-native';
import Button from '../Button/Button';
import { useState } from 'react';



function SignUpScreen(props: any) {
	const [emailText, onChangeEmailText] = useState('chuj')
	const [passwordText, onChangePasswordText] = useState('chuj')
  return (
    <View style={styles.mainContainer}>
        <ImageBackground
            source= {require('./../../assets/gradientBackground.png')}
            style={styles.image}
        >
            <View style={styles.AccountCreateContainer}>
                <View style={styles.LogoContainer}>
                    <Image source={require('./../../assets/multilern-logo.png')} style={styles.LogoImage}/>
                    <Text style={styles.titleText}>MultiLern</Text>
                </View>
                <View style={styles.mainTextContainer}>
                    <Text style={styles.mainText}>Dołącz do nas i podnieść swoją naukę na wyższy poziom</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TextInput style={styles.input} value={emailText} onChangeText={onChangeEmailText} placeholder='Podaj email: '/>
                    <TextInput style={styles.input} value={passwordText} onChangeText={onChangePasswordText} placeholder='Podaj hasło: '/>
										<View style={styles.ORTextContainer}>
											<Text style={styles.mainText}>~ LUB ~</Text>
               			 </View>
										<Button
                            color='white'
                            buttonAction={() => {props.pageSwitcher('SignUp')}}
                            icons={[require('./../../assets/googleIcon.png')]}>
                        Zarejestruj się przez
                    </Button>
										<Button
                            color='white'
                            buttonAction={() => {props.pageSwitcher('SignUp')}}
                            icons={[require('./../../assets/apple-icon.png')]}>
                        Zarejestruj się przez
                    </Button>
										<Button
                            color='white'
                            buttonAction={() => {props.pageSwitcher('SignUp')}}
                            icons={[require('./../../assets/facebook-icon.png')]}>
                        Zarejestruj się przez
                    </Button>
										<Button
                            color='white'
                            buttonAction={() => {props.pageSwitcher('SignUp')}}
                            icons={[require('./../../assets/lock-alt.png')]}>
                        Zarejestruj się przez
                    </Button>
                </View>
            </View>
        </ImageBackground>
    </View>
  );
}


const PCRatio = Platform.OS === 'web' ? 0.4 : 1
const LogoSize = Dimensions.get('window').width*0.10*PCRatio;
const InputSize = Dimensions.get('window').height*0.07;


const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        height:'100%',
        backgroundColor: 'white'
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
        width:LogoSize,
        height:LogoSize,        
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
		input: {
			backgroundColor: 'white',
			width:'80%',
			height: InputSize,
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