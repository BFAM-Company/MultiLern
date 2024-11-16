import React, { useContext, useState } from 'react';
import './CommentButton.css';
import * as ImagePicker from 'react-image-picker-editor'; // Use a suitable library for image picking
import { UserDataContext } from '../context/UserContext/UserContext';
import { AxiosContext } from '../context/AxiosProvider/AxiosProvider';

interface PostContentProps {
  id: number;
  handleRefresh: any;
}

interface IImages {
  images: {
    create: {
      img: string;
    };
  };
}[];

function CommentButton({ id, handleRefresh }: PostContentProps) {
  const userContext = useContext(UserDataContext);
  const { publicAxios, authAxios } = useContext(AxiosContext);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [title, onChangeTitle] = useState<string>('');
  const [content, onChangeContent] = useState<string>('');
  const [images, setImages] = useState<IImages[]>([]);

  const pickImage = async () => {
    // Handle image picking for the web (use a file input or an image picker library)
    const result = await ImagePicker.pickImage({ quality: 0.1 });

    if (result) {
      const image: IImages = {
        images: {
          create: {
            img: result.base64,
          },
        },
      };
      setImages((prevState) => [...prevState, image]);
    }
  };

  const handleClick = () => {
    setModalVisible(true);
  };

  const removeImage = (imageId: number) => {
    const updatedImages = images.filter((_, index) => index !== imageId);
    setImages(updatedImages);
  };

  const handleCommentSubmit = async () => {
    const event = new Date();

    await publicAxios.post(
      `/posts/comment`,
      {
        title: title,
        content: content,
        date: event.toISOString(),
        parentPostId: id,
        images: images,
        userId: userContext?.userData?.id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    setModalVisible(false);
    await handleRefresh();
  };

  return (
    <>
      {modalVisible && (
        <div className="modal" style={{ width: '100%', height: '100%' }}>
          <div className="modal-container">
            <div className="close-button-container">
              <button onClick={() => setModalVisible(false)} className="close-button">
                <img src="/assets/close-icon-bold.png" alt="Close" style={{ width: 30, height: 30 }} />
              </button>
            </div>
            <h2 className="hint-text">Dodaj tytuł do swojej odpowiedzi!</h2>
            <p className="small-hint-text">
              Może ułatwić to późniejsze znalezienie twojej odpowiedzi innym użytkownikom
            </p>
            <input
              style={{ width: '90%' }}
              onChange={() => onChangeTitle}
              value={title}
              placeholder="tytuł(opcjonalny)..."
            />
            <h2 className="hint-text">Dodaj treść swojej odpowiedzi</h2>
            <p className="small-hint-text">Pomóż innym. Staraj się wyjaśnić rozwiązanie i swój tok myślenia!</p>
            <textarea
              style={{ width: '90%', minHeight: 400 }}
              onChange={(e) => onChangeContent(e.target.value)}
              value={content}
              placeholder="Rozwiązanie..."
            />
            <h2 className="hint-text">Dodaj obrazy do swojej odpowiedzi</h2>
            <div className="image-gallery">
              {images.map((image: any, index) => (
                <button key={index} onClick={() => removeImage(index)} className="image-button">
                  <img style={{ width: 100, height: 100, opacity: 0.7, borderRadius: 5 }} src={image.images.create.img} />
                </button>
              ))}
              <button onClick={pickImage} className="upload-button">
                <img style={{ width: 50, height: 50, opacity: 0.5 }} src="/assets/upload-icon.png" alt="Upload" />
              </button>
            </div>
            <button onClick={handleCommentSubmit} className="submit-button">
              <span style={{ color: 'white', fontWeight: '900', fontSize: 22 }}>Wyślij</span>
            </button>
          </div>
        </div>
      )}
      <button onClick={handleClick} className="submit-button">
        <span style={{ color: 'white', fontWeight: '900', fontSize: 22 }}>Odpowiedz</span>
      </button>
    </>
  );
}

export default CommentButton;
