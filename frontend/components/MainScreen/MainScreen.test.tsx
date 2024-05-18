import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react-native';
import MainScreen from './MainScreen';
import UserModal from './MainScreenComponents/UserModal/UserModal';
import NotificationModal from './MainScreenComponents/NotificationModal/NotificationModal';
import axios, { AxiosInstance } from 'axios';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { AxiosContext } from '../context/AxiosProvider/AxiosProvider';
import { UserDataContext } from '../context/UserContext/UserContext';

jest.mock("@react-native-async-storage/async-storage", () => require("../../__mocks__/mock-async-storage"));

const mockAuthAxios = axios.create();


describe('MainScreen', () => {
  afterEach(cleanup);
    it('renders correctly', () => {
        const mockPageSwitcher = jest.fn();
        const { toJSON } = render(<MainScreen pageSwitcher={mockPageSwitcher} />);
        expect(toJSON()).toMatchSnapshot();
    });

    it('renders UserModal with correct data when visible', () => {
        const mockPageSwitcher = jest.fn();
        const mockUser = {
            id: 1,
            nickname: 'JohnDoe',
            avatar: 'https://example.com/avatar.jpg',
            email: 'john.doe@example.com',
        };
        const { getByText } = render(<UserModal buttonAction={mockPageSwitcher} hideHandler={() => {}} isVisible={true} user={mockUser} />);
        expect(getByText('JohnDoe')).toBeTruthy();
        expect(getByText('john.doe@example.com')).toBeTruthy();
    });

    it('should show UserModal when userModalShowHandler is called', () => {
        const mockPageSwitcher = jest.fn();
        const { getByTestId, getByText } = render(<MainScreen pageSwitcher={mockPageSwitcher} />);
        fireEvent.press(getByTestId('userModalButton'));
        expect(getByText('Wyszukaj')).toBeTruthy();
    });

    it('should show NotificationModal when notificationModalShowHandler is called', () => {
        const mockPageSwitcher = jest.fn();
        const { getByTestId, getByText } = render(<MainScreen pageSwitcher={mockPageSwitcher} />);
        fireEvent.press(getByTestId('notificationModalButton'));
        expect(getByText('Wyszukaj')).toBeTruthy(); 
    });

    it('should hide UserModal when userModalHideHandler is called', async () => {
        const mockPageSwitcher = jest.fn();
        const { getByTestId, queryByText, findByTestId} = render(<MainScreen pageSwitcher={mockPageSwitcher} />);
        
        // Show the UserModal
        fireEvent.press(getByTestId('userModalButton'));

        // Now find the backdrop and press it
        const backdrop = getByTestId('userModalBackdrop');
        fireEvent.press(backdrop);
        
        // Wait for the modal to become hidden
        await waitFor(() => {
            expect(queryByText('Johny123')).toBeFalsy();
        });
    });

    it('should hide NotificationModal when notificationModalHideHandler is called', async () => {
        const mockPageSwitcher = jest.fn();
        const { getByTestId, queryByText } = render(<MainScreen pageSwitcher={mockPageSwitcher} />);
        fireEvent.press(getByTestId('notificationModalButton'));
        fireEvent.press(getByTestId('hideNotificationModalButton'));
        
        await waitFor(() => {
            expect(queryByText('Wyszukaj')).toBeFalsy(); 
        });
    });

    it('fetches user data successfully', async () => {
        const setUserData = jest.fn();
        mockAuthAxios.get = jest.fn().mockResolvedValueOnce({ 
        data: {
            id: 1,
            nickname: 'testuser',
            avatar: 'testavatar.png',
            email: 'testuser@example.com',
        }
        });

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
            id: -1,
            nickname: '',
            email: 'null',
            avatar: null,
        }

        const { getByTestId } = render(
        <AuthContext.Provider value={mockAuthContext}>
            <AxiosContext.Provider value={{ authAxios: mockAuthAxios, publicAxios: mockAuthAxios}}>
            <UserDataContext.Provider value={{ setUserData: setUserData, userData: mockUserContext }}>
                <MainScreen pageSwitcher={() => {}} />
            </UserDataContext.Provider>
            </AxiosContext.Provider>
        </AuthContext.Provider>
        );

        await waitFor(() => expect(mockAuthAxios.get).toHaveBeenCalledTimes(1));
        expect(mockAuthAxios.get).toHaveBeenCalledWith('/users/me');

        // Assert that setUserData has been called with the expected user data
        expect(setUserData).toHaveBeenCalledWith({
        id: 1,
        nickname: 'testuser',
        avatar: { uri: 'testavatar.png' },
        email: 'testuser@example.com',
        });
    });

    it('handles authentication failure', async () => {
    const setAuthState = jest.fn();

    mockAuthAxios.get = jest.fn().mockRejectedValueOnce({});
    
    const mockAuthContext = {
        setAuthState: setAuthState,
        getAccessToken: jest.fn(() => ''),
        logout: jest.fn(),
        authState: {
            accessToken: '',
            refreshToken: '',
            authenticated: false,
            isLoggingByGuest: false,
        }
    };

    const { getByTestId } = render(
        <AuthContext.Provider value={mockAuthContext}>
            <AxiosContext.Provider value={{ authAxios: mockAuthAxios, publicAxios: mockAuthAxios}}>
                <UserDataContext.Provider value={{ setUserData: jest.fn(), userData: {id: -1, nickname: 'Gość', email: '', avatar: 'dupa dupa.png'} }}>
                    <MainScreen pageSwitcher={() => {}} />
                </UserDataContext.Provider>
            </AxiosContext.Provider>
        </AuthContext.Provider>
    );

    await waitFor(() => expect(mockAuthAxios.get).toHaveBeenCalledTimes(1));
    expect(setAuthState).toHaveBeenCalledWith({
        accessToken: '',
        refreshToken: '',
        authenticated: false,
    });
});

it('handles fetching data failure', async () => {
    const setUserData = jest.fn();

    mockAuthAxios.get = jest.fn().mockRejectedValueOnce({});
    
    const mockAuthContext = {
        setAuthState: jest.fn(),
        getAccessToken: jest.fn(() => 'testAccessToken'),
        logout: jest.fn(),
        authState: {
            accessToken: 'testAccessToken',
            refreshToken: 'testRefreshToken',
            authenticated: true,
            isLoggingByGuest: false,
        }
    };

    const { getByTestId } = render(
        <AuthContext.Provider value={mockAuthContext}>
            <AxiosContext.Provider value={{ authAxios: mockAuthAxios, publicAxios: mockAuthAxios}}>
                <UserDataContext.Provider value={{ setUserData: setUserData, userData: {id: -1, nickname: 'Gość', email: '', avatar: 'dupa dupa.png'} }}>
                    <MainScreen pageSwitcher={() => {}} />
                </UserDataContext.Provider>
            </AxiosContext.Provider>
        </AuthContext.Provider>
    );

    await waitFor(() => expect(mockAuthAxios.get).toHaveBeenCalledTimes(1));
    expect(setUserData).not.toHaveBeenCalled();
});

it('handles guest login', async () => {
    const setUserData = jest.fn();

    mockAuthAxios.get = jest.fn().mockRejectedValueOnce({});
    
    const mockAuthContext = {
        setAuthState: jest.fn(),
        getAccessToken: jest.fn(() => ''),
        logout: jest.fn(),
        authState: {
            accessToken: '',
            refreshToken: '',
            authenticated: false,
            isLoggingByGuest: true,
        }
    };

    const { getByTestId } = render(
        <AuthContext.Provider value={mockAuthContext}>
            <AxiosContext.Provider value={{ authAxios: mockAuthAxios, publicAxios: mockAuthAxios}}>
                <UserDataContext.Provider value={{ setUserData: setUserData, userData: {id: -1, nickname: 'Gość', email: '', avatar: null} }}>
                    <MainScreen pageSwitcher={() => {}} />
                </UserDataContext.Provider>
            </AxiosContext.Provider>
        </AuthContext.Provider>
    );

    await waitFor(() => {
        expect(mockAuthAxios.get).toHaveBeenCalledTimes(0);
        expect(setUserData).toHaveBeenCalledWith({
            id: -1,
            nickname: 'Gość',
            avatar: 1,
            email: '',
        });
    })
});


});
