import React, { createContext, useState, ReactNode } from "react";

export interface FichesContextType {
  fichesState: number;
  setFichesState: (fichesState: number) => void;
}


const FichesContext = createContext<FichesContextType | null>(null);
const { Provider } = FichesContext;

const FichesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fichesState, setFichesState] = useState<number>(0);

  return (
    <Provider
      value={{
        fichesState,
        setFichesState
      }}
    >
      {children}
    </Provider>
  );
};

export { FichesContext, FichesProvider };
