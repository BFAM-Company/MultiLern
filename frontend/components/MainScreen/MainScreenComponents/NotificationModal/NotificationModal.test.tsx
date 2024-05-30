import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NotificationModal from './NotificationModal';

describe('NotificationModal component', () => {
  it('modal visibility controlled by props', () => {
    const hideHandler = jest.fn();
    const buttonAction = jest.fn();

    const { queryByTestId } = render(<NotificationModal isVisible={true} hideHandler={hideHandler} buttonAction={buttonAction} user={{ avatar: 'avatar-url', nickname: 'dupa', id: 1, email: '' }}/>);
    const modal = queryByTestId('notificationModal');
    expect(modal).toBeTruthy();
  });

  it('hide notification modal button functionality', () => {
    const hideHandler = jest.fn();
    const buttonAction = jest.fn();

    const { getByTestId } = render(<NotificationModal isVisible={true} hideHandler={hideHandler} buttonAction={buttonAction} user={{ avatar: 'avatar-url', nickname: 'dupa', id: 1, email: '' }} />);
    fireEvent.press(getByTestId('hideNotificationModalButton'));
    expect(hideHandler).toHaveBeenCalled();
  });

// TODO: fix NotificationModal func
  it('notification buttons functionality', () => {
    const hideHandler = jest.fn();
    const buttonAction = jest.fn();

    const { getByText } = render(<NotificationModal isVisible={true} hideHandler={hideHandler} buttonAction={buttonAction} user={{ avatar: 'avatar-url', nickname: 'dupa', id: 1, email: '' }} />);
    fireEvent.press(getByText('Dodaj swoje pierwsze zadanie'));
    expect(buttonAction).toHaveBeenCalledWith('Exercises');

    fireEvent.press(getByText('Pomagaj innym! Dodawaj własne rozwiązania i dziel się swoją wiedzą'));
    expect(buttonAction).toHaveBeenCalledWith('Exercises');

    fireEvent.press(getByText('Zobacz najbardziej popularne sety leksykalne!'));
    expect(buttonAction).toHaveBeenCalledWith('FlashcardsList');

    fireEvent.press(getByText('Notuj z MultiLern'));
    expect(buttonAction).toHaveBeenCalledWith('Notes');
  });
});
