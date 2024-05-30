import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import RateComponent from "./RateComponent";

jest.mock("@react-native-async-storage/async-storage", () => require("../../../__mocks__/mock-async-storage"));


describe('RateComponent', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { toJSON } = render(<RateComponent rate={5} />);
        expect(toJSON()).toMatchSnapshot();
    });


    it('displays correct number of stars based on initial rate prop', async () => {
        const { getAllByTestId } = render(<RateComponent rate={3} />);
        const stars = getAllByTestId('star')

        expect(stars[0]).toHaveStyle({ opacity: 1 });
        expect(stars[1]).toHaveStyle({ opacity: 1 });
        expect(stars[2]).toHaveStyle({ opacity: 1 });
        expect(stars[3]).toHaveStyle({ opacity: 1 });
        expect(stars[4]).toHaveStyle({ opacity: 1 });
    });

    it('updates stars when user rates', async () => {
        const { getAllByTestId } = render(<RateComponent rate={3} />);
        const star5 = getAllByTestId('star')[4];

        fireEvent.press(star5);

        await waitFor(() => {
            const updatedStar5 = getAllByTestId('star')[4];
            expect(updatedStar5).toHaveStyle({ opacity: 1 });
        });
    });

});
