import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

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
  logout: () => void;
}

const initialAuthState: AuthState = {
  accessToken: null,
  refreshToken: null,
  authenticated: false,
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  const logout = () => {
    localStorage.clear();
    setAuthState(initialAuthState);
  };

  const getAccessToken = () => authState.accessToken;

  return (
    <AuthContext.Provider value={{ authState, getAccessToken, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
