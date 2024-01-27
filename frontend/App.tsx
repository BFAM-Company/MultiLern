import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './components/HomeScreen/HomeScreen';
import SignUpScreen from './components/SignUpScreen/SignUpScreen';
import PageSwitchTemplateProps from './types/types';


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

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
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

export default App;