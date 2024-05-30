import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react-native';
import NotesScreen from './NotesScreen';


jest.mock("@react-native-async-storage/async-storage", () => require("../../__mocks__/mock-async-storage"));

describe('NotesScreen', () => {
  afterEach(cleanup);
    it('renders correctly', () => {
        const mockPageSwitcher = jest.fn();
        const { toJSON } = render(<NotesScreen pageSwitcher={mockPageSwitcher} />);
        expect(toJSON()).toMatchSnapshot();
    });
});
