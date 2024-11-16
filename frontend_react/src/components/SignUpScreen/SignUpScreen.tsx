import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { AxiosContext } from '../context/AxiosProvider/AxiosProvider';
import { AuthContext } from '../context/AuthContext/AuthContext';
import Button from '../Button/Button';
import './SignUpScreen.css'
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';

function SignUpScreen() {
    const [modalVisibility, setModalVisibility] = useState(false);
    const { publicAxios } = useContext(AxiosContext);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate()
    const { handleSubmit, watch, control, formState: { errors } } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            repeatedPassword: ""
        }
    });

    const onSubmit = async (data: { username: any; password: any; email: any; }) => {
        try {
            await publicAxios.post('/users/create', {
                nickname: data.username,
                password: data.password,
                email: data.email,
                logginMethod: 'Multilern'
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert("udało się zarejestrować");
            navigate('/login');
        } catch (error: any) {
            alert(`Register failed: ${error.response.data.message}`);
        }
    };

    const loginByDiscord = async () => {
        window.location.href = "http://localhost:3001/auth/discord";
    }

     useEffect(() => {
        // Check if we have the Discord auth code in the URL (redirect)
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const accessToken = urlParams.get('accessToken')
            const refreshToken = urlParams.get('refreshToken')

            if (accessToken && refreshToken) {
                // Exchange the code for an access token on the backend
        
                localStorage.setItem('auth', JSON.stringify({ accessToken, refreshToken }));
                console.log('dupa wszedłem tu dziala')

                authContext?.setAuthState({
                    accessToken,
                    refreshToken,
                    authenticated: true,
                });

                navigate('/main');
            }   
        }   
        catch(error: any) {
            alert(`Login Failed: ${error.response?.data?.message || 'Unexpected error'}`);
        }
        
    }, []);

    return (
        <div className="main-container">
            <div className={`modal ${modalVisibility ? 'visible' : ''}`}>
                <div className="modal-content">
                    <ErrorMessage errors={errors} name="username" render={({ message }) => <p className="error-message">{message}</p>} />
                    <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="error-message">{message}</p>} />
                    <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="error-message">{message}</p>} />
                    <ErrorMessage errors={errors} name="repeatedPassword" render={({ message }) => <p className="error-message">{message}</p>} />
                </div>
            </div>

            <div className="form-container">
                <h1>MultiLern</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="username"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <input
                                type="text"
                                placeholder="Podaj nazwę użytkownika"
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                            />
                        )}
                        rules={{ required: "Nazwa uzytkownika jest wymagana" }}
                    />

                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <input
                                type="email"
                                placeholder="Podaj email"
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                            />
                        )}
                        rules={{
                            required: "Email jest wymagany",
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Email jest niepoprawny"
                            }
                        }}
                    />

                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <input
                                type="password"
                                placeholder="Podaj hasło"
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                            />
                        )}
                        rules={{ required: "Hasło jest wymagane" }}
                    />

                    <Controller
                        name="repeatedPassword"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <input
                                type="password"
                                placeholder="Powtórz hasło"
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                            />
                        )}
                        rules={{
                            required: "Musisz podać ponownie hasło",
                            validate: (value) => value === watch('password') || 'Hasła muszą być identyczne'
                        }}
                    />
                    <Button fontColor="rgb(255, 255, 255)" colors={['rgb(33,33,43)','rgb(13,13,23)']} buttonAction={() => handleSubmit(onSubmit)}>Zarejestruj się</Button>
                </form>
                <div className="or-text">~ LUB UŻYJ ~</div>
                <div className="social-buttons">
                    <Button buttonAction={loginByDiscord} colors={[]}>Discord</Button>
                    <Button buttonAction={() => {}} fontColor="rgb(255, 255, 255)" colors={['rgb(33,33,43)','rgb(13,13,23)']}>Apple ID</Button>
                    <Button buttonAction={() => {}} fontColor="rgb(255, 255, 255)" colors={['rgb(33,33,43)','rgb(13,13,23)']}>Facebook</Button>
                </div>
            </div>
        </div>
    );
}

export default SignUpScreen;
