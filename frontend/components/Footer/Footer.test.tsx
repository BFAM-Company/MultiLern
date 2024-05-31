import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import Footer from './Footer';

describe('Footer', () => {
  afterEach(cleanup);
    it('renders modal', () => {
        const mockPageSwitcher = jest.fn();
        const { getByTestId } = render(<Footer pageSwitcher={mockPageSwitcher} />);

        fireEvent.press(getByTestId('bellIcon'))

        expect(getByTestId('searchExercise')).toBeTruthy()

    });
    it('calls pageSwitcher', () => {
        const mockPageSwitcher = jest.fn();
        const { getByTestId } = render(<Footer pageSwitcher={mockPageSwitcher} />);

        fireEvent.press(getByTestId('homeIcon'))

        expect(mockPageSwitcher).toHaveBeenCalledWith('Main')

    });
});
