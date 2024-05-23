import React from "react";
import { UserDataContext, UserDataProvider } from "./UserContext";
import { render, waitFor } from "@testing-library/react-native";
import { View, Text } from "react-native";

describe("UserDataProvider", () => {
  it("should set and provide user data", async () => {
    const userDataMock = {
      id: 1,
      nickname: "testuser",
      email: "test@example.com",
      avatar: null
    };

    const TestComponent = () => {
      const { userData, setUserData } = React.useContext(UserDataContext)!;
      
      React.useEffect(() => {
        setUserData(userDataMock);
      }, [setUserData]);

      return (
        <View>
          <Text testID="userId">{userData?.id}</Text>
          <Text testID="userNickname">{userData?.nickname}</Text>
          <Text testID="userEmail">{userData?.email}</Text>
        </View>
      );
    };

    const { getByTestId } = render(
      <UserDataProvider>
        <TestComponent />
      </UserDataProvider>
    );

    // Wait for useEffect to set user data
    await waitFor(() => {
      expect(getByTestId("userId").props.children).toBe(1);
      expect(getByTestId("userNickname").props.children).toBe("testuser");
      expect(getByTestId("userEmail").props.children).toBe("test@example.com");
    });
  });
});
