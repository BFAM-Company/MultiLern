import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import SubjectCard from './SubjectCard';

afterEach(cleanup);

describe('<SubjectCard />', () => {

  it('Buttons should switch screens when pressed', () => {
    const mockPageSwitcher = jest.fn();
    const { getByText } = render(
      <SubjectCard buttonAction={mockPageSwitcher} title='Dupa'/>,
    );

    fireEvent.press(getByText('Dupa'));

    expect(mockPageSwitcher).toHaveBeenCalledTimes(1);
  });

});
