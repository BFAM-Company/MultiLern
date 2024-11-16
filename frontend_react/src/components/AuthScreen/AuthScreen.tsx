import React, { useCallback, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { UserDataContext } from '../context/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

function AuthScreen() {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserDataContext);

  const navigate = useNavigate();

  const loadJWT = useCallback(async () => {
    try {
      const value = localStorage.getItem('auth');
      if (value) {
        const jwt = JSON.parse(value);
        if (!jwt.accessToken) throw new Error('No access token');
        authContext?.setAuthState({
          accessToken: jwt.accessToken,
          refreshToken: jwt.refreshToken,
          authenticated: true,
        });
        userContext?.setUserData({
          id: -1,
          nickname: '',
          email: 'null',
          avatar: null,
        });
      }
    } catch (error) {
      await authContext?.logout();
    }
  }, [authContext, userContext]);

  useEffect(() => {
    loadJWT();
    const initialScreen = authContext && !authContext.authState.authenticated ? '/home' : '/main';
    navigate(initialScreen)

  }, [loadJWT]);

  // const initialScreen = authContext && !authContext.authState.authenticated ? '/home' : '/main';
  // useEffect(() => {
  //   navigate(initialScreen)
  // }, [initialScreen])

  return (
    <div style={{width: "100%", height: "100%", flex: 1, justifyContent: "center"}}>
      <div>Loading...</div>
    </div>
  );
}

export default AuthScreen;
