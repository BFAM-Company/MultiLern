import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './components/MainPage/MainPage';
// import SignUpScreen from './SignUpScreen';

var Theme = true;

function HomePage({navigation}: any) {
  const pageChanger = (page: any)=>{
    navigation.navigate(page);
  }

  return (
    <HomeScreen theme={Theme} pageSwitcher = {pageChanger} />
  );
}

// function SignUpPage({navigation}) {
//   const pageChanger = (page)=>{
//     navigation.navigate(page);
//   }
//   return (
//     <SignUpScreen theme={Theme} pageSwitcher = {pageChanger} />
//   );
// }

// const Stack = createNativeStackNavigator();

function App() {
  return (
    <View>

    </View>
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerShown: false
    //     }}
    //   >
        
    //     <Stack.Screen name="Home" component={HomePage} />
    //     {/* <Stack.Screen name="SignUp" component={SignUpPage} /> */}
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default App;