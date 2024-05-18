import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react-native';
import AuthScreen from './AuthScreen';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { UserDataContext } from '../context/UserContext/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock("@react-native-async-storage/async-storage", () => require("../../__mocks__/mock-async-storage"));

afterEach(cleanup);

describe('<AuthScreen />', () => {
  it('should render loading indicator', () => {
    const mockPageSwitcher = jest.fn();
    const { getByTestId } = render(<AuthScreen pageSwitcher={mockPageSwitcher} />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('should switch screens based on authentication state', async () => {
    const mockPageSwitcher = jest.fn();
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
    
    const mockUserContext = {
      setUserData: jest.fn(),
      userData: {
        id: 1,
        nickname: 'JohnDoe',
        avatar: 'https://example.com/avatar.jpg',
        email: 'john.doe@example.com',
      }
    };

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <UserDataContext.Provider value={mockUserContext}>
          <AuthScreen pageSwitcher={mockPageSwitcher} />
        </UserDataContext.Provider>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(mockPageSwitcher).toHaveBeenCalledWith('Main');
    });
  });

    it('should handle loading JWT from AsyncStorage', async () => {
        const mockPageSwitcher = jest.fn();
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
            
        const mockUserContext = {
            setUserData: jest.fn(),
            userData: {
                id: 1,
                nickname: 'JohnDoe',
                avatar: 'https://example.com/avatar.jpg',
                email: 'john.doe@example.com',
            }
        };

        const mockAsyncStorageGetItem = jest.fn().mockResolvedValue(JSON.stringify({ accessToken: 'testAccessToken', refreshToken: 'testRefreshToken' }));
        AsyncStorage.getItem = mockAsyncStorageGetItem;

        render(
            <AuthContext.Provider value={mockAuthContext}>
            <UserDataContext.Provider value={mockUserContext}>
                <AuthScreen pageSwitcher={mockPageSwitcher} />
            </UserDataContext.Provider>
            </AuthContext.Provider>
        );

        await waitFor(() => {
            expect(mockAsyncStorageGetItem).toHaveBeenCalledWith('auth');
            expect(mockSetAuthState).toHaveBeenCalledWith({
                accessToken: 'testAccessToken',
                refreshToken: 'testRefreshToken',
                authenticated: true,
            });
            expect(mockUserContext.setUserData).toHaveBeenCalledWith({
                id: -1,
                nickname: '',
                email: 'null',
                avatar: null,
            });
            expect(mockPageSwitcher).toHaveBeenCalledWith('Main');
        });
    });

    it('should throw Error', async () => {
        const mockPageSwitcher = jest.fn();
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
            
        const mockUserContext = {
            setUserData: jest.fn(),
            userData: {
                id: 1,
                nickname: 'JohnDoe',
                avatar: 'https://example.com/avatar.jpg',
                email: 'john.doe@example.com',
            }
        };

        const mockAsyncStorageGetItem = jest.fn().mockResolvedValue(JSON.stringify({ accessToken: '', refreshToken: '' }));;
        AsyncStorage.getItem = mockAsyncStorageGetItem;

        render(
            <AuthContext.Provider value={mockAuthContext}>
            <UserDataContext.Provider value={mockUserContext}>
                <AuthScreen pageSwitcher={mockPageSwitcher} />
            </UserDataContext.Provider>
            </AuthContext.Provider>
        );

        await waitFor(() => {
            expect(mockAsyncStorageGetItem).toHaveBeenCalledWith('auth');
        });
    });


});
