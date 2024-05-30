import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import AppNavigator, { AuthPage, CreatePostPage, ExcercisesPage, FlashcardsListPage, FlashcardsSetPage, HomePage, LogInPage, MainPage, NewFlashcardPage, NotesPage, PostByCategoryPage, SignUpPage, UserExercisesPage } from './AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

jest.mock("@react-native-async-storage/async-storage", () => require("../../__mocks__/mock-async-storage"));


afterEach(cleanup);

const mockNavigation: any = {
  navigate: jest.fn(),
  dispatch: jest.fn(),
  reset: jest.fn(),
  goBack: jest.fn(),
  isFocused: jest.fn(),
};

describe('<AppNavigator />', () => {
   it('renders correctly', () => {
    const { toJSON } = render(<AppNavigator />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders HomePage correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <HomePage navigation={mockNavigation} />
      </NavigationContainer>
    );
    expect(getByText('MultiLern')).toBeDefined();
  });

  it('renders LogInPage correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <LogInPage navigation={mockNavigation} />
      </NavigationContainer>
    );
    expect(getByText('MultiLern')).toBeDefined();
  });

  it('renders MainPage correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <MainPage navigation={mockNavigation} />
      </NavigationContainer>
    );
    expect(getByText('Najlepsze rozwiązania zadań. Wszystkie podręcziki i sprawdzone odpowiedzi przez ekspertów i specjalną sztuczną inteligencję')).toBeDefined();
  });

  it('renders ExcercisesPage correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <ExcercisesPage route={{ params: { searchableText: 'example' } }} navigation={mockNavigation} />
      </NavigationContainer>
    );
    expect(getByText('Najlepsze trafienia')).toBeDefined();
  });

  it('renders NewFlashcardPage correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <NewFlashcardPage navigation={mockNavigation} />
      </NavigationContainer>
    );
    expect(getByText('Tytuł twojego zestawu!')).toBeDefined();
  });

  it('renders FlashcardsListPage correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <FlashcardsListPage route={{ params: { range: 'all' } }} navigation={mockNavigation} />
      </NavigationContainer>
    );
    expect(getByText('Wszystkie fiszki')).toBeDefined();
  });

  it('renders FlashcardsSetPage correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <FlashcardsSetPage route={{ params: { id: 1 } }} navigation={mockNavigation} />
      </NavigationContainer>
    );
    expect(getByText('FISZKI')).toBeDefined();
  });

  it('renders AuthPage correctly', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <AuthPage navigation={mockNavigation} />
      </NavigationContainer>
    );
    expect(getByTestId('loading-indicator')).toBeDefined();
  });

  it('renders SignUpPage correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <SignUpPage navigation={mockNavigation} />
      </NavigationContainer>
    );
    expect(getByText('Facebook account')).toBeDefined();
  });

  it('renders NotesPage correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <NotesPage navigation={mockNavigation} />
      </NavigationContainer>
    );
    expect(getByText('normal')).toBeDefined();
  });

  it('renders CreatePostPage correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <CreatePostPage navigation={mockNavigation} />
      </NavigationContainer>
    );
    expect(getByText('Dodaj tytuł do swojego pytania')).toBeDefined();
  });

  it('renders UserExercisesPage correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <UserExercisesPage route={{ params: { userId: 1} }} navigation={mockNavigation} />
      </NavigationContainer>
    );
    expect(getByText('Twoje pytania i odpowiedzi')).toBeDefined();
  });

  it('renders PostByCategoryPage correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <PostByCategoryPage route={{ params: { category: 'example' } }} navigation={mockNavigation} />
      </NavigationContainer>
    );
    expect(getByText('Poznaj zadania z naszej bazy z kategorii example')).toBeDefined();
  });

});
