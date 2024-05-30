import React, { ReactNode, createContext, useContext } from "react";
import axios, { AxiosInstance } from "axios";
import { AuthContext } from "../AuthContext/AuthContext";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL} from '@env'

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

interface AxiosContextProps {
  authAxios: AxiosInstance;
  publicAxios: AxiosInstance
}

const AxiosContext = createContext<AxiosContextProps>({
  authAxios: axios.create({
    baseURL: `${API_URL}/auth`,
  }),
  publicAxios: axios.create({
    baseURL: `${API_URL}`,
  })
});

const { Provider } = AxiosContext;

const AxiosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: `${API_URL}/auth`,
  });

  const publicAxios = axios.create({
    baseURL: `${API_URL}`,
  });

  authAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext?.authState.accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = (failedRequest: any) => {
    const data = {
      refreshToken: authContext?.authState.refreshToken,
    };

    const options = {
      method: "POST",
      data,
      url: `${API_URL}/auth/refresh`,
    };

    return axios(options)
      .then(async (tokenRefreshResponse: any) => {
        failedRequest.response.config.headers.Authorization =
          "Bearer " + tokenRefreshResponse.data;

        await AsyncStorage.setItem('auth',JSON.stringify({
            accessToken: tokenRefreshResponse.data,
            refreshToken: authContext?.authState.refreshToken,
        }))

        authContext?.setAuthState({
          ...authContext.authState,
          accessToken: tokenRefreshResponse.data,
        });
        
        return Promise.resolve();
      })
      .catch(async (e: any) => {
        authContext?.setAuthState({
          accessToken: null,
          refreshToken: null,
          authenticated: false
        });
        await AsyncStorage.clear()
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { AxiosContext, AxiosProvider };
