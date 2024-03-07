import React, { useContext, useEffect, useState } from 'react';
import {Alert, Animated, KeyboardAvoidingView, Modal, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { View, Text, ImageBackground, Image, Platform } from 'react-native';
import Button from '../Button/Button';
import { styles } from './SignUpScreen.styled';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AxiosContext } from '../context/AxiosProvider';

type FormData = {
	username: string,
	email: string,
	password: string,
	repeatedPassword: string
}

function SignUpScreen({pageSwitcher}: any) {
	const [modalVisibility, setModalVisibility] = useState(false)
	const {publicAxios} = useContext(AxiosContext);

	const {handleSubmit, watch, control, formState: {errors}} = useForm<FormData>({
		defaultValues: {
			username: "",
			email: "",
			password: "",
			repeatedPassword: ""
		}
	});

	const onSubmit = async (data: FormData) => {
    	console.log(data); 
		 try {
            await publicAxios.post('/users/create', {
                nickname: data.username,
                password: data.password,
				email: data.email
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
			Alert.alert('Success!', 'Rejestracja powiodła się!');
			pageSwitcher('LogIn')
        }
        catch(error: any){
            Alert.alert('Register failed', error.response.data.message);
        }
  	};

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
				<Modal
					animationType='slide'
					transparent={true}
					visible={modalVisibility}
					onRequestClose={() => {
						setModalVisibility(!modalVisibility)
					}}
				>
					<TouchableOpacity
					style={{
							width: '100%',
							height: '100%',
							//@ts-ignore
							cursor: 'default'
						}}
						onPress={() => setModalVisibility(false)}
						activeOpacity={1}
					>
					<View style={styles.centeredViewModal}>
						<View style={styles.modalView}>
							<ErrorMessage
								errors={errors}
								name='username'
								render={({message}) => <Text style={styles.errorMessage}>⚠ {message}</Text>}
							/>
							<ErrorMessage
								errors={errors}
								name='email'
								render={({message}) => <Text style={styles.errorMessage}>⚠ {message}</Text>}
							/>
							<ErrorMessage
								errors={errors}
								name='password'
								render={({message}) => <Text style={styles.errorMessage}>⚠ {message}</Text>}
							/>
							<ErrorMessage
								errors={errors}
								name='repeatedPassword'
								render={({message}) => <Text style={styles.errorMessage}>⚠ {message}</Text>}
							/>
						</View>
					</View>
					</TouchableOpacity>


				</Modal>
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
								<View
									style={{
										width: '100%',
										// display: 'flex',
										flexDirection: 'row',
										justifyContent:'center'
									}}
								>
								<Controller
									name='username'
									control={control}
									render={({field: {onChange, onBlur, value}}) => (
										<TextInput 
											style={styles.input} 
											placeholder='Podaj nazwę użytkownika'
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
											autoCapitalize='none'
											autoCorrect={false}/>
									)}
									rules={{required: "Nazwa uzytkownika jest wymagana",}}
									/>
									{/*TODO dodac to oczko do wiświetlania link: https://www.geeksforgeeks.org/how-to-show-and-hide-password-in-react-native/*/}
									{/* <MaterialCommunityIcons
										name='eye'
										size={24}
										style={{marginLeft: 10, width: '20%'}}
									/> */}
								</View>
								<Controller
									name='email'
									control={control}
									render={({field: {onChange, onBlur, value}}) => (
										<TextInput 
											style={styles.input} 
											placeholder='Podaj email'
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
											autoCapitalize='none'
											autoCorrect={false}/>
									)}
									rules={{
										required: "Email jest wymagany",
										pattern: {
											value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
											message: "Email jest niepoprawny"
										} }}
									/>
								
								<Controller
									name='password'
									control={control}
									render={({field: {onChange, onBlur, value}}) => (
										<TextInput 
											style={styles.input} 
											secureTextEntry={true}
											placeholder='Podaj hasło '
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
											autoCapitalize='none'
											autoCorrect={false}/>
										)}
									rules={{required: "Hasło jest wymagane",}}
									/>
									<Controller
										name='repeatedPassword'
										control={control}
										render={({field: {onChange, onBlur, value}}) => (
											<TextInput
												style={styles.input} 
												secureTextEntry={true}
												placeholder='Powtórz hasło '
												onBlur={onBlur}
												onChangeText={onChange}
												value={value}
												autoCapitalize='none'
												autoCorrect={false}/>
										)}
										rules={{
											required: "Musisz podać ponownie hasło",
											validate: (value) => value === watch('password') || 'Hasła muszą być identyczne'
										}}
									/>
                                <Button
                                    colors={['rgb(33,33,43)','rgb(13,13,23)']}
                                    buttonAction={handleSubmit(onSubmit, () => setModalVisibility(true))}
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
                                {/* <Button
                                        colors={['white']}
                                        buttonAction={() => {pageSwitcher('SignUp')}}
                                        icons={[require('./../../assets/lock-alt.png')]}>
                                    Utwórz konto w MultiLern
                                </Button> */}
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