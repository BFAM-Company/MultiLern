import React from 'react';
import { render, cleanup, fireEvent, waitFor, userEvent } from '@testing-library/react-native';
import FlashcardsListScreen from './FlashcardsListScreen';
import { AxiosContext } from '../../context/AxiosProvider/AxiosProvider';
import axios from 'axios';
import { UserDataContext } from '../../context/UserContext/UserContext';
import { AuthContext } from '../../context/AuthContext/AuthContext';

jest.mock("@react-native-async-storage/async-storage", () => require("../../../__mocks__/mock-async-storage"));


describe('FlashcardsListScreen', () => {
    afterEach(cleanup);

    it('calls pageSwitcher when FlashcardListItem is pressed', async () => {
        const mockPublicAxios = axios.create();
        mockPublicAxios.get = jest.fn().mockResolvedValueOnce({
            data: [
                {
                    id: 1,
                    title: 'Dupa'
                },
                {
                    id: 2,
                    title: 'Dupa 2'
                }
            ]
        })


        const mockPageSwitcher = jest.fn();
        const { getByText } = render(
            <AxiosContext.Provider value={{authAxios: mockPublicAxios, publicAxios: mockPublicAxios}}>
                <FlashcardsListScreen pageSwitcher={mockPageSwitcher} range="all" />
            </AxiosContext.Provider>
        );
        await waitFor(() => {
            expect(mockPublicAxios.get).toHaveBeenCalledWith('/fiches/0')
        })
        fireEvent.press(getByText('Dupa'));
        expect(mockPageSwitcher).toHaveBeenCalledWith('FlashcardsSet', { id: 1 });
    });

    it('renders "my" flashcards', async () => {
        const mockPublicAxios = axios.create();
        mockPublicAxios.get = jest.fn().mockResolvedValueOnce({
            data: [
                {
                    id: 1,
                    title: 'Dupa'
                },
                {
                    id: 2,
                    title: 'Dupa 2'
                }
            ]
        })
        const mockUserContext = {
            setUserData: jest.fn(),
            userData: {
                id: 1,
                nickname: 'JohnDoe',
                avatar: 'https://example.com/avatar.jpg',
                email: 'john.doe@example.com',
            }
        };

        const mockPageSwitcher = jest.fn();
        const { getByText } = render(
            <AxiosContext.Provider value={{authAxios: mockPublicAxios, publicAxios: mockPublicAxios}}>
                <UserDataContext.Provider value={mockUserContext}>
                    <FlashcardsListScreen pageSwitcher={mockPageSwitcher} range="my" />
                </UserDataContext.Provider>
            </AxiosContext.Provider>
        );
        await waitFor(() => {
            expect(mockPublicAxios.get).toHaveBeenCalledWith('/fiches/userId/1/0')
        })
    });

    it('calls Network Error while rendering "my" flashcards', async () => {
        const mockPublicAxios = axios.create();
        mockPublicAxios.get = jest.fn().mockRejectedValueOnce({ response: { data: { message: 'Network Error' } } });
        const mockUserContext = {
            setUserData: jest.fn(),
            userData: {
                id: 1,
                nickname: 'JohnDoe',
                avatar: 'https://example.com/avatar.jpg',
                email: 'john.doe@example.com',
            }
        };

        const mockPageSwitcher = jest.fn();
        const { getByText } = render(
            <AxiosContext.Provider value={{authAxios: mockPublicAxios, publicAxios: mockPublicAxios}}>
                <UserDataContext.Provider value={mockUserContext}>
                    <FlashcardsListScreen pageSwitcher={mockPageSwitcher} range="my" />
                </UserDataContext.Provider>
            </AxiosContext.Provider>
        );
        await waitFor(() => {
            expect(mockPublicAxios.get).toHaveBeenCalledWith('/fiches/userId/1/0')
        })
    });

    it('calls deleteFlashcard function when delete button is pressed', async () => {
        const mockPublicAxios = axios.create();
        mockPublicAxios.get = jest.fn().mockResolvedValueOnce({
            data: [
                {
                    id: 1,
                    title: 'Dupa'
                }
            ]
        })
        const mockAuthAxios = axios.create();
        mockAuthAxios.delete = jest.fn().mockResolvedValueOnce({});

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

        const { getByText, getByTestId } = render(
            <AxiosContext.Provider value={{authAxios: mockAuthAxios, publicAxios: mockPublicAxios}}>
                <AuthContext.Provider value={mockAuthContext}>
                    <UserDataContext.Provider value={mockUserContext}>
                        <FlashcardsListScreen pageSwitcher={() => {}} range="my" />
                    </UserDataContext.Provider>
                </AuthContext.Provider>
            </AxiosContext.Provider>
        );

        await waitFor(() => {
            expect(mockPublicAxios.get).toHaveBeenCalledWith('/fiches/userId/1/0')
        })

        await waitFor(() => {
            fireEvent.press(getByTestId('trash-icon'));
            fireEvent.press(getByText('Usuń'));
            expect(mockAuthAxios.delete).toHaveBeenCalledWith('/fiches/1');
        })
    });

     it('calls deleteFlashcard function Network Error when delete button is pressed', async () => {
        const mockPublicAxios = axios.create();
        mockPublicAxios.get = jest.fn().mockResolvedValueOnce({
            data: [
                {
                    id: 1,
                    title: 'Dupa'
                }
            ]
        })
        const mockAuthAxios = axios.create();
        mockAuthAxios.delete = jest.fn().mockRejectedValueOnce({ response: { data: { message: 'Network Error' } } });

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

        const { getByText, getByTestId } = render(
            <AxiosContext.Provider value={{authAxios: mockAuthAxios, publicAxios: mockPublicAxios}}>
                <AuthContext.Provider value={mockAuthContext}>
                    <UserDataContext.Provider value={mockUserContext}>
                        <FlashcardsListScreen pageSwitcher={() => {}} range="my" />
                    </UserDataContext.Provider>
                </AuthContext.Provider>
            </AxiosContext.Provider>
        );

        await waitFor(() => {
            expect(mockPublicAxios.get).toHaveBeenCalledWith('/fiches/userId/1/0')
        })

        await waitFor(() => {
            fireEvent.press(getByTestId('trash-icon'));
            fireEvent.press(getByText('Usuń'));
            expect(mockAuthAxios.delete).toHaveBeenCalledWith('/fiches/1');
        })
    });

    it('renders empty component when data is empty', async () => {
        const mockPublicAxios = axios.create();
        mockPublicAxios.get = jest.fn().mockResolvedValueOnce({
            data: []
        })
        const { getByText } = render(
            <AxiosContext.Provider value={{authAxios: mockPublicAxios, publicAxios: mockPublicAxios}}>
                <FlashcardsListScreen pageSwitcher={() => {}} range="all" />
            </AxiosContext.Provider>
        );

        await waitFor(() => {
            expect(getByText('Niestety nic tu nie ma 🤷‍♂')).toBeTruthy();
        })
    });

    it('hides the confirmation modal when backdrop is pressed', async () => {
        const mockPublicAxios = axios.create();
        mockPublicAxios.get = jest.fn().mockResolvedValueOnce({
            data: [
                {
                    id: 1,
                    title: 'Dupa'
                }
            ]
        })
        const mockAuthAxios = axios.create();
        mockAuthAxios.delete = jest.fn().mockRejectedValueOnce({ response: { data: { message: 'Network Error' } } });

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

        const { getByText, getByTestId, queryByText } = render(
            <AxiosContext.Provider value={{authAxios: mockAuthAxios, publicAxios: mockPublicAxios}}>
                <AuthContext.Provider value={mockAuthContext}>
                    <UserDataContext.Provider value={mockUserContext}>
                        <FlashcardsListScreen pageSwitcher={() => {}} range="my" />
                    </UserDataContext.Provider>
                </AuthContext.Provider>
            </AxiosContext.Provider>
        );

        await waitFor(() => {
            expect(mockPublicAxios.get).toHaveBeenCalledWith('/fiches/userId/1/0')
        })
        const deleteButton = getByTestId('trash-icon');
        fireEvent.press(deleteButton);
        const backdrop = getByTestId('modal-backdrop');
        fireEvent.press(backdrop);
        const confirmationTextElement = queryByText('Czy na pewno chcesz usunąć fiszki');
        expect(confirmationTextElement).toBeNull();
    });

});
