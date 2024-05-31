import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import ExamsSection from './ExamsSection';

describe('ExamsSection', () => {
  afterEach(cleanup);
  it('calls pageSwitcher function when button is pressed', () => {
    const mockPageSwitcher = jest.fn();
    const { getByTestId, getByText } = render(<ExamsSection pageSwitcher={mockPageSwitcher} />);
    
    const button = getByText('Nasz Zbiór Sprawdzianów');
    fireEvent.press(button);
    expect(mockPageSwitcher).toHaveBeenCalledTimes(1);
    expect(mockPageSwitcher).toHaveBeenCalledWith('Exams');

    const button4 = getByText('Sprawdź');
    fireEvent.press(button4);
    expect(mockPageSwitcher).toHaveBeenCalledWith('Exams');

    })
});
