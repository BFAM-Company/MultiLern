import React, { createContext, useState, ReactNode } from "react";

// Typy danych użytkownika
export interface UserDataState {
  id: number;
  nickname: string;
  email: string;
  avatar: string | null;
}

export interface UserDataContextType {
  userData: UserDataState | undefined;
  setUserData: (userData: UserDataState) => void;
}

// Tworzenie kontekstu
const UserDataContext = createContext<UserDataContextType | null>(null);

const UserDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserDataState | undefined>(undefined);

  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext, UserDataProvider };
