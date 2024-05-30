import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import ExercisesSection from './ExercisesSection';

describe('ExercisesSection', () => {
  afterEach(cleanup);
  it('calls pageSwitcher function when button in FeatureBox is pressed', () => {
    const mockPageSwitcher = jest.fn();
    const { getByTestId } = render(<ExercisesSection pageSwitcher={mockPageSwitcher} />);
    
    const button = getByTestId('NotesPageSwitcher');
        fireEvent.press(button);
        expect(mockPageSwitcher).toHaveBeenCalledTimes(1);
        expect(mockPageSwitcher).toHaveBeenCalledWith('Notes');
    })
});
