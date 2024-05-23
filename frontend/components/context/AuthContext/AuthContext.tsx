import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from "react";
import { UserDataContext } from "../UserContext/UserContext";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  authenticated: boolean | null;
  isLoggingByGuest?: boolean | null;
}

export interface AuthContextType {
  authState: AuthState;
  getAccessToken: () => string | null;
  setAuthState: Dispatch<SetStateAction<AuthState>>;
  logout: () => Promise<void>;
}

const initialAuthState: AuthState = {
  accessToken: null,
  refreshToken: null,
  authenticated: false,
  isLoggingByGuest: false
};

const AuthContext = createContext<AuthContextType | null>(null);
const { Provider } = AuthContext;

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const userContext = useContext(UserDataContext)


  const logout = async () => {
    userContext?.setUserData({
      id: -1,
      nickname: '',
      email: 'null',
      avatar: null,
    })
    await AsyncStorage.clear()
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
      isLoggingByGuest: false
    });
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
