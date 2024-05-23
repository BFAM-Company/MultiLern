import React from 'react';
import { render, cleanup, fireEvent, waitFor, userEvent } from '@testing-library/react-native';
import FlashcardsListItem from './FlashcardsListItem';
import axios from 'axios';


jest.mock("@react-native-async-storage/async-storage", () => require("../../../__mocks__/mock-async-storage"));


describe('FlashcardsListItem', () => {
    afterEach(cleanup);

    it('calls pageSwitcher when FlashcardListItem is pressed', async () => {
        const mockPageSwitcher = jest.fn();
        const mockSetChosenFlashCard = jest.fn();
        const mockSetModalVisibility = jest.fn();
        const { getByTestId } = render(
                <FlashcardsListItem 
                    pageSwitcher={mockPageSwitcher} 
                    flashcardsID={1} 
                    title={'Dupa'} 
                    setChosenFlashcardCard={mockSetChosenFlashCard}
                    setModalVisibility={mockSetModalVisibility}
                    range={'my'}/>
        );
        fireEvent.press(getByTestId('edit-icon'));
        expect(mockPageSwitcher).toHaveBeenCalledWith('NewFlashcard'); // Replace 'Title of Flashcard' with the actual title rendered by FlashcardListItem
    });

});
