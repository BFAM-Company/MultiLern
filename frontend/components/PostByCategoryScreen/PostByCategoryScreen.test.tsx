import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import PostByCategoryScreen from '../PostByCategoryScreen/PostByCategoryScreen';
import { AxiosContext } from '../context/AxiosProvider/AxiosProvider';
import axios from 'axios';

jest.mock("@react-native-async-storage/async-storage", () => require("../../__mocks__/mock-async-storage"));
jest.mock('./PostCard', () => jest.fn(() => null));
jest.mock('./MiniPostCard', () => jest.fn(() => null));

const mockAxiosContextValue = {
  publicAxios: axios.create(),
  authAxios: axios.create(),
};

describe('PostByCategoryScreen', () => {
  it('fetches data and updates state correctly', async () => {
    const mockData = [
      {
        id: 1,
        category: 'category1',
        title: 'title1',
        content: 'content1',
        posts_reviews: [{ reviews: { rate: 4 } }],
        rate: 4,
        date: '2023-05-30T12:34:56.789Z',
        posts_images: [],
        user_data: [{ users: { avatar: null, nickname: 'User1' } }],
      },
    ];

    mockAxiosContextValue.publicAxios.get = jest.fn().mockResolvedValueOnce({ data: mockData });

    const { queryByTestId, getByText } = render(
      <AxiosContext.Provider value={mockAxiosContextValue}>
        <PostByCategoryScreen categoryId="123" />
      </AxiosContext.Provider>
    );

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    await waitFor(() => {
      expect(getByText('Poznaj zadania z naszej bazy z kategorii')).toBeTruthy();
    });
  });

  it('fetches data and display MiniPostCard', async () => {
    const mockData = [
      {
        id: 1,
        category: 'category1',
        title: 'title1',
        content: 'content1',
        rate: 4,
        date: '2023-05-30T12:34:56.789Z',
        posts_images: [],
        user_data: [{ users: { avatar: null, nickname: 'User1' } }],
      },
      {
        id: 2,
        category: 'category1',
        title: 'title1',
        content: 'content1',
        rate: 5,
        date: '2023-05-30T12:34:56.789Z',
        posts_images: [],
        user_data: [{ users: { avatar: null, nickname: 'User1' } }],
      },
      {
        id: 3,
        category: 'category1',
        title: 'title1',
        content: 'content1',
        rate: 2,
        date: '2023-05-30T12:34:56.789Z',
        posts_images: [],
        user_data: [{ users: { avatar: null, nickname: 'User1' } }],
      },
      {
        id: 4,
        category: 'category1',
        title: 'title4',
        content: 'content1',
        rate: 2,
        date: '2023-05-30T12:34:56.789Z',
        posts_images: [],
        user_data: [{ users: { avatar: null, nickname: 'User1' } }],
      },
    ];

    mockAxiosContextValue.publicAxios.get = jest.fn().mockResolvedValueOnce({ data: mockData });

    const { queryByTestId, getByText } = render(
      <AxiosContext.Provider value={mockAxiosContextValue}>
        <PostByCategoryScreen categoryId="123" />
      </AxiosContext.Provider>
    );

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    await waitFor(() => {
      expect(getByText('Poznaj zadania z naszej bazy z kategorii')).toBeTruthy();
    });
  });
});
