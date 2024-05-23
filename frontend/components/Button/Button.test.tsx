import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button';

describe('<Button />', () => {
  const mockButtonAction = jest.fn();

  it('renders correctly with text', () => {
    const { getByText } = render(
      <Button buttonAction={mockButtonAction} colors={['#FF0000', '#00FF00']} fontColor="#FFFFFF">
        Click me
      </Button>
    );
    const buttonText = getByText('Click me');
    expect(buttonText).toBeTruthy();
  });

  it('calls buttonAction on press', () => {
    const { getByText } = render(
      <Button buttonAction={mockButtonAction} colors={['#FF0000', '#00FF00']} fontColor="#FFFFFF">
        Click me
      </Button>
    );
    const button = getByText('Click me');
    fireEvent.press(button);
    expect(mockButtonAction).toHaveBeenCalled();
  });
});
