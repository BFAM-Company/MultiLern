import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import BoxCarousel from './BoxCarousel';

describe('BoxCarousel', () => {
  afterEach(cleanup);

  it('renders correctly', () => {
    const mockPageSwitcher = jest.fn();
    const { toJSON } = render(<BoxCarousel pageSwitcher={mockPageSwitcher} />);
    expect(toJSON()).toMatchSnapshot();
  });
   it('renders all feature boxes correctly', () => {
    const mockPageSwitcher = jest.fn();
    const { queryAllByTestId} = render(<BoxCarousel pageSwitcher={mockPageSwitcher} />);
    
    const featureBoxes = queryAllByTestId('feature-box');

    expect(featureBoxes).toHaveLength(4);
  });

  it('calls pageSwitcher function when button in FeatureBox is pressed', () => {
    const mockPageSwitcher = jest.fn();
    const { queryAllByText } = render(<BoxCarousel pageSwitcher={mockPageSwitcher} />);
    
    const buttons = queryAllByText('Zobacz');
    for(let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        fireEvent.press(button);
        expect(mockPageSwitcher).toHaveBeenCalledTimes(i + 1);
        expect(mockPageSwitcher).toHaveBeenCalledWith('main');
    }
    
  });
});
