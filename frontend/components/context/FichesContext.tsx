import React, { createContext, useState, ReactNode } from "react";

// export interface FichesState {
//   id: number
// }

export interface FichesContextType {
  // fichesState: FichesState;
  // setFichesState: (fichesState: FichesState) => void;

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
