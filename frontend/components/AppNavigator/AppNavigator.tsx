import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../HomeScreen/HomeScreen';
import SignUpScreen from '../SignUpScreen/SignUpScreen';
import  {linking} from './../../utils/GLOBALS';
import { HomePageProps, PageSwitchTemplateProps, RootStackParamList, SignUpPageProps } from '../../types/types';


const PageSwitchTamplte: React.FC<PageSwitchTemplateProps> = ({ navigation, children }) => {
  const pageChanger = (page: keyof RootStackParamList) => {
    navigation.navigate(page);
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
const SignUpPage: React.FC<SignUpPageProps> = ({navigation}) => {
  return (
    <PageSwitchTamplte navigation={navigation}>
      <SignUpScreen/>
    </PageSwitchTamplte>
  );
}

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
         <Stack.Screen name="SignUp" component={SignUpPage} />
       </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;