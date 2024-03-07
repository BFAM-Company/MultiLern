import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, ReactNode, useContext } from "react";
import { UserDataContext } from "./UserContext";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  authenticated: boolean | null;
}

export interface AuthContextType {
  authState: AuthState;
  getAccessToken: () => string | null;
  setAuthState: (state: AuthState) => void;
  logout: () => Promise<void>;
}

const initialAuthState: AuthState = {
  accessToken: null,
  refreshToken: null,
  authenticated: false,
};

const AuthContext = createContext<AuthContextType | null>(null);
const { Provider } = AuthContext;

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const userContext = useContext(UserDataContext)


  const logout = async () => {
    await AsyncStorage.clear()
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
    userContext?.setUserData({
      nickname: '',
      email: 'null',
      avatar: null,
      isLogged: false
    })
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
