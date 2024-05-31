import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ExamsScreen from '../ExamsScreen/ExamsScreen';
import { AxiosContext } from '../context/AxiosProvider/AxiosProvider';
import axios from 'axios';

jest.mock('@react-native-async-storage/async-storage', () => require('../../__mocks__/mock-async-storage'));
jest.mock('../PostByCategoryScreen/PostCard', () => jest.fn(() => null));
jest.mock('../PostByCategoryScreen/MiniPostCard', () => jest.fn(() => null));

const mockAxiosContextValue = {
  publicAxios: axios.create(),
  authAxios: axios.create(),
};

describe('ExamsScreen', () => {
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
        <ExamsScreen category="category1" pageSwitcher={jest.fn()} />
      </AxiosContext.Provider>
    );

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    await waitFor(() => {
      expect(getByText('Podziel się!')).toBeTruthy();
    });
  });

  it('fetches data and displays MiniPostCard and PostCard correctly', async () => {
    const mockData = [
      {
        id: 1,
        category: 'category1',
        title: 'title1',
        content: 'content1',
        rate: 4,
        posts_reviews: [{ reviews: { rate: 4 } }, { reviews: { rate: 2 } }],
        date: '2023-05-30T12:34:56.789Z',
        posts_images: [],
        user_data: [{ users: { avatar: null, nickname: 'User1' } }],
      },
      {
        id: 2,
        category: 'category1',
        title: 'title2',
        content: 'content2',
        rate: 5,
        date: '2023-05-30T12:34:56.789Z',
        posts_images: [],
        user_data: [{ users: { avatar: null, nickname: 'User2' } }],
      },
      {
        id: 3,
        category: 'category1',
        title: 'title3',
        content: 'content3',
        rate: 2,
        date: '2023-05-30T12:34:56.789Z',
        posts_images: [],
        user_data: [{ users: { avatar: null, nickname: 'User3' } }],
      },
      {
        id: 4,
        category: 'category1',
        title: 'title4',
        content: 'content4',
        rate: 2,
        date: '2023-05-30T12:34:56.789Z',
        posts_images: [],
        user_data: [{ users: { avatar: null, nickname: 'User4' } }],
      },
      {
        id: 5,
        category: 'category1',
        title: 'title5',
        content: 'content5',
        rate: 3,
        date: '2023-05-30T12:34:56.789Z',
        posts_images: [],
        user_data: [{ users: { avatar: null, nickname: 'User5' } }],
      },
      {
        id: 6,
        category: 'category1',
        title: 'title6',
        content: 'content6',
        rate: 4,
        date: '2023-05-30T12:34:56.789Z',
        posts_images: [],
        user_data: [{ users: { avatar: null, nickname: 'User6' } }],
      },
    ];

    mockAxiosContextValue.publicAxios.get = jest.fn().mockResolvedValueOnce({ data: mockData });

    const { queryByTestId, getByText } = render(
      <AxiosContext.Provider value={mockAxiosContextValue}>
        <ExamsScreen category="category1" pageSwitcher={jest.fn()} />
      </AxiosContext.Provider>
    );

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    await waitFor(() => {
      expect(getByText('Podziel się!')).toBeTruthy();
    });
  });
});
