import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import SignUpScreen from './SignUpScreen';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { AxiosContext } from '../context/AxiosProvider/AxiosProvider';
import axios, { AxiosInstance } from 'axios';
import { Alert } from 'react-native';
import { openAuthSessionAsync, dismissBrowser } from 'expo-web-browser';


jest.mock("@react-native-async-storage/async-storage", () => require("../../__mocks__/mock-async-storage"));

jest.mock('expo-web-browser', () => ({
  openAuthSessionAsync: jest.fn().mockResolvedValueOnce({ type: 'success' }),
  dismissBrowser: jest.fn(),
}));

afterEach(cleanup);

describe('<SignUpScreen />', () => {
  it('renders correctly', () => {
    const mockPageSwitcher = jest.fn();
    const { toJSON } = render(<SignUpScreen pageSwitcher={mockPageSwitcher} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should switch screens when buttons are pressed', () => {
    const mockPageSwitcher = jest.fn();
    const { getByText } = render(<SignUpScreen pageSwitcher={mockPageSwitcher} />);

    fireEvent.press(getByText('Apple ID'));
    fireEvent.press(getByText('Facebook account'));

    expect(mockPageSwitcher).toHaveBeenCalledTimes(2);
  });

  it('should register successfully', async () => {
    const mockPublicAxios: AxiosInstance = axios.create();
    mockPublicAxios.post = jest.fn().mockResolvedValueOnce({});

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
            <AxiosContext.Provider value={{ authAxios: mockPublicAxios, publicAxios: mockPublicAxios}}>
          <SignUpScreen pageSwitcher={() => { }} />
        </AxiosContext.Provider>
      </AuthContext.Provider>
    );

    const usernameInput = getByPlaceholderText('Podaj nazwę użytkownika');
    const emailInput = getByPlaceholderText('Podaj email');
    const passwordInput = getByPlaceholderText('Podaj hasło ');
    const repeatedPasswordInput = getByPlaceholderText('Powtórz hasło ');
    const signUpButton = getByText('Zarejestruj się');

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'testpassword');
    fireEvent.changeText(repeatedPasswordInput, 'testpassword');
    fireEvent.press(signUpButton);

    await waitFor(() => {
        expect(mockPublicAxios.post).toHaveBeenCalledTimes(1)
        expect(mockPublicAxios.post).toHaveBeenCalledWith('/users/create', {
            nickname: 'testuser',
            password: 'testpassword',
            email: 'test@example.com',
            logginMethod: 'Multilern',
        }, 
        expect.objectContaining({
            headers: {
                'Content-Type': 'application/json',
            },
        }));
    });
  });

    it('should handle registration failure', async () => {
        const mockPublicAxios: AxiosInstance = axios.create();
        // Symulacja błędu rejestracji
        mockPublicAxios.post = jest.fn().mockRejectedValueOnce({response: { data: { message: 'Registration failed' } } });

        const { getByText, getByPlaceholderText} = render(
            <AxiosContext.Provider value={{ publicAxios: mockPublicAxios, authAxios: mockPublicAxios }}>
                <SignUpScreen pageSwitcher={() => { }} />
            </AxiosContext.Provider>
        );

        const usernameInput = getByPlaceholderText('Podaj nazwę użytkownika');
        const emailInput = getByPlaceholderText('Podaj email');
        const passwordInput = getByPlaceholderText('Podaj hasło ');
        const repeatedPasswordInput = getByPlaceholderText('Powtórz hasło ');
        const signUpButton = getByText('Zarejestruj się');

        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'testpassword');
        fireEvent.changeText(repeatedPasswordInput, 'testpassword');
        fireEvent.press(signUpButton);

        await waitFor(() => {
            expect(mockPublicAxios.post).toHaveBeenCalledTimes(1);
        });
    });


    it('should open authentication session with Discord', async () => {
        const { getByText } = render(<SignUpScreen pageSwitcher={() => { }} />);

        const discordButton = getByText('Discord');
        fireEvent.press(discordButton);

        await waitFor(() => {
            expect(openAuthSessionAsync).toHaveBeenCalledTimes(1);
            expect(dismissBrowser).toHaveBeenCalled();
        });
    });

    it('should display error message for repeated password input when passwords do not match', async () => {
        const mockPublicAxios: AxiosInstance = axios.create();
        mockPublicAxios.post = jest.fn().mockResolvedValueOnce({});

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

        const { getByPlaceholderText, getByText, rerender } = render(
        <AuthContext.Provider value={mockAuthContext}>
                <AxiosContext.Provider value={{ authAxios: mockPublicAxios, publicAxios: mockPublicAxios}}>
            <SignUpScreen pageSwitcher={() => { }} />
            </AxiosContext.Provider>
        </AuthContext.Provider>
        );

        const passwordInput = getByPlaceholderText('Podaj hasło ');
        const repeatedPasswordInput = getByPlaceholderText('Powtórz hasło ');
        const signUpButton = getByText('Zarejestruj się');

        fireEvent.changeText(passwordInput, 'password1');
        fireEvent.changeText(repeatedPasswordInput, 'password2');
        fireEvent.press(signUpButton);

        // Wait for the component to update
        await waitFor(() => {
        // Rerender the component
        rerender(
            <AuthContext.Provider value={mockAuthContext}>
                <AxiosContext.Provider value={{ authAxios: mockPublicAxios, publicAxios: mockPublicAxios}}>
                <SignUpScreen pageSwitcher={() => { }} />
            </AxiosContext.Provider>
            </AuthContext.Provider>
        );

        // Check if the error message appears
        expect(getByText('⚠ Hasła muszą być identyczne')).toBeTruthy();
        });
    });

    

});
