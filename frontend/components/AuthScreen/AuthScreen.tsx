import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Image, TouchableOpacity, Platform } from 'react-native';
import Button from '../Button/Button';
import { StylesVariables } from '../../utils/GLOBALS';
import { AuthContext } from '../context/AuthContext/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosContext } from '../context/AxiosProvider/AxiosProvider';
import { UserDataContext } from '../context/UserContext/UserContext';



function AuthScreen({pageSwitcher}: any) {
    const authContext = useContext(AuthContext)
    const userContext = useContext(UserDataContext)


    const loadJWT = useCallback(async () => {
        try {
        const value = await AsyncStorage.getItem('auth');
          if (value) {
            const jwt = JSON.parse(value);
                if(jwt.accessToken === '')
                    throw new Error('chuj dupa kamien i kupa')
                authContext?.setAuthState({
                accessToken: jwt.accessToken,
                refreshToken: jwt.refreshToken,
                authenticated:  jwt.accessToken.length !== null,
                });

                userContext?.setUserData({
                    id: -1,
                    nickname: '',
                    email: 'null',
                    avatar: null,
                })
          }
        }
        catch(error: any){
            await authContext?.logout()
        }
    }, [])

    useEffect(() => {
        loadJWT()
    }, [loadJWT]);


    const initialScreen = authContext && (authContext.authState.authenticated === false || authContext.authState.authenticated === null) ? 'Home' : 'Main';

    pageSwitcher(initialScreen);

    return (
        <View style={styles.mainContainer}>
            <ActivityIndicator testID='loading-indicator' size="large"/>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        height:'100%',
        flex: 1,
        justifyContent: 'center'
    }
})

export default AuthScreen;