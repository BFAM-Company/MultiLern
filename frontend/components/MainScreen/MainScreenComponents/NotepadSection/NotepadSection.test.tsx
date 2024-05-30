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
    })
})