import React from 'react'
import { fireEvent, render } from "@testing-library/react-native";
import PostContent from "./PostContent";

jest.mock("@react-native-async-storage/async-storage", () => require("../../../__mocks__/mock-async-storage"));

describe('PostContent component', () => {
  const mockUserData = [
    {
      users: {
        avatar: 'mock-avatar-url',
        nickname: 'JohnDoe'
      }
    }
  ];
  const mockProps = {
    id: 1,
    title: 'Test Post',
    user_data: mockUserData,
    date: '2024-05-29',
    content: 'This is a test post content',
    handleClose: jest.fn(),
    posts_images: [{ images: { img: 'mock-image-url' } }]
  };

  it('renders correctly', () => {
        const { toJSON } = render(<PostContent {...mockProps} />);
        expect(toJSON()).toMatchSnapshot();
    });

    it('opens zoom modal with correct image when an image is pressed', () => {
    const { getByTestId } = render(<PostContent {...mockProps} />);
    const imageTouchable = getByTestId('image-touchable-0');
    fireEvent.press(imageTouchable);

    const zoomedImage = getByTestId('zoomed-image');
    expect(zoomedImage.props.source.uri).toBe('mock-image-url');
  });

  it('closes the zoom modal when the modal is pressed', () => {
    const { getByTestId } = render(<PostContent {...mockProps} />);
    const imageTouchable = getByTestId('image-touchable-0');
    fireEvent.press(imageTouchable);

    const zoomModal = getByTestId('zoom-modal');
    fireEvent.press(zoomModal);

    expect(zoomModal.props.visible).toBe(true);
  });

});