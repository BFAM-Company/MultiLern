  import React, { useContext, useEffect } from 'react';
import { act, render, waitFor } from '@testing-library/react-native';
import { AxiosProvider, AxiosContext } from './AxiosProvider';
import { AuthContext } from '../AuthContext/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { Text, View } from 'react-native';
import MockAdapter from 'axios-mock-adapter';

jest.mock("@react-native-async-storage/async-storage", () => require("../../../__mocks__/mock-async-storage"));

describe('AxiosProvider', () => {
 let axiosMock: any;
 let mockAuthContext: any;
  beforeEach(() => {
    AsyncStorage.setItem('auth', JSON.stringify({
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken'
    }));

     mockAuthContext = {
      setAuthState: jest.fn(),
      getAccessToken: jest.fn(() => 'mockAccessToken'),
      logout: jest.fn(),
      authState: {
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken',
        authenticated: true,
        isLoggingByGuest: false,
      }
    };

    axiosMock = new MockAdapter(axios);


  });

  afterEach(() => {
    AsyncStorage.clear();
    axiosMock.reset();
  });

  it('renders children and provides authAxios and publicAxios in context', () => {
    const mockAuthState = {
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
      authenticated: true
    };

    const mockAuthContext = {
      authState: mockAuthState,
      setAuthState: jest.fn(),
      logout: jest.fn(),
      getAccessToken: jest.fn(() => 'mockAccessToken')
    };

    const { getByTestId } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <AxiosProvider>
          <AxiosContext.Consumer>
            {(context) => (
              <>
                <Text testID="authAxiosBaseURL">{context.authAxios.defaults.baseURL}</Text>
                <Text testID="publicAxiosBaseURL">{context.publicAxios.defaults.baseURL}</Text>
              </>
            )}
          </AxiosContext.Consumer>
        </AxiosProvider>
      </AuthContext.Provider>
    );

    expect(getByTestId('authAxiosBaseURL').props.children).toBe(`${process.env.API_URL}/auth`);
    expect(getByTestId('publicAxiosBaseURL').props.children).toBe(`${process.env.API_URL}`);
  });

  it('authAxios sets Authorization header with accessToken', async () => {
    axiosMock.onGet(`${process.env.API_URL}/auth/users/me`).reply(200, {});

    const ChildComponent = () => {
      const { authAxios } = useContext(AxiosContext);
      useEffect(() => {
        authAxios.get('users/me');
      }, []);

      return null;
    };
    
      const mockAuthContext = {
        setAuthState: jest.fn(),
        getAccessToken: jest.fn(() => 'mockAccessToken'),
        logout: jest.fn(),
        authState: {
            accessToken: 'mockAccessToken',
            refreshToken: 'mockRefreshToken',
            authenticated: true,
            isLoggingByGuest: false,
        }
    };

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <AxiosProvider>
          <ChildComponent />
        </AxiosProvider>
      </AuthContext.Provider>
    );

     await waitFor(() => {
      expect(mockAuthContext.authState.accessToken).toBe('mockAccessToken');
      expect(axiosMock.history.get[0].headers.Authorization).toBe('Bearer mockAccessToken');
    });
  });
  
  it('authAxios refreshes token on 401 response', async () => {
    axiosMock.onGet(`${process.env.API_URL}/auth/users/me`).reply(401);
    axiosMock.onPost(`${process.env.API_URL}/auth/refresh`).reply(200, { accessToken: 'newMockAccessToken' });

    const ChildComponent = () => {
      const { authAxios } = useContext(AxiosContext);
      useEffect(() => {
        authAxios.get('users/me').catch(() => {});
      }, []);

      return null;
    };

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <AxiosProvider>
          <ChildComponent />
        </AxiosProvider>
      </AuthContext.Provider>
    );

   await waitFor(() => {
      expect(mockAuthContext.setAuthState).toHaveBeenCalledWith({
        accessToken:  {
         accessToken: "newMockAccessToken",
       },
        refreshToken: 'mockRefreshToken',
        authenticated: true,
        isLoggingByGuest: false,
      });
      expect(axiosMock.history.post[0].url).toBe(`${process.env.API_URL}/auth/refresh`);
    });
  });

  it('authAxios handles refresh token failure', async () => {
    axiosMock.onGet(`${process.env.API_URL}/auth/users/me`).reply(401);
    axiosMock.onPost(`${process.env.API_URL}/auth/refresh`).reply(400);

    const ChildComponent = () => {
      const { authAxios } = useContext(AxiosContext);
      useEffect(() => {
        authAxios.get('users/me').catch(() => {}); // catch to prevent unhandled promise rejection
      }, []);

      return null;
    };

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <AxiosProvider>
          <ChildComponent />
        </AxiosProvider>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(mockAuthContext.setAuthState).toHaveBeenCalledWith({
        accessToken: null,
        refreshToken: null,
        authenticated: false
      });
      expect(AsyncStorage.clear).toHaveBeenCalled();
    });
  });
  

});
