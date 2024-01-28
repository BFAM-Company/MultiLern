import React, {useCallback, useEffect, useState} from 'react';
import { Animated, Dimensions, TextInput } from 'react-native';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import LinearGradient from 'react-native-linear-gradient';

function HomeScreen(props: any) {

    const fadeAnimHeader = React.useRef(new Animated.Value(0)).current;
    const fadeAnimContainer = React.useRef(new Animated.Value(0)).current;
    const [login, setLogin] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);

    const [fontsLoaded, fontError] = useFonts({
        'MPLUSRounded1c-ExtraBold': require('./../../assets/fonts/MPLUSRounded1c-ExtraBold.ttf'),
    });

    useEffect(() => {
        fadeIn(fadeAnimHeader, 3000);
        fadeIn(fadeAnimContainer, 5000);
      }, []);

    const fadeIn = (animVariable: Animated.Value, durationValue: number | undefined) => {
        Animated.timing(animVariable, {
        toValue: 1,
        duration: durationValue,
        useNativeDriver: true,
        }).start();
    };

    
      if (!fontsLoaded && !fontError) {
        return null;
      }
    return (
        <View style={styles.mainContainer}>
            <ImageBackground
                source= {require('./../../assets/gradientBackground.png')}
                style={styles.image}
                resizeMode='cover'
                blurRadius={40}
            >
                <Animated.View
                    style={[
                        styles.fadingHeader,
                        {
                            opacity: fadeAnimHeader,
                        },
                    ]}>
                    <Text style={styles.fadingText}>Zaloguj się</Text>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.fadingContainer,
                        {
                            opacity: fadeAnimContainer,
                        },
                    ]}>
                    <TextInput 
                        style={styles.input}
                        onChangeText={setLogin}
                        value={login}
                        placeholder='username lub email'/>
                    <TextInput 
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={true} 
                        placeholder='password'/>
                    <TouchableOpacity style={styles.logInButton}
                        onPress = {
                            ()=>{
                                
                            }
                        }
                    >
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4c669f', '#3b5998', '#192f6a']}>
                        <Text style={null}>Kontynuj jako gość</Text>
                        <Image source={require('./../../assets/lock-alt.png')} style={[styles.iconImage, {tintColor: 'white'}]}/>
                        </LinearGradient>
                        
                    </TouchableOpacity>
                </Animated.View>
            </ImageBackground>
        </View>
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    fadingHeader:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent: 'center',
        marginTop:100,
    },
    fadingContainer:{
        width:'90%',
        minHeight:300,
        display: 'flex',
        alignItems:'center',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginTop:50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
    },
    logoImage:{
        width:50,
        height:50,
    },
    fadingText:{
        color:'rgb(33,33,43)',
        fontWeight:'900',
        fontSize:34,
        letterSpacing:0.6,
        //fontFamily:'MPLUSRounded1c-ExtraBold'

    },
    input:{
        width:'90%',
        padding:5,
        borderBottomWidth:1,
        borderColor:'lightgray',
        fontSize:18,
    },
    logInButton:{

    },
})


export default HomeScreen;