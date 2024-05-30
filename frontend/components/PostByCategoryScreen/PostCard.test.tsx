import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PostCard from './PostCard';

jest.mock("@react-native-async-storage/async-storage", () => require("../../__mocks__/mock-async-storage"));

describe('PostCard component', () => {
  const post = {
    id: 1,
    title: 'Title',
    description: 'Description',
    rate: 4,
    date: '2024-05-30',
    posts_images: [],
    user_data: [{ users: { nickname: 'User', avatar: null } }],
  };

  it('renders correctly with initial state', () => {
    const { getByText } = render(<PostCard {...post} />);
    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Description')).toBeTruthy();
    expect(getByText('User')).toBeTruthy();
    expect(getByText('2024-05-30')).toBeTruthy();
  });

  it('expands card on press', () => {
    const { getByTestId } = render(<PostCard {...post} />);
    fireEvent.press(getByTestId('post-card-touchable'));
    expect(getByTestId('post-content')).toBeTruthy();
  });
});
