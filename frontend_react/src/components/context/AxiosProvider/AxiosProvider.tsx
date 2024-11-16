import React, { ReactNode, createContext, useContext } from "react";
import axios, { AxiosInstance } from "axios";
import { AuthContext } from "../AuthContext/AuthContext";
import createAuthRefreshInterceptor from "axios-auth-refresh";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

interface AxiosContextProps {
  authAxios: AxiosInstance;
  publicAxios: AxiosInstance;
}

// Kontekst Axios
const AxiosContext = createContext<AxiosContextProps>({
  authAxios: axios.create({
    // baseURL: `${process.env.REACT_APP_API_URL}/auth`,
    baseURL: `${import.meta.env.VITE_API_URL}/auth`,
  }),
  publicAxios: axios.create({
    // baseURL: `${process.env.REACT_APP_API_URL}`,
    baseURL: `${import.meta.env.VITE_API_URL}`,
  }),
});

const { Provider } = AxiosContext;

const AxiosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    // baseURL: `${process.env.REACT_APP_API_URL}/auth`,
    baseURL: `${import.meta.env.VITE_API_URL}/auth`,
  });

  const publicAxios = axios.create({
    // baseURL: `${process.env.REACT_APP_API_URL}`,
    baseURL: `${import.meta.env.VITE_API_URL}`,
  });

  // Interceptor dodający nagłówki autoryzacji
  authAxios.interceptors.request.use(
    (config) => {
      if (authContext?.authState.accessToken) {
        config.headers.Authorization = `Bearer ${authContext.authState.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Funkcja obsługująca odświeżanie tokenu
  const refreshAuthLogic = (failedRequest: any) => {
    const data = {
      refreshToken: authContext?.authState.refreshToken,
    };

    return axios
      // .post(`${process.env.REACT_APP_API_URL}/auth/refresh`, data)
      .post(`${import.meta.env.VITE_API_URL}/auth/refresh`, data)
      .then((tokenRefreshResponse) => {
        const newAccessToken = tokenRefreshResponse.data;

        // Ustawienie nowego tokenu w localStorage
        localStorage.setItem(
          "auth",
          JSON.stringify({
            accessToken: newAccessToken,
            refreshToken: authContext?.authState.refreshToken,
          })
        );

        // Aktualizacja stanu kontekstu
        authContext?.setAuthState((prevState) => ({
          ...prevState,
          accessToken: newAccessToken,
        }));

        // Ponowienie oryginalnego żądania
        failedRequest.response.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return Promise.resolve();
      })
      .catch(() => {
        // Wylogowanie w przypadku niepowodzenia
        authContext?.setAuthState({
          accessToken: null,
          refreshToken: null,
          authenticated: false,
        });
        localStorage.clear();
      });
  };

  // Dodanie interceptora obsługującego odświeżanie tokenu
  createAuthRefreshInterceptor(authAxios, refreshAuthLogic);

  return (
    <Provider value={{ authAxios, publicAxios }}>
      {children}
    </Provider>
  );
};

export { AxiosContext, AxiosProvider };
