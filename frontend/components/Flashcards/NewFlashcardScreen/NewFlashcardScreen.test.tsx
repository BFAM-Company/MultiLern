import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import NewFlashcardScreen from './NewFlashcardScreen';
import { UserDataContext } from '../../context/UserContext/UserContext';
import { AxiosContext } from '../../context/AxiosProvider/AxiosProvider';
import axios from 'axios';
import { Alert, Modal } from 'react-native';
import { FichesContext } from '../../context/FichesContext/FichesContext';

jest.mock('@react-native-async-storage/async-storage', () => require('../../../__mocks__/mock-async-storage'));


afterEach(cleanup);

describe('<NewFlashcardScreen />', () => {
  it('renders correctly', () => {
    const mockPageSwitcher = jest.fn();
    const { toJSON } = render(<NewFlashcardScreen pageSwitcher={mockPageSwitcher} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should create flashcards successfully', async () => {
    const mockUserContext = {
      setUserData: jest.fn(),
      userData: {
        id: 1,
        nickname: 'JohnDoe',
        avatar: 'https://example.com/avatar.jpg',
        email: 'john.doe@example.com',
      }
    };

    const mockAuthAxios = axios.create();
    mockAuthAxios.post = jest.fn().mockResolvedValueOnce({ data: {} });

    const { getByText, getByPlaceholderText, getByTestId } = render(
      <UserDataContext.Provider value={mockUserContext}>
        <AxiosContext.Provider value={{ authAxios: mockAuthAxios, publicAxios: mockAuthAxios }}>
          <NewFlashcardScreen pageSwitcher={() => {}} />
        </AxiosContext.Provider>
      </UserDataContext.Provider>
    );

    fireEvent.press(getByText('Tytuł twojego zestawu!'));
    fireEvent.changeText(getByPlaceholderText('Wpisz tytuł'), 'Test Title');
    fireEvent.changeText(getByPlaceholderText('Podaj obce tłumaczenie'), 'ass');
    fireEvent.changeText(getByPlaceholderText('Podaj polskie tłumaczenie'), 'dupa');

    fireEvent.press(getByTestId('submitButton'));

    await waitFor(() => {
      expect(mockAuthAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAuthAxios.post).toHaveBeenCalledWith(
        '/fiches',
        {
          title: 'Test Title',
          translationsList: [{
            translations: {
                create: {
                    foreignTranslation: 'ass',
                    polishTranslation: 'dupa'
                }
            }
          }],
          userId: 1,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
    });
  });

  it('should append new flashcard field when add icon is pressed and remove flashcard field when remove icon is pressed', async () => {
    const mockUserContext = {
      setUserData: jest.fn(),
      userData: {
        id: 1,
        nickname: 'JohnDoe',
        avatar: 'https://example.com/avatar.jpg',
        email: 'john.doe@example.com',
      }
    };

    const mockAuthAxios = axios.create();
    mockAuthAxios.post = jest.fn().mockResolvedValueOnce({ data: {} });

    const { getByText, getAllByPlaceholderText, getAllByTestId, getByTestId } = render(
      <UserDataContext.Provider value={mockUserContext}>
        <AxiosContext.Provider value={{ authAxios: mockAuthAxios, publicAxios: mockAuthAxios }}>
          <NewFlashcardScreen pageSwitcher={() => {}} />
        </AxiosContext.Provider>
      </UserDataContext.Provider>
    );

    fireEvent.press(getByTestId('appendButton'))

    await waitFor(() => {
        expect(getAllByPlaceholderText('Podaj polskie tłumaczenie')).toHaveLength(2)
        expect(getAllByPlaceholderText('Podaj obce tłumaczenie')).toHaveLength(2)
    })

    fireEvent.press(getAllByTestId('removeButton')[0])

    await waitFor(() => {
        expect(getAllByPlaceholderText('Podaj polskie tłumaczenie')).toHaveLength(1)
        expect(getAllByPlaceholderText('Podaj obce tłumaczenie')).toHaveLength(1)
    })

  })

  it('should patch flashcards successfully', async () => {
    const mockUserContext = {
        setUserData: jest.fn(),
        userData: {
        id: 1,
        nickname: 'JohnDoe',
        avatar: 'https://example.com/avatar.jpg',
        email: 'john.doe@example.com',
        }
    };

    const mockFichesContext = {
        fichesState: 2,
        setFichesState: jest.fn()
    }

    const mockAuthAxios = axios.create();
    const mockPublicAxios = axios.create();
    mockAuthAxios.patch = jest.fn().mockResolvedValueOnce({ data: {} });
    mockPublicAxios.get = jest.fn().mockResolvedValueOnce({ data: {
        title: 'Test Title',
        fiches_translations: [
            {
                translations: {
                    foreignTranslation: 'ass',
                    polishTranslation: 'dupa',
                }
            }
        ],
        userId: 1,
    }});

    const { getByText, getByPlaceholderText, getByTestId } = render(
        <UserDataContext.Provider value={mockUserContext}>
        <AxiosContext.Provider value={{ authAxios: mockAuthAxios, publicAxios: mockPublicAxios }}>
            <FichesContext.Provider value={mockFichesContext}>
            <NewFlashcardScreen pageSwitcher={() => {}} />
            </FichesContext.Provider>
        </AxiosContext.Provider>
        </UserDataContext.Provider>
    );

    fireEvent.press(getByTestId('submitButton'));

    await waitFor(() => {
        expect(mockAuthAxios.patch).toHaveBeenCalledTimes(1); 
        expect(mockAuthAxios.patch).toHaveBeenCalledWith( 
        `/fiches/${mockFichesContext.fichesState}`, 
        {
            title: 'Tytuł twojego zestawu!',
            translationsList: [],
        },
        {
            headers: {
            'Content-Type': 'application/json'
            }
        }
        );
    });
});

it('should throw NetworkError', async () => {
    const mockUserContext = {
      setUserData: jest.fn(),
      userData: {
        id: 1,
        nickname: 'JohnDoe',
        avatar: 'https://example.com/avatar.jpg',
        email: 'john.doe@example.com',
      }
    };

    const mockAuthAxios = axios.create();
    mockAuthAxios.post = jest.fn().mockRejectedValueOnce({ response: { data: { message: 'Network Error' } } });


    const { getByText, getByPlaceholderText, getByTestId } = render(
      <UserDataContext.Provider value={mockUserContext}>
        <AxiosContext.Provider value={{ authAxios: mockAuthAxios, publicAxios: mockAuthAxios }}>
          <NewFlashcardScreen pageSwitcher={() => {}} />
        </AxiosContext.Provider>
      </UserDataContext.Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Podaj obce tłumaczenie'), 'ass');
    fireEvent.changeText(getByPlaceholderText('Podaj polskie tłumaczenie'), 'dupa');

    fireEvent.press(getByTestId('submitButton'));

    await waitFor(() => {
        expect(mockAuthAxios.post).toHaveBeenCalledTimes(1)
    });
  });

  it('should throw an error when required fields are not filled', async () => {
  const mockUserContext = {
    setUserData: jest.fn(),
    userData: {
      id: 1,
      nickname: 'JohnDoe',
      avatar: 'https://example.com/avatar.jpg',
      email: 'john.doe@example.com',
    }
  };

  const mockAuthAxios = axios.create();

  const { getByText, getByTestId } = render(
    <UserDataContext.Provider value={mockUserContext}>
      <AxiosContext.Provider value={{ authAxios: mockAuthAxios, publicAxios: mockAuthAxios }}>
        <NewFlashcardScreen pageSwitcher={() => {}} />
      </AxiosContext.Provider>
    </UserDataContext.Provider>
  );

  fireEvent.press(getByTestId('submitButton'));

  await waitFor(() => {
    expect(getByText('⚠ Nie uzupełniłes wszystkich pól!')).toBeTruthy();
  });

});

it('should display edit mode when editing the title', async () => {
  const { getByText, getByPlaceholderText, queryByPlaceholderText } = render(<NewFlashcardScreen pageSwitcher={() => {}} />);
  fireEvent.press(getByText('Tytuł twojego zestawu!'));
  fireEvent(getByPlaceholderText('Wpisz tytuł'), 'onBlur');
  await waitFor(() => {
    expect(queryByPlaceholderText('Wpisz tytuł')).toBeNull(); 
  });
});


    

});
