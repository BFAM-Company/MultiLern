import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import UserExercises from '../UserExercises/UserExercises';
import { AxiosContext } from '../context/AxiosProvider/AxiosProvider';
import axios from 'axios';
import ExcercisesScreen from './ExcercisesScreen';

// Mocking child components
jest.mock("@react-native-async-storage/async-storage", () => require("../../__mocks__/mock-async-storage"));
jest.mock('../Footer/Footer', () => jest.fn(() => null));
jest.mock('../SearchBar/SearchBar', () => jest.fn(() => null));
jest.mock('./ExercisesScreenComponents/ExercisesCard', () => jest.fn(() => null));

const mockAxiosContextValue = {
  publicAxios: axios.create(),
  authAxios: axios.create(),
};

describe('ExcercisesScreen', () => {
  it('fetches data and updates state correctly', async () => {
    const mockData = [
      {
        item: {
          id: 1,
          category: 'category1',
          title: 'title1',
          content: 'content1',
          posts_reviews: [{ reviews: { rate: 4 } }],
          users_posts: { name: 'User1' },
          date: '2023-05-30T12:34:56.789Z',
          posts_images: []
        },
      },
      {
      item: {
        id: 1,
        category: 'category1',
        title: 'title1',
        content: 'content1',
        posts_reviews: [{ reviews: { rate: 4 } }],
        users_posts: { name: 'User1' },
        date: '2023-05-30T12:34:56.789Z',
        posts_images: []
      },
    },
    ];

    mockAxiosContextValue.publicAxios.get = jest.fn().mockResolvedValueOnce({ data: mockData });

    const { queryByTestId, getByText } = render(
        <AxiosContext.Provider value={mockAxiosContextValue}>
          <ExcercisesScreen searchableText="example" pageSwitcher={() => {}} />
        </AxiosContext.Provider>
    );

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    });
  });

});
