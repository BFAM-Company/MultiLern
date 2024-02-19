import * as React from 'react';
import AppNavigator from './components/AppNavigator/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native';

function App() {
  return (
      <AppNavigator/>
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