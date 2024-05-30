import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ToolKit from './ToolKit';

describe('ToolKit Component', () => {
  const defaultProps = {
    color: 'black',
    width: 1,
    style: 'normal',
    isDrawingEnabled: true,
    returnColor: jest.fn(),
    returnWidth: jest.fn(),
    returnStyle: jest.fn(),
    returnIsDrawingEnabled: jest.fn(),
  };

  it('renders the component correctly', () => {
    const { getByTestId, getByText } = render(<ToolKit {...defaultProps} />);

    expect(getByTestId('main-color-picker')).toBeTruthy();
    expect(getByText('normal')).toBeTruthy();
  });

  it('opens and selects a color from the color picker modal', async () => {
    const { getByTestId, getByText } = render(<ToolKit {...defaultProps} />);
    fireEvent.press(getByTestId('main-color-picker'));

    await waitFor(() => getByTestId('color-picker-red'));
    fireEvent.press(getByTestId('color-picker-red'));

    expect(defaultProps.returnColor).toHaveBeenCalledWith('red');
  });

  it('opens and selects a style from the style picker modal', async () => {
    const { getByText } = render(<ToolKit {...defaultProps} />);
    fireEvent.press(getByText('normal'));

    await waitFor(() => getByText('Dashed'));
    fireEvent.press(getByText('Dashed'));

    expect(defaultProps.returnStyle).toHaveBeenCalledWith('dashed');
  });
});
