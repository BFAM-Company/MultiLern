import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import AddExamScreen from "./AddExamScreen";
import { AxiosContext } from '../context/AxiosProvider/AxiosProvider';
import { UserDataContext } from '../context/UserContext/UserContext';
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

jest.mock("@react-native-async-storage/async-storage", () => require("../../__mocks__/mock-async-storage"));
jest.useFakeTimers();

describe('AddExamScreen', () => {
    const mockPageSwitcher = jest.fn();
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
                <AxiosContext.Provider value={{ authAxios: mockPublicAxios, publicAxios: mockPublicAxios }}>
                    <AddExamScreen pageSwitcher={mockPageSwitcher} />
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

    it('handles text input correctly', () => {
        const { getByPlaceholderText } = setup();
        const titleInput = getByPlaceholderText('tytuł, dział lub zagadnienie...');
        const contentInput = getByPlaceholderText('Treści zadań...');

        fireEvent.changeText(titleInput, 'Test Title');
        fireEvent.changeText(contentInput, 'Test Content');

        expect(titleInput.props.value).toBe('Test Title');
        expect(contentInput.props.value).toBe('Test Content');
    });

    it('adds and removes images correctly', async () => {
        const { getByTestId, getByText } = setup();

        jest.spyOn(ImagePicker, 'requestMediaLibraryPermissionsAsync').mockResolvedValueOnce({
            status: ImagePicker.PermissionStatus.GRANTED,
            expires: 'never',
            granted: true,
            canAskAgain: true,
        });
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

    it('submits the exam correctly', async () => {
        const { getByText, getByPlaceholderText } = setup();

        const titleInput = getByPlaceholderText('tytuł, dział lub zagadnienie...');
        const contentInput = getByPlaceholderText('Treści zadań...');
        fireEvent.changeText(titleInput, 'Test Title');
        fireEvent.changeText(contentInput, 'Test Content');

        const submitButton = getByText('Prześlij');

        mockPublicAxios.post = jest.fn().mockResolvedValueOnce({ status: 200 });

        await act(async () => {
            fireEvent.press(submitButton);
        });

        await waitFor(() => {
            expect(mockPublicAxios.post).toHaveBeenCalledWith(
                '/posts/exam',
                {
                    title: 'Test Title',
                    content: 'Test Content',
                    category: '',
                    date: expect.any(String),
                    images: [],
                    tags: [],
                    userId: 1,
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            expect(mockPageSwitcher).toHaveBeenCalledWith('UserExercises', { userId: 1 });
        });
    });
});
