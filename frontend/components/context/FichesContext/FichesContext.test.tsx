import React from "react";
import { FichesContext, FichesProvider } from "./FichesContext";
import { render, waitFor } from "@testing-library/react-native";
import { View, Text } from "react-native";

describe("UserDataProvider", () => {
  it("should set and provide user data", async () => {
    const fichesStateDataMock = 1

    const TestComponent = () => {
      const { fichesState, setFichesState } = React.useContext(FichesContext)!;
      
      React.useEffect(() => {
        setFichesState(fichesStateDataMock);
      }, [setFichesState]);

      return (
        <View>
          <Text testID="fichesState">{fichesState}</Text>
        </View>
      );
    };

    const { getByTestId } = render(
      <FichesProvider>
        <TestComponent />
      </FichesProvider>
    );

    // Wait for useEffect to set user data
    await waitFor(() => {
      expect(getByTestId("fichesState").props.children).toBe(1);
    });
  });
});
