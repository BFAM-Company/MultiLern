import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { AxiosContext } from '../context/AxiosProvider/AxiosProvider';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import './LogInScreen.css';

function LogInScreen() {
    const [login, setLogin] = useState<string | undefined>(undefined);
    const [passwordText, setPasswordText] = useState<string | undefined>(undefined);
    const authContext = useContext(AuthContext);
    const { authAxios } = useContext(AxiosContext);
    const navigate = useNavigate();

    const fadeAnimHeader = useRef(0);
    const fadeAnimContainer = useRef(1);

    const onLogin = async () => {
        console.log("dupa")
        console.log(import.meta.env.VITE_API_URL)
        try {
            const res = await authAxios.post('/login', {
                username: login,
                password: passwordText,
                isLogingFromOutside: false,
                logginMethod: 'Multilern',
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.data) {
                const { accessToken, refreshToken } = res.data;
                localStorage.setItem('auth', JSON.stringify({ accessToken, refreshToken }));
                authContext?.setAuthState({
                    accessToken,
                    refreshToken,
                    authenticated: true,
                });

                navigate('/main');
            } else {
                alert('Login Failed: Invalid credentials');
            }
        } catch (error: any) {
            alert(`Login Failed: ${error.response?.data?.message || 'Unexpected error'}`);
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

    useEffect(() => {
        // Simulating animation effect
        fadeAnimHeader.current = 1;
        fadeAnimContainer.current = 1;
    }, []);

    return (
        <div className="login-main-container">
            <div className="login-image-background">
                <div className="login-account-create-container">
                    <div className="login-fading-header">
                        <div className="login-logo-container">
                            <img src="./../../assets/multilern-logo.png" alt="Logo" className="login-logo-image" />
                            <h1 className="login-title-text">MultiLern</h1>
                        </div>
                        <div className="login-main-text-container">
                            <p className="login-main-text">
                                Dołącz do nas i podnieść swoją naukę na wyższy poziom
                            </p>
                        </div>
                    </div>
                    <div className="login-buttons-container">
                        <input
                            type="text"
                            className="login-input"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="Nazwa użytkownika lub email"
                        />
                        <input
                            type="password"
                            className="login-input"
                            value={passwordText}
                            onChange={(e) => setPasswordText(e.target.value)}
                            placeholder="Hasło"
                        />
                        <Button buttonAction={() => onLogin()} fontColor="rgb(255, 255, 255)" colors={['rgb(33,33,43)','rgb(13,13,23)']}>
                            Zaloguj się
                        </Button>
                        <div className="login-or-text-container">
                            <p className="login-main-text">~ LUB UŻYJ ~</p>
                        </div>
                        <Button buttonAction={(loginByDiscord)} fontColor="rgb(255, 255, 255)" colors={['rgb(33,33,43)','rgb(13,13,23)']}>
                            Discord
                        </Button>
                        <Button buttonAction={() => navigate('/signup')} fontColor="rgb(255, 255, 255)" colors={['rgb(33,33,43)','rgb(13,13,23)']}>
                            Utwórz konto w MultiLern
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogInScreen;
