import React from 'react';
import { render, fireEvent, cleanup} from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import { AuthContext } from '../context/AuthContext/AuthContext';


jest.mock("@react-native-async-storage/async-storage", () => require("../../__mocks__/mock-async-storage"));

afterEach(cleanup);


describe('<HomeScreen />', () => {
  it('renders correctly', () => {
    const mockPageSwitcher = jest.fn();
    const { toJSON } = render(<HomeScreen pageSwitcher={mockPageSwitcher} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls pageSwitcher with SignUp when Zarejestruj się button is pressed', () => {
    const mockPageSwitcher = jest.fn();
    const { getByText } = render(<HomeScreen pageSwitcher={mockPageSwitcher} />);
    
    const registerButton = getByText('Zarejestruj się');
    fireEvent.press(registerButton);

    expect(mockPageSwitcher).toHaveBeenCalledWith('SignUp');
  });

  it('calls pageSwitcher with LogIn when Zaloguj się button is pressed', () => {
    const mockPageSwitcher = jest.fn();
    const { getByText } = render(<HomeScreen pageSwitcher={mockPageSwitcher} />);
    
    const loginButton = getByText('Zaloguj się');
    fireEvent.press(loginButton);

    expect(mockPageSwitcher).toHaveBeenCalledWith('LogIn');
  });

  it('calls loginByGuest function when Kontynuuj jako gość button is pressed', () => {
    const mockSetAuthState = jest.fn();
    const mockGetAccessToken = jest.fn(() => 'testAccessToken');
    const mockLogout = jest.fn();

    const mockPageSwitcher = jest.fn();


    const mockAuthContext = {
      setAuthState: mockSetAuthState,
      getAccessToken: mockGetAccessToken,
      logout: mockLogout,
      authState: {
        accessToken: '',
        refreshToken: '',
        authenticated: false,
        isLoggingByGuest: false,
      }
    };

    const { getByText } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <HomeScreen pageSwitcher={mockPageSwitcher} />
      </AuthContext.Provider>
    );
    
    const guestButton = getByText('Kontynuuj jako gość');
    fireEvent.press(guestButton);

    expect(mockSetAuthState).toHaveBeenCalledWith({
      accessToken: 'dupa',
      refreshToken: 'dupa',
      authenticated: true,
      isLoggingByGuest: true
    });
  });

  it('renders logo and title correctly', () => {
    const mockPageSwitcher = jest.fn();

    const { getByText, getByTestId } = render(<HomeScreen pageSwitcher={mockPageSwitcher} />);
    
    expect(getByText('MultiLern')).toBeTruthy();
    expect(getByTestId('logoImage')).toBeTruthy();
  });

  it('renders main text correctly', () => {
    const mockPageSwitcher = jest.fn();

    const { getByText } = render(<HomeScreen pageSwitcher={mockPageSwitcher} />);
    
    expect(getByText('Dołącz do nas i podnieść swoją naukę na wyższy poziom')).toBeTruthy();
  });

});
