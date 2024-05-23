import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SubjectsSection from './SubjectsSection';

describe('SubjectsSection', () => {
  it('should change height and button text on press', () => {
    const mockPageSwitcher = jest.fn();

    const { getByText } = render(<SubjectsSection pageSwitcher={mockPageSwitcher} />);
    const button = getByText('więcej');

    expect(button).toBeTruthy()

    fireEvent.press(button);

    expect(getByText('mniej')).toBeTruthy();

  });
});
