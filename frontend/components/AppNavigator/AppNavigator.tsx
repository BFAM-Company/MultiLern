import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../HomeScreen/HomeScreen';
import SignUpScreen from '../SignUpScreen/SignUpScreen';
import PageSwitchTemplateProps from '../../types/types';
import { Platform } from 'react-native';



const linking: any = {
  config: {
    screens: {
      Home: "",
      SignUp: "signUp"
    }
  }
}

const PageSwitchTamplte: React.FC<PageSwitchTemplateProps> = ({ navigation, children }) => {
  const pageChanger = (page: string) => {
    navigation.navigate(page);
  };

  return React.cloneElement(children, {pageSwitcher: pageChanger });
};

const HomePage = ({ navigation }: any) => {
  return (
    <PageSwitchTamplte navigation={navigation}>
          <HomeScreen/>
    </PageSwitchTamplte>

  );
}
const SignUpPage = ({navigation}: any) => {
  return (
    <PageSwitchTamplte navigation={navigation}>
      <SignUpScreen/>
    </PageSwitchTamplte>
  );
}

const Stack: any = createNativeStackNavigator();

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