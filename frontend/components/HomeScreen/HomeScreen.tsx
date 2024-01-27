import * as React from 'react';
import { Dimensions } from 'react-native';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';



function HomeScreen(props: any) {
  return (
    <SafeAreaView style={styles.mainContainer}>
        <ImageBackground
            source= {require('./../../assets/gradientBackground.png')}
            style={styles.ImageBackground}
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
                    <TouchableOpacity style={[styles.buttonSignUp, styles.button]}
                        onPress = {
                            ()=>{
                                props.pageSwitcher('SignUp')
                            }
                        }
                    >
                        <Text style={styles.buttonsText}>Zarejestruj się</Text>
                        <View style={styles.imagesContainer}>
                            <Image source={require('./../../assets/googleIcon.png')} style={styles.accountServiceIcon}/>
                            <Image source={require('./../../assets/apple-icon.png')} style={styles.accountServiceIcon}/>
                            <Image source={require('./../../assets/facebook-icon.png')} style={[styles.accountServiceIcon, {borderRadius:200}]}/>
                            <Image source={require('./../../assets/lock-alt.png')} style={styles.accountServiceIcon}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonLogIn, styles.button]}
                        onPress = {
                            ()=>{
                                props.pageSwitcher('SignUp')
                            }
                        }
                    >
                        <Text style={styles.buttonsText}>Zaloguj się</Text>
                        <Image source={require('./../../assets/logIn-icon.png')} style={styles.iconImage}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonGuest, styles.button]}
                        onPress = {
                            ()=>{
                                props.pageSwitcher('SignUp')
                            }
                        }
                    >
                        <Text style={[styles.buttonsText, {color:'white'}]}>Kontynuj jako gość</Text>
                        <Image source={require('./../../assets/guest-icon.png')} style={[styles.iconImage, {tintColor: 'white'}]}/>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    </SafeAreaView>
  );
}
const LogoSize = Dimensions.get('window').width*0.10;
const ButtonsSize = Dimensions.get('window').height*0.07;

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        height:'100%',
        //backgroundColor:'rgb(15,15,15)',
        backgroundColor: 'white'
    },
    ImageBackground:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        objectFit: 'cover'
    },
    AccountCreateContainer:{
        width:'100%',
        height:'50%',
        display:'flex',
        justifyContent:'space-around',
        marginBottom:20,
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
    accountServiceIcon:{
        width:LogoSize*0.45,
        height:LogoSize*0.45,
        margin:5
    },
    iconImage:{
        width:LogoSize*0.6,
        height:LogoSize*0.6,
    },
    imagesContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-around',
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
        width:'100%',
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center',
        margin:10,
    },
    button:{
        width:'80%',
        height: ButtonsSize,
        //backgroundColor:'white',
        borderRadius:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin:15,
        paddingLeft:50,
        paddingRight:50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
    },
    buttonSignUp:{
        backgroundColor:'white'
    },
    buttonGuest:{
        backgroundColor:'rgb(33,33,43)'
    },
    buttonLogIn:{
        backgroundColor:'white'
    },
    buttonsText:{
        fontSize:17,
        fontWeight:'700',
        color:'rgb(33,33,43)'
    }
})


export default HomeScreen;