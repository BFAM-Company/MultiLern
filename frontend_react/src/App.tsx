import React from 'react';

import './App.css'; // Plik z nowymi stylami
import AppNavigator from './components/AppNavigator/AppNavigator';
import { AuthProvider } from './components/context/AuthContext/AuthContext';
import { UserDataProvider } from './components/context/UserContext/UserContext';
import { AxiosProvider } from './components/context/AxiosProvider/AxiosProvider';

function App() {
  return (
    <AuthProvider>
      <AxiosProvider>
        <UserDataProvider>
          {/* <FichesProvider> */}
            <AppNavigator />
          {/* </FichesProvider> */}
        </UserDataProvider>
      </AxiosProvider>
    </AuthProvider>
  );
}

export default App;
