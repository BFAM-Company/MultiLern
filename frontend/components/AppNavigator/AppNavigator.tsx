import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../HomeScreen/HomeScreen';
import LogInScreen from '../LogInScreen/LogInScreen';
import  {linking} from './../../utils/GLOBALS';
import { HomePageProps, PageSwitchTemplateProps, RootStackParamList, LogInPageProps, SignUpPageProps, NewFlashcardPageProps } from '../../types/types';
import SignUpScreen from '../SignUpScreen/SignUpScreen';
import MainScreen from '../MainScreen/MainScreen';
import NewFlashcardScreen from '../Flashcards/NewFlashcardScreen/NewFlashcardScreen';
import FlashcardsListScreen from '../Flashcards/FlashcardsListScreen/FlashcardsListScreen';
import FlashcardsSetScreen from '../Flashcards/FlashcardsSetScreen/FlashcardsSetScreen';


const PageSwitchTamplte: React.FC<PageSwitchTemplateProps> = ({ navigation, children}) => {
  const pageChanger = (page: keyof RootStackParamList, params?: any) => {
    navigation.navigate(page, params);
  };

  return React.cloneElement(children, {pageSwitcher: pageChanger });
};

const HomePage: React.FC<HomePageProps> = ({ navigation }) => {
  return (
    <PageSwitchTamplte navigation={navigation}>
          <HomeScreen/>
    </PageSwitchTamplte>

  );
}

const LogInPage: React.FC<LogInPageProps> = ({navigation}) => {
  return (
    <PageSwitchTamplte navigation={navigation}>
      <LogInScreen/>
    </PageSwitchTamplte>
  );
}

const SignUpPage: React.FC<SignUpPageProps> = ({navigation}) => {
  return (
    <PageSwitchTamplte navigation={navigation}>
      <SignUpScreen/>
    </PageSwitchTamplte>
  );
}

const MainPage: React.FC<LogInPageProps> = ({navigation}) => {
  return (
    <PageSwitchTamplte navigation={navigation}>
      <MainScreen/>
    </PageSwitchTamplte>
  );
}

const NewFlashcardPage: React.FC<NewFlashcardPageProps> = ({navigation}) => {
  return (
    <PageSwitchTamplte navigation={navigation}>
      <NewFlashcardScreen />
    </PageSwitchTamplte>
  );
}

const FlashcardsListPage: React.FC<any> = ({ navigation, route }) => {
  const { range } = route.params;

  return (
    <PageSwitchTamplte navigation={navigation}>
      <FlashcardsListScreen range={range}/>
    </PageSwitchTamplte>
  );
};

const FlashcardsSetPage: React.FC<any> = ({ navigation, route }) => {
  const { id } = route.params;

  return (
    <PageSwitchTamplte navigation={navigation}>
      <FlashcardsSetScreen id={id}/>
    </PageSwitchTamplte>
  );
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer linking={linking}>
       <Stack.Navigator
         screenOptions={{
           headerShown: false
         }}
       >
         <Stack.Screen name="Home" component={HomePage} />
         <Stack.Screen name="LogIn" component={LogInPage} />
         <Stack.Screen name="SignUp" component={SignUpPage} />
         <Stack.Screen name="Main" component={MainPage} />
         <Stack.Screen name="NewFlashcard" component={NewFlashcardPage} />
         <Stack.Screen name="FlashcardsList" component={FlashcardsListPage} />
         <Stack.Screen name="FlashcardsSet" component={FlashcardsSetPage} />
       </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;