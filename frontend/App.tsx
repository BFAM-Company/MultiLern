import * as React from 'react';
import AppNavigator from './components/AppNavigator/AppNavigator';
import { AuthProvider } from './components/context/AuthContext/AuthContext';
import { AxiosProvider } from './components/context/AxiosProvider/AxiosProvider';
import { UserDataProvider } from './components/context/UserContext/UserContext';
import { FichesProvider } from './components/context/FichesContext/FichesContext';


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

export default App;