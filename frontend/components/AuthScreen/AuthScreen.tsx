import React, { useCallback, useContext, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Image, TouchableOpacity, Platform } from 'react-native';
import Button from '../Button/Button';
import { StylesVariables } from '../../utils/GLOBALS';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosContext } from '../context/AxiosProvider';
import { UserDataContext } from '../context/UserContext';



function AuthScreen({pageSwitcher}: any) {
    const authContext = useContext(AuthContext)
    const { publicAxios } = useContext(AxiosContext);
    const userContext = useContext(UserDataContext)


    const loadJWT = useCallback(async () => {
        try {
        const value = await AsyncStorage.getItem('auth');
          if (value) {
            const jwt = JSON.parse(value);
                if(jwt.accessToken === '')
                    throw new Error('chuj dupa kamien i kupa')
                authContext?.setAuthState({
                accessToken: jwt.accessToken || null,
                refreshToken: jwt.refreshToken || null,
                authenticated:  jwt.accessToken.length !== null,
                });
                userContext?.setUserData({
                    nickname: '',
                    email: 'null',
                    avatar: null,
                    isLogged: true
                })
          } else {
            console.error('Błąd pobierania hasła');
          }
        }
        catch(error: any){
            console.log(`LocalStorage Error: ${error.message}`);
            await authContext?.logout()
        }
    }, [])

    useEffect(() => {
        loadJWT();

    }, [loadJWT]);

    const initialScreen = authContext && (authContext.authState.authenticated === false || authContext.authState.authenticated === null) ? 'Home' : 'Main';

    pageSwitcher(initialScreen);

    return <></>
}



export default AuthScreen;