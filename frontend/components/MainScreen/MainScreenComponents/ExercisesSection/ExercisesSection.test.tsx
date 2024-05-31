import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import ExercisesSection from './ExercisesSection';

describe('ExercisesSection', () => {
  afterEach(cleanup);
  it('calls pageSwitcher function when button is pressed', () => {
    const mockPageSwitcher = jest.fn();
    const { getByTestId, getByText } = render(<ExercisesSection pageSwitcher={mockPageSwitcher} />);
    
    const button = getByTestId('NotesPageSwitcher');
    fireEvent.press(button);
    expect(mockPageSwitcher).toHaveBeenCalledTimes(1);
    expect(mockPageSwitcher).toHaveBeenCalledWith('CreatePost');

    const button2 = getByText('Twoje pytania');
    fireEvent.press(button2);
    expect(mockPageSwitcher).toHaveBeenCalledWith('UserExercises', {"userId": undefined});

    const button3 = getByText('Dalej');
    fireEvent.press(button3);
    expect(mockPageSwitcher).toHaveBeenCalledWith('UserExercises', {"userId": undefined});

    const button4 = getByText('Utwórz +');
    fireEvent.press(button4);
    expect(mockPageSwitcher).toHaveBeenCalledWith('CreatePost');

    })
});
