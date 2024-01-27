import * as React from 'react';
import { Dimensions } from 'react-native';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';


function HomeScreen(props: any) {
  return (
    <SafeAreaView style={styles.mainContainer}>
        <ImageBackground
            source= {require('./assets/favicon.png')}
            style={styles.ImageBackground}
        >
            <View style={styles.AccountCreateContainer}>
                <View style={styles.LogoContainer}>
                    <Image source={require('./assets/mainIcon2.png')} style={styles.LogoImage}/>
                    <Text style={styles.learnlyText}>learnly</Text>
                </View>
                <View style={styles.mainTextContainer}>
                    <Text style={styles.mainText}>Let's start using learnly and improve your learning skills</Text>
                </View>
                <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.buttonSignUp}
                    onPress = {
                        ()=>{
                            props.pageSwitcher('SignUp')
                        }
                    }
                >
                    <Text style={styles.buttonsText}>Sign up for free?</Text>
                    <Image source={require('./assets/googleIcon.png')} style={styles.LogoGoogleImage}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLogIn}
                    onPress = {
                        ()=>{
                            props.pageSwitcher('SignUp')
                        }
                    }
                >
                    <Text style={styles.buttonsText}>Log in</Text>
                    <Image source={require('./assets/lock-alt.png')} style={styles.LogoGoogleImage}/>
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
        backgroundColor:'rgb(15,15,15)',
    },
    ImageBackground:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
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
    LogoGoogleImage:{
        width:LogoSize*0.8,
        height:LogoSize*0.8,
        borderRadius:5,
    },
    learnlyText:{
        fontSize:20,
        color:'white',
        fontWeight:'600',
        margin:10
    },
    mainTextContainer:{
        width:'100%',
        display:'flex',
        alignItems:'center',
    },
    mainText:{
        fontSize:22,
        fontWeight:'700',
        color:'white',
        textAlign:'center',
        width:'100%',
    },
    buttonsContainer:{
        width:'100%',
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center',
        margin:10,
    },
    buttonSignUp:{
        width:'80%',
        height: ButtonsSize,
        backgroundColor:'white',
        borderRadius:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin:15,
        paddingLeft:50,
        paddingRight:50,
    },
    buttonLogIn:{
        width:'80%',
        height: ButtonsSize,
        backgroundColor:'white',
        borderRadius:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin:15,
        paddingLeft:50,
        paddingRight:50,
        borderWidth:1,
        borderColor:'lightgray'
    },
    buttonsText:{
        fontSize:17,
        fontWeight:'700',
        color:'rgb(33,33,43)'
    }
})


export default HomeScreen;