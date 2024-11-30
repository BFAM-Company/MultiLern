import * as React from 'react';
import AppNavigator from './components/AppNavigator/AppNavigator';
import { AuthProvider } from './components/context/AuthContext/AuthContext';
import { AxiosProvider } from './components/context/AxiosProvider/AxiosProvider';
import { UserDataProvider } from './components/context/UserContext/UserContext';
import { FichesProvider } from './components/context/FichesContext/FichesContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { LogBox, StyleSheet } from 'react-native';


function App() {

  LogBox.ignoreAllLogs()

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