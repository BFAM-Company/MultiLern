import React, {useCallback, useContext, useEffect} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../HomeScreen/HomeScreen';
import LogInScreen from '../LogInScreen/LogInScreen';
import  {linking} from './../../utils/GLOBALS';

import { HomePageProps, PageSwitchTemplateProps, RootStackParamList, LogInPageProps, SignUpPageProps, NewFlashcardPageProps, MainProps, AuthPageProps } from '../../types/types';
import SignUpScreen from '../SignUpScreen/SignUpScreen';
import MainScreen from '../MainScreen/MainScreen';
import NewFlashcardScreen from '../Flashcards/NewFlashcardScreen/NewFlashcardScreen';
import FlashcardsListScreen from '../Flashcards/FlashcardsListScreen/FlashcardsListScreen';
import FlashcardsSetScreen from '../Flashcards/FlashcardsSetScreen/FlashcardsSetScreen';
import ExcercisesScreen from '../ExercisesScreen/ExcercisesScreen';
import { AuthContext } from '../context/AuthContext/AuthContext';
import AuthScreen from '../AuthScreen/AuthScreen';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import NotesScreen from '../NotesScreen/NotesScreen';
import CreatePostScreen from '../CreatePostScreen/CreatePostScreen';
import UserExercises from '../UserExercises/UserExercises';



const PageSwitchTemplate: React.FC<PageSwitchTemplateProps> = ({ navigation, children}) => {
  const pageChanger = (page: keyof RootStackParamList, params?: any) => {
    navigation.navigate(page, params);
  };

  return React.cloneElement(children, {pageSwitcher: pageChanger });
};

export const HomePage: React.FC<HomePageProps> = ({ navigation }) => {
  return (
    <PageSwitchTemplate navigation={navigation}>
          <HomeScreen/>
    </PageSwitchTemplate>

  );
}

export const MainPage: React.FC<MainProps> = ({navigation}) => {
  return (
    <PageSwitchTemplate navigation={navigation}>
      <MainScreen/>
    </PageSwitchTemplate>
  );
}


export const LogInPage: React.FC<LogInPageProps> = ({navigation}) => {
  return (
    <PageSwitchTemplate navigation={navigation}>
      <LogInScreen/>
    </PageSwitchTemplate>
  );
}

export const SignUpPage: React.FC<SignUpPageProps> = ({navigation}) => {
  return (
    <PageSwitchTemplate navigation={navigation}>
      <SignUpScreen/>
    </PageSwitchTemplate>
  );
}


export const ExcercisesPage: React.FC<any> = ({ navigation, route }) => {
  const { searchableText } = route.params;

  return (
    <PageSwitchTemplate navigation={navigation}>
      <ExcercisesScreen searchableText={searchableText}/>
    </PageSwitchTemplate>
    ); 
}
            
export const NewFlashcardPage: React.FC<NewFlashcardPageProps> = ({navigation}) => {
  return (
    <PageSwitchTemplate navigation={navigation}>
      <NewFlashcardScreen />
    </PageSwitchTemplate>
  );
}

export const FlashcardsListPage: React.FC<any> = ({ navigation, route }) => {
  const { range } = route.params;

  return (
    <PageSwitchTemplate navigation={navigation}>
      <FlashcardsListScreen range={range}/>
    </PageSwitchTemplate>
  );
};

export const FlashcardsSetPage: React.FC<any> = ({ navigation, route }) => {
  const { id } = route.params;

  return (
    <PageSwitchTemplate navigation={navigation}>
      <FlashcardsSetScreen id={id}/>
    </PageSwitchTemplate>
  );
};

export const AuthPage: React.FC<AuthPageProps> = ({navigation}) => {
  return (
    <PageSwitchTemplate navigation={navigation}>
      <AuthScreen />
    </PageSwitchTemplate>
  );
}

const NotesPage: React.FC<any> = ({ navigation, route }) => {

  return (
    <PageSwitchTemplate navigation={navigation}>
      <NotesScreen />
    </PageSwitchTemplate>
  );
};

const CreatePostPage: React.FC<any> = ({ navigation, route }) => {

  return (
    <PageSwitchTemplate navigation={navigation}>
      <CreatePostScreen />
    </PageSwitchTemplate>
  );
};

const UserExercisesPage: React.FC<any> = ({ navigation, route }) => {

  return (
    <PageSwitchTemplate navigation={navigation}>
      <UserExercises />
    </PageSwitchTemplate>
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
         <Stack.Screen name="Auth" component={AuthPage} />
         <Stack.Screen name="Home" component={HomePage} options={{headerBackVisible: false, gestureEnabled: false}}  />
         <Stack.Screen name="LogIn" component={LogInPage} />
         <Stack.Screen name="SignUp" component={SignUpPage} />
         <Stack.Screen name="Main" component={MainPage} options={{headerBackVisible: false, gestureEnabled: false}} />
         <Stack.Screen name="Excercises" component={ExcercisesPage}/>
         <Stack.Screen name="NewFlashcard" component={NewFlashcardPage} />
         <Stack.Screen name="FlashcardsList" component={FlashcardsListPage} />
         <Stack.Screen name="FlashcardsSet" component={FlashcardsSetPage} />
         <Stack.Screen name="Notes" component={gestureHandlerRootHOC(NotesPage)} />
         <Stack.Screen name="CreatePost" component={gestureHandlerRootHOC(CreatePostPage)} />
         <Stack.Screen name="UserExercises" component={gestureHandlerRootHOC(UserExercisesPage)} />
       </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;