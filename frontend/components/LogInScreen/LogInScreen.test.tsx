import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import LogInScreen from './LogInScreen';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { AxiosContext } from '../context/AxiosProvider/AxiosProvider';
import axios, { AxiosInstance } from 'axios';
import { Alert } from 'react-native';
import { dismissBrowser, openAuthSessionAsync } from 'expo-web-browser';


jest.mock("@react-native-async-storage/async-storage", () => require("../../__mocks__/mock-async-storage"));

jest.mock('expo-web-browser', () => ({
  openAuthSessionAsync: jest.fn().mockResolvedValueOnce({ type: 'success' }),
  dismissBrowser: jest.fn(),
}));

afterEach(cleanup);

describe('<LogInScreen />', () => {
   it('renders correctly', () => {
    const mockPageSwitcher = jest.fn();
    const { toJSON } = render(<LogInScreen pageSwitcher={mockPageSwitcher} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('Buttons should switch screens when pressed', () => {
    const mockPageSwitcher = jest.fn();
    const { getByText } = render(
      <LogInScreen pageSwitcher={mockPageSwitcher} />,
    );

    fireEvent.press(getByText('Utwórz konto w MultiLern'));
    fireEvent.press(getByText('Apple ID'));
    fireEvent.press(getByText('Facebook account'));
    fireEvent.press(getByText('Utwórz konto w MultiLern'));

    expect(mockPageSwitcher).toHaveBeenCalledTimes(4);
  });

  it('should login successfully', async () => {
    const mockAuthAxios: AxiosInstance = axios.create();
    mockAuthAxios.post = jest.fn().mockResolvedValueOnce({ data: { accessToken: 'mockAccessToken', refreshToken: 'mockRefreshToken' } });

    const mockSetAuthState = jest.fn();
    const mockGetAccessToken = jest.fn(() => 'testAccessToken');
    const mockLogout = jest.fn();

    const mockAuthContext = {
        setAuthState: mockSetAuthState,
        getAccessToken: mockGetAccessToken,
        logout: mockLogout,
        authState: {
            accessToken: 'mockAccessToken',
            refreshToken: 'mockRefreshToken',
            authenticated: true,
            isLoggingByGuest: false,
        }
    };

    const { getByPlaceholderText, getByText } = render(
        <AuthContext.Provider value={mockAuthContext}>
            <AxiosContext.Provider value={{ authAxios: mockAuthAxios, publicAxios: mockAuthAxios}}>
                <LogInScreen pageSwitcher={() => { }} />
            </AxiosContext.Provider>
        </AuthContext.Provider>
    );

    const loginInput = getByPlaceholderText('Nazwa użytkownika lub email');
    const passwordInput = getByPlaceholderText('Hasło');
    const loginButton = getByText('Zaloguj się');

    fireEvent.changeText(loginInput, 'testuser');
    fireEvent.changeText(passwordInput, 'testpassword');
    fireEvent.press(loginButton);

   await waitFor(() => expect(mockAuthAxios.post).toHaveBeenCalledTimes(1));
    expect(mockAuthAxios.post).toHaveBeenCalledWith('/login', {
        username: 'testuser',
        password: 'testpassword',
        isLogingFromOutside: false,
        logginMethod: 'Multilern',
    }, 
    expect.objectContaining({
        headers: {
            'Content-Type': 'application/json',
        },
    }));
  });

  it('should handle login failure due to invalid credentials', async () => {
    const mockAuthAxios: AxiosInstance = axios.create();
    // Używamy mockResolvedValueOnce, ale zwracamy obiekt odpowiedzi bez pola data
    mockAuthAxios.post = jest.fn().mockResolvedValueOnce({});

    const mockSetAuthState = jest.fn();
    const mockGetAccessToken = jest.fn(() => 'testAccessToken');
    const mockLogout = jest.fn();

    const mockAuthContext = {
        setAuthState: mockSetAuthState,
        getAccessToken: mockGetAccessToken,
        logout: mockLogout,
        authState: {
            accessToken: '',
            refreshToken: '',
            authenticated: false,
            isLoggingByGuest: false,
        }
    };

    const { getByPlaceholderText, getByText, queryByText, debug } = render(
        <AuthContext.Provider value={mockAuthContext}>
            <AxiosContext.Provider value={{ authAxios: mockAuthAxios, publicAxios: mockAuthAxios}}>
                <LogInScreen pageSwitcher={() => { }} />
            </AxiosContext.Provider>
        </AuthContext.Provider>
    );

    const loginInput = getByPlaceholderText('Nazwa użytkownika lub email');
    const passwordInput = getByPlaceholderText('Hasło');
    const loginButton = getByText('Zaloguj się');

    fireEvent.changeText(loginInput, 'testuser');
    fireEvent.changeText(passwordInput, 'testpassword');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockAuthAxios.post).toHaveBeenCalledTimes(1)
      const alertSpy = jest.spyOn(Alert, 'alert')
      expect(alertSpy).toHaveBeenCalledWith('Login Failed', 'Nieprawidłowe dane spierdalaj')
    });
  });

  it('should handle login failure due to backend connection issue', async () => {
    const mockAuthAxios: AxiosInstance = axios.create();
    mockAuthAxios.post = jest.fn().mockRejectedValueOnce({ response: { data: { message: 'Network Error' } } });


    const mockSetAuthState = jest.fn();
    const mockGetAccessToken = jest.fn(() => 'testAccessToken');
    const mockLogout = jest.fn();

    const mockAuthContext = {
        setAuthState: mockSetAuthState,
        getAccessToken: mockGetAccessToken,
        logout: mockLogout,
        authState: {
            accessToken: null,
            refreshToken: null,
            authenticated: false,
            isLoggingByGuest: false,
        }
    };

    const { getByPlaceholderText, getByText } = render(
        <AuthContext.Provider value={mockAuthContext}>
            <AxiosContext.Provider value={{ authAxios: mockAuthAxios, publicAxios: mockAuthAxios}}>
                <LogInScreen pageSwitcher={() => { }} />
            </AxiosContext.Provider>
        </AuthContext.Provider>
    );

    const loginInput = getByPlaceholderText('Nazwa użytkownika lub email');
    const passwordInput = getByPlaceholderText('Hasło');
    const loginButton = getByText('Zaloguj się');

    fireEvent.changeText(loginInput, 'testuser');
    fireEvent.changeText(passwordInput, 'testpassword');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockAuthAxios.post).toHaveBeenCalledTimes(1)
      const alertSpy = jest.spyOn(Alert, 'alert')
      expect(alertSpy).toHaveBeenCalledWith("Login Failed", "Network Error")
    })
  });

  it('should open authentication session with Discord', async () => {
        const { getByText } = render(<LogInScreen pageSwitcher={() => { }} />);

        const discordButton = getByText('Discord');
        fireEvent.press(discordButton);

        await waitFor(() => {
            expect(openAuthSessionAsync).toHaveBeenCalledTimes(1);
            expect(dismissBrowser).toHaveBeenCalled();
        });
    });

});
