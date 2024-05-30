import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MiniPostCard from './MiniPostCard';

jest.mock("@react-native-async-storage/async-storage", () => require("../../__mocks__/mock-async-storage"));

describe('MiniPostCard component', () => {
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
    const { getByText } = render(<MiniPostCard {...post} />);
    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Description')).toBeTruthy();
  });

  it('expands card on press', () => {
    const { getByTestId } = render(<MiniPostCard {...post} />);
    fireEvent.press(getByTestId('mini-post-card-touchable'));
    expect(getByTestId('post-content')).toBeTruthy();
  });
});
