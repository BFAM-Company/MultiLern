import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UserModal from './UserModal';

jest.mock("@react-native-async-storage/async-storage", () => require("../../../../__mocks__/mock-async-storage"));


describe('<UserModal />', () => {
  const mockButtonAction = jest.fn();
  const mockHideHandler = jest.fn();
  const mockUser = {
    id: 1,
    nickname: 'TestUser',
    email: 'test@example.com',
    avatar: require('../../../../assets/demo-user-icon.png'), // odpowiednia ścieżka do avataru
  };

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <UserModal
        buttonAction={mockButtonAction}
        hideHandler={mockHideHandler}
        isVisible={true}
        user={mockUser}
      />
    );

    // Sprawdź czy komponent renderuje elementy odpowiednio
    expect(getByText('TestUser')).toBeTruthy();
    expect(getByText('test@example.com')).toBeTruthy();
    expect(getByTestId('userModalBackdrop')).toBeTruthy();
  });

  it('executes button action when pressed', () => {
    const { getByText } = render(
      <UserModal
        buttonAction={mockButtonAction}
        hideHandler={mockHideHandler}
        isVisible={true}
        user={mockUser}
      />
    );

    fireEvent.press(getByText('Wyszukaj'));
    expect(mockButtonAction).toHaveBeenCalledWith('Home');

    fireEvent.press(getByText('Twoje Zadania'));
    expect(mockButtonAction).toHaveBeenCalledWith('Home');

    fireEvent.press(getByText('Konto'));
    expect(mockButtonAction).toHaveBeenCalledWith('Home');

    fireEvent.press(getByText('Ustawienia'));
    expect(mockButtonAction).toHaveBeenCalledWith('Home');

  });

  it('executes logout when pressed', () => {
    const { getByText } = render(
      <UserModal
        buttonAction={mockButtonAction}
        hideHandler={mockHideHandler}
        isVisible={true}
        user={mockUser}
      />
    );

    fireEvent.press(getByText('Wyloguj się'));
    // Tutaj sprawdź, czy wywołano odpowiednią funkcję do wylogowania
    // Oczekuję, że została wywołana funkcja mocka dla logout
  });
});
