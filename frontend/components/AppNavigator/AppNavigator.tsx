import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../HomeScreen/HomeScreen';
import LogInScreen from '../LogInScreen/LogInScreen';
import  {linking} from './../../utils/GLOBALS';
import { HomePageProps, PageSwitchTemplateProps, RootStackParamList, LogInPageProps, MainProps } from '../../types/types';
import SignUpScreen from '../SignUpScreen/SignUpScreen';
import MainScreen from '../MainScreen/MainScreen';
import ExcercisesScreen from '../ExercisesScreen/ExcercisesScreen';


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

const SignUpPage: React.FC<LogInPageProps> = ({navigation}) => {
  return (
    <PageSwitchTamplte navigation={navigation}>
      <SignUpScreen/>
    </PageSwitchTamplte>
  );
}

const MainPage: React.FC<MainProps> = ({navigation}) => {
  return (
    <PageSwitchTamplte navigation={navigation}>
      <MainScreen/>
    </PageSwitchTamplte>
  );
}

const ExcercisesPage: React.FC<any> = ({ navigation, route }) => {
  const { searchableText } = route.params;

  return (
    <PageSwitchTamplte navigation={navigation}>
      <ExcercisesScreen searchableText={searchableText}/>
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
         <Stack.Screen name="Excercises" component={ExcercisesPage}/>
       </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;