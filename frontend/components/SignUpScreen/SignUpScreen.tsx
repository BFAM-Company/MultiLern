import React, { useEffect } from 'react';
import {Animated, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { View, Text, ImageBackground, Image, Platform } from 'react-native';
import Button from '../Button/Button';
import { useState } from 'react';
import { styles } from './SignUpScreen.styled';
import { useForm } from 'react-hook-form';

function SignUpScreen({pageSwitcher}: any) {
	const { register, handleSubmit, formState: { errors } } = useForm();

	const handleRegistration = (data: any) => console.log(data);
  const handleError = (errors: any) => {console.log(errors)};

	const fadeAnimHeader = React.useRef(new Animated.Value(0)).current;
	const fadeAnimContainer = React.useRef(new Animated.Value(1)).current;

    useEffect(() => {
        fadeIn(fadeAnimHeader, 3000);
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} 
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
                        <View style={styles.mainContentContainer}>
                            <View style={styles.formContainer}>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder='Podaj nazwę użytkownika'
																		{...register('username')}
                                    />
                                <TextInput 
                                    style={styles.input} 
                                    placeholder='Podaj email'
																		{...register('email')}
                                    />
                                <TextInput 
                                    style={styles.input} 
                                    secureTextEntry={true}
                                    placeholder='Podaj hasło '
																		{...register('password')}
                                    />
                                <TextInput 
                                    style={styles.input} 
                                    secureTextEntry={true}
                                    placeholder='Powtórz hasło '
																		{...register('repeatedPassword')}
                                    />
                                <Button
                                    colors={['rgb(33,33,43)','rgb(13,13,23)']}
                                    buttonAction={() => {handleSubmit(handleRegistration)}}
                                    icons={[require('./../../assets/logIn-icon.png')]}
                                    fontColor='white'>
                                    Zarejestruj się
                                </Button>
                            </View>

                            <View style={styles.ORTextContainer}>
                                <Text style={styles.mainText}>~ LUB UŻYJ ~</Text>
                            </View>

                            <View style={styles.buttonsContainer}>                            
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
                        </View>
                </Animated.View>
            </View>
        </ImageBackground>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;