import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  afterEach(cleanup);
    it('renders correctly', () => {
        const mockPageSwitcher = jest.fn();
        const { toJSON } = render(<SearchBar pageSwitcher={mockPageSwitcher} />);
        expect(toJSON()).toMatchSnapshot();
    });

    it('updates searchedText state when typing in TextInput', () => {
        const mockPageSwitcher = jest.fn();
        const { getByPlaceholderText } = render(
            <SearchBar pageSwitcher={mockPageSwitcher} />
        );

        const textInput = getByPlaceholderText('wyszukaj zadania...');
        fireEvent.changeText(textInput, 'example search text');

        expect(textInput.props.defaultValue).toBe('example search text');
    });

    it('calls pageSwitcher function with correct parameters when icon is pressed', () => {
        const mockPageSwitcher = jest.fn();
        const mockSetModalVisibility = jest.fn();
        const { getByTestId } = render(
        <SearchBar
            pageSwitcher={mockPageSwitcher}
            setModalVisibility={mockSetModalVisibility}
            modalVisibility={true}
        />
        );

        const icon = getByTestId('search-icon');
        fireEvent.press(icon);

        expect(mockSetModalVisibility).toHaveBeenCalled();
        expect(mockPageSwitcher).toHaveBeenCalledWith('Excercises', {
        searchableText: undefined,
        });
    });

   it('does not call setModalVisibility function when modalVisibility is true and icon is pressed', () => {
        const mockPageSwitcher = jest.fn();
        const mockSetModalVisibility = jest.fn();
        const { getByTestId } = render(
            <SearchBar
            pageSwitcher={mockPageSwitcher}
            setModalVisibility={mockSetModalVisibility}
            modalVisibility={false}
            />
        );

        const icon = getByTestId('search-icon');
        fireEvent.press(icon);

        expect(mockSetModalVisibility).not.toHaveBeenCalled();
    });



});
