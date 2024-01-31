import React, { useEffect } from 'react';
import {Animated, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { View, Text, ImageBackground, Image, Platform } from 'react-native';
import Button from '../Button/Button';
import { useState } from 'react';
import { styles } from './SignUpScreen.styled';


function SignUpScreen({pageSwitcher}: any) {
  const [username, setUsername] = useState<string | undefined>(undefined)
	const [email, setEmail] = useState<string | undefined>(undefined)
	const [passwordText, setPasswordText] = useState<string | undefined>(undefined)
	const [repeatedPasswordText, setRepeatedPasswordText] = useState<string | undefined>(undefined)
  // const [scroll, setScroll] = useState<boolean>(false)

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
    // const scrollBehaviorChange = () =>{
    //     setScroll(!scroll)
    // }

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.mainContainer, {flex:1}]}
    >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} 
          // scrollEnabled={scroll}
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
                                value={username} 
                                onChangeText={setUsername} 
                                placeholder='Podaj nazwę użytkownika'
                                // onPressIn={scrollBehaviorChange}
                                // onPressOut={scrollBehaviorChange}
                                />
                            <TextInput 
                                style={styles.input} 
                                value={email} 
                                onChangeText={setEmail} 
                                placeholder='Podaj email'
                                // onPressIn={scrollBehaviorChange}
                                // onPressOut={scrollBehaviorChange}
                                />
                            <TextInput 
                                style={styles.input} 
                                value={passwordText} 
                                secureTextEntry={true}
                                onChangeText={setPasswordText} 
                                placeholder='Hasło '
                                // onPressIn={scrollBehaviorChange}
                                // onPressOut={scrollBehaviorChange}
                                />
                            <TextInput 
                                style={styles.input} 
                                value={repeatedPasswordText} 
                                secureTextEntry={true}
                                onChangeText={setPasswordText} 
                                placeholder='Powtórz hasło '
                                // onPressIn={scrollBehaviorChange}
                                // onPressOut={scrollBehaviorChange}
                                />
                            <Button
                                colors={['rgb(33,33,43)','rgb(13,13,23)']}
                                buttonAction={() => {pageSwitcher('SignUp')}}
                                icons={[require('./../../assets/logIn-icon.png')]}
                                fontColor='white'>
                                Zarejestruj się
                            </Button>
                            

                            <View style={styles.ORTextContainer}>
                                <Text style={styles.mainText}>~ LUB UŻYJ ~</Text>
                            </View>
                            <Button
                                colors={['white']}
                                buttonAction={() => {pageSwitcher('SignUp')}}
                                icons={[require('./../../assets/googleIcon.png')]}>
                            Google account
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

export default SignUpScreen;