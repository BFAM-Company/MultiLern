import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import CommentButton from "./CommentButton";
import { AxiosContext } from '../../context/AxiosProvider/AxiosProvider';
import { UserDataContext } from '../../context/UserContext/UserContext';
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

jest.mock("@react-native-async-storage/async-storage", () => require("../../../__mocks__/mock-async-storage"));
jest.useFakeTimers()

describe('CommentButton', () => {
    const mockHandleRefresh = jest.fn();
    const mockUserContext = {
      setUserData: jest.fn(),
      userData: {
        id: 1,
        nickname: 'JohnDoe',
        avatar: 'https://example.com/avatar.jpg',
        email: 'john.doe@example.com',
      }
    };
    const mockAxiosContext = {
        publicAxios: {
            post: jest.fn()
        },
        authAxios: {}
    };

    const mockPublicAxios = axios.create();
    const mockAuthAxios = axios.create();

    const setup = () => {
        return render(
            <UserDataContext.Provider value={mockUserContext}>
                <AxiosContext.Provider value={{authAxios: mockPublicAxios, publicAxios: mockPublicAxios}}>
                    <CommentButton id={0} handleRefresh={mockHandleRefresh} />
                </AxiosContext.Provider>
            </UserDataContext.Provider>
        );
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { toJSON } = setup();
        expect(toJSON()).toMatchSnapshot();
    });

    it('opens the modal on button press', () => {
        const { getByText, getByPlaceholderText } = setup();
        const button = getByText('Odpowiedz');
        fireEvent.press(button);
        expect(getByPlaceholderText('tytuł(opcjonalny)...')).toBeTruthy();
    });

    it('handles text input correctly', () => {
        const { getByText, getByPlaceholderText } = setup();
        fireEvent.press(getByText('Odpowiedz'));
        const titleInput = getByPlaceholderText('tytuł(opcjonalny)...');
        const contentInput = getByPlaceholderText('Rozwiązanie...');

        fireEvent.changeText(titleInput, 'Test Title');
        fireEvent.changeText(contentInput, 'Test Content');

        expect(titleInput.props.value).toBe('Test Title');
        expect(contentInput.props.value).toBe('Test Content');
    });

    it('adds and removes images correctly', async () => {
        const { getByText, getByRole, getByTestId } = setup();
        fireEvent.press(getByText('Odpowiedz'));

        jest.spyOn(ImagePicker, 'requestMediaLibraryPermissionsAsync').mockResolvedValueOnce({ 
            status: ImagePicker.PermissionStatus.GRANTED,
            expires: 'never',
            granted: true,
            canAskAgain: true,});
        jest.spyOn(ImagePicker, 'launchImageLibraryAsync').mockResolvedValueOnce({
            canceled: false,
            assets: [{
                base64: "testbase64",
                uri: "",
                width: 0,
                height: 0
            }]
        });

        const uploadButton = getByTestId('uploadButton');
        await act(async () => {
            fireEvent.press(uploadButton);
        });

        await waitFor(() => {
            expect(getByTestId('image-0')).toBeTruthy();
        });

        const addedImage = getByTestId('image-0');
        fireEvent.press(addedImage);

        await waitFor(() => {
            expect(() => getByTestId('image-0')).toThrow();
        });
    });

    it('submits the comment correctly', async () => {
        const { getByText, getByPlaceholderText } = setup();
        fireEvent.press(getByText('Odpowiedz'));

        const titleInput = getByPlaceholderText('tytuł(opcjonalny)...');
        const contentInput = getByPlaceholderText('Rozwiązanie...');
        fireEvent.changeText(titleInput, 'Test Title');
        fireEvent.changeText(contentInput, 'Test Content');

        const submitButton = getByText('Wyślij');
        
        mockPublicAxios.post = jest.fn().mockResolvedValueOnce({ status: 200 });

        await act(async () => {
            fireEvent.press(submitButton);
        });

        await waitFor(() => {
            expect(mockPublicAxios.post).toHaveBeenCalledWith(
                '/posts/comment',
                {
                    title: 'Test Title',
                    content: 'Test Content',
                    date: expect.any(String),
                    parentPostId: 0,
                    images: [],
                    userId: 1,
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            expect(mockHandleRefresh).toHaveBeenCalled();
        });
    });
});
