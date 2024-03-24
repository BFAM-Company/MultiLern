import * as React from 'react';
import AppNavigator from './components/AppNavigator/AppNavigator';
import { AuthProvider } from './components/context/AuthContext';
import { AxiosProvider } from './components/context/AxiosProvider';
import { UserDataProvider } from './components/context/UserContext';


function App() {
  return (
      <AuthProvider>
        <AxiosProvider>
          <UserDataProvider>
            <AppNavigator/>
          </UserDataProvider>
        </AxiosProvider>
      </AuthProvider>
  );
}

export default App;