import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import FlashcardsSection from './FlashcardsSection';

describe('FlashcardsSection', () => {
  afterEach(cleanup);
    it('renders correctly', () => {
        const mockPageSwitcher = jest.fn();
        const { toJSON } = render(<FlashcardsSection pageSwitcher={mockPageSwitcher} />);
        expect(toJSON()).toMatchSnapshot();
    });

    it('navigates to FlashcardsList with "my" range when "Twoje Fiszki" button is pressed', () => {
        const mockPageSwitcher = jest.fn();
        const { getByText } = render(<FlashcardsSection pageSwitcher={mockPageSwitcher} />);
        fireEvent.press(getByText('Dalej'));

        expect(mockPageSwitcher).toHaveBeenCalledWith('FlashcardsList', { range: 'my' });
    });

    it('navigates to FlashcardsList with "my" range when card is pressed', () => {
        const mockPageSwitcher = jest.fn();
        const { getByTestId } = render(<FlashcardsSection pageSwitcher={mockPageSwitcher} />);
        fireEvent.press(getByTestId('myPageSwitcher'));

        expect(mockPageSwitcher).toHaveBeenCalledWith('FlashcardsList', { range: 'my' });
    });

    it('navigates to FlashcardsList with "all" range when "Zobacz wszystkie" button is pressed', () => {
        const mockPageSwitcher = jest.fn();
        const { getByText } = render(<FlashcardsSection pageSwitcher={mockPageSwitcher} />);
        fireEvent.press(getByText('Zobacz wszystkie'));

        expect(mockPageSwitcher).toHaveBeenCalledWith('FlashcardsList', { range: 'all' });
    });

    it('navigates to NewFlashcard when "Nowe Fiszki" button is pressed', () => {
        const mockPageSwitcher = jest.fn();
        const { getByText } = render(<FlashcardsSection pageSwitcher={mockPageSwitcher} />);
        fireEvent.press(getByText('Utwórz +'));

        expect(mockPageSwitcher).toHaveBeenCalledWith('NewFlashcard');
    });

    it('test pageSwitcher Nowe Fiszki', () => {
        const mockPageSwitcher = jest.fn();
        const { getByText } = render(<FlashcardsSection pageSwitcher={mockPageSwitcher} />);
        fireEvent.press(getByText('Nowe Fiszki'));

        expect(mockPageSwitcher).toHaveBeenCalledWith('NewFlashcard');
    });
});
