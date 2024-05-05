import * as React from 'react';
import AppNavigator from './components/AppNavigator/AppNavigator';
import { AuthProvider } from './components/context/AuthContext';
import { AxiosProvider } from './components/context/AxiosProvider';
import { UserDataProvider } from './components/context/UserContext';
import { FichesProvider } from './components/context/FichesContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native';


function App() {
  return (
      <AuthProvider>
        <AxiosProvider>
          <UserDataProvider>
            <FichesProvider>
              <AppNavigator/>
            </FichesProvider>
          </UserDataProvider>
        </AxiosProvider>
      </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    alignItems:'center',
    justifyContent:'center'
  }
})

export default App;