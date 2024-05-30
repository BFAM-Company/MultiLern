  import React, { useContext, useEffect } from 'react';
import { act, render, waitFor } from '@testing-library/react-native';
import { AxiosProvider, AxiosContext } from './AxiosProvider';
import { AuthContext } from '../AuthContext/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { Text, View } from 'react-native';
import MockAdapter from 'axios-mock-adapter';

// Mock AsyncStorage
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
    axiosMock.reset(); // Reset mock adapter after each test
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

    expect(getByTestId('authAxiosBaseURL').props.children).toBe('https://multilern-production.up.railway.app/auth');
    expect(getByTestId('publicAxiosBaseURL').props.children).toBe('https://multilern-production.up.railway.app');
    // expect(getByTestId('authAxiosBaseURL').props.children).toBe('http://localhost:3001/auth');
    // expect(getByTestId('publicAxiosBaseURL').props.children).toBe('http://localhost:3001');
  });

  it('authAxios sets Authorization header with accessToken', async () => {
    axiosMock.onGet('https://multilern-production.up.railway.app/auth/users/me').reply(200, {});
    // axiosMock.onGet('http://localhost:3001/auth/users/me').reply(200, {});

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
    axiosMock.onGet('https://multilern-production.up.railway.app/auth/users/me').reply(401);
    axiosMock.onPost('https://multilern-production.up.railway.app/auth/refresh').reply(200, { accessToken: 'newMockAccessToken' });
    // axiosMock.onGet('http://localhost:3001/auth/users/me').reply(401);
    // axiosMock.onPost('http://localhost:3001/auth/refresh').reply(200, { accessToken: 'newMockAccessToken' });

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
        accessToken:  {
         accessToken: "newMockAccessToken",
       },
        refreshToken: 'mockRefreshToken',
        authenticated: true,
        isLoggingByGuest: false,
      });
      expect(axiosMock.history.post[0].url).toBe('https://multilern-production.up.railway.app/auth/refresh');
      // expect(axiosMock.history.post[0].url).toBe('http://localhost:3001/auth/refresh');
    });
  });

  it('authAxios handles refresh token failure', async () => {
    axiosMock.onGet('https://multilern-production.up.railway.app/auth/users/me').reply(401);
    axiosMock.onPost('https://multilern-production.up.railway.app/auth/refresh').reply(400);

    // axiosMock.onGet('http://localhost:3001/auth/users/me').reply(401);
    // axiosMock.onPost('http://ocalhost:3001/auth/refresh').reply(400);

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
