import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, AuthContext } from './AuthContext';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';

jest.mock("@react-native-async-storage/async-storage", () => require("../../../__mocks__/mock-async-storage"));


describe('AuthProvider', () => {
  it('should set authState correctly on logout', async () => {
    AsyncStorage.clear = jest.fn().mockResolvedValueOnce(undefined);

    const ConsumerComponent = () => {
      const { logout, authState, getAccessToken } = React.useContext(AuthContext)!;
      const dupa = getAccessToken()
      return (
        <>
          <Text testID="accessToken">{authState.accessToken}</Text>
          <Text testID="accessTokenFunction">{dupa}</Text>
          <Button onPress={() => logout()} testID="logoutButton">
            Logout
          </Button>
        </>
      );
    };

    const { getByTestId } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    expect(getByTestId('accessToken').props.children).toBe(null);

    fireEvent.press(getByTestId('logoutButton'));

    await waitFor(() => expect(AsyncStorage.clear).toHaveBeenCalledTimes(1));

    expect(getByTestId('accessToken').props.children).toBe(null); 
  });
});
