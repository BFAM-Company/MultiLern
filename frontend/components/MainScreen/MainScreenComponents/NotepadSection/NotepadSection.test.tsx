import React from 'react'
import NotepadSection from './NotepadSection';
import { fireEvent, render } from '@testing-library/react-native';

describe('NotepadSection', () => {
    it('calls pageSwitcher', () => {
        const mockPageSwitcher = jest.fn();
        const { getByText } = render(<NotepadSection pageSwitcher={mockPageSwitcher}/>);
        
        const registerButton = getByText('Nowa Notatka');
        fireEvent.press(registerButton);

        expect(mockPageSwitcher).toHaveBeenCalledWith('Notes');

        const nextButton = getByText('Dalej');
        fireEvent.press(nextButton);

        expect(mockPageSwitcher).toHaveBeenCalledWith('Notes');

        const yourNotesButton = getByText('Twoje Notatki');
        fireEvent.press(yourNotesButton);

        expect(mockPageSwitcher).toHaveBeenCalledWith('Notes');

        const createButton = getByText('Utwórz +');
        fireEvent.press(createButton);

        expect(mockPageSwitcher).toHaveBeenCalledWith('Notes');
    })
})