import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Comments from "./Comments";
import { AxiosContext } from "../../context/AxiosProvider/AxiosProvider";
import { ActivityIndicator } from 'react-native-paper';

jest.mock("@react-native-async-storage/async-storage", () => require("../../../__mocks__/mock-async-storage"));

describe('Comments', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { toJSON } = render(<Comments id={2} />);
        expect(toJSON()).toMatchSnapshot();
    });

    it('fetches posts and updates state', async () => {
        const commentsData = [
            { id: 1, title: "Comment 1", content: "This is a comment", date: "2023-05-29T00:00:00Z", users_posts: [{ users: { avatar: null } }], posts_images: [], posts_reviews: [{ reviews: { rate: 4 } }, { reviews: { rate: 5 } }] },
            { id: 2, title: "Comment 2", content: "This is another comment", date: "2023-05-28T00:00:00Z", users_posts: [{ users: { avatar: null } }], posts_images: [], posts_reviews: [{ reviews: { rate: 3 } }] }
        ];

        const mockPublicAxios = axios.create()
        mockPublicAxios.get = jest.fn().mockResolvedValue({data: commentsData})

        const { getByText, queryByText } = render(
            <AxiosContext.Provider value={{ publicAxios: mockPublicAxios, authAxios: mockPublicAxios }}>
                <Comments id={0} />
            </AxiosContext.Provider>
        );

        expect(queryByText('Nic tu nie ma. Bądź pierwszy, który skomentuje!')).toBeTruthy();

        await waitFor(() => {
            expect(queryByText('Nic tu nie ma. Bądź pierwszy, który skomentuje!')).toBeFalsy();
            commentsData.forEach(comment => {
                expect(getByText(comment.title)).toBeTruthy();
                expect(getByText(comment.content)).toBeTruthy();
                // Check formatted date
                const formattedDate = new Date(comment.date).toLocaleDateString('pl-PL', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
                expect(getByText(formattedDate)).toBeTruthy();
            });
        });
    });

    it('shows ActivityIndicator while loading', async () => {
        const mockPublicAxios = axios.create()
        mockPublicAxios.get = jest.fn().mockResolvedValue({data: []})
        const { getByTestId } = render(
            <AxiosContext.Provider value={{ publicAxios: mockPublicAxios, authAxios: mockPublicAxios }}>
                <Comments id={0} />
            </AxiosContext.Provider>
        );

        await waitFor(() => {
            expect(getByTestId('activity-indicator')).toBeTruthy();
        });
    });

    it('renders the comment button', () => {
        const mockPublicAxios = axios.create()
        mockPublicAxios.get = jest.fn().mockResolvedValue({data: []})
        const { getByText } = render(
            <AxiosContext.Provider value={{ publicAxios: mockPublicAxios, authAxios: mockPublicAxios }}>
                <Comments id={0} />
            </AxiosContext.Provider>
        );

        expect(getByText('Odpowiedz')).toBeTruthy();
    });
});
