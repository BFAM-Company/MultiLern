import React, { createContext, useState, ReactNode } from "react";

interface UserDataState {
  nickname: string;
  email: string;
  avatar: string | null;
  isLogged: boolean
}

export interface UserDataContextType {
  userData: UserDataState | undefined;
  setUserData: (userData: UserDataState) => void;
}


const UserDataContext = createContext<UserDataContextType | null>(null);
const { Provider } = UserDataContext;

const UserDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserDataState>();

  return (
    <Provider
      value={{
        userData,
        setUserData
      }}
    >
      {children}
    </Provider>
  );
};

export { UserDataContext, UserDataProvider };
