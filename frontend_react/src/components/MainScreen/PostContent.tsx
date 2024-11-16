import React, { useEffect, useState } from 'react';
import './PostContent.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface PostContentProps {
  id: number;
  title: string;
  user_data: any[];
  date: string;
  content: string;
  handleClose: () => void;
  posts_images: any[];
}

const PostContent: React.FC<PostContentProps> = ({ id, title, handleClose, posts_images, content, user_data, date }) => {
  const [imageZoom, setImageZoom] = useState<boolean>(false);
  const [zoomedImage, setZoomedImage] = useState<string>('');

  useEffect(() => {
    // Perform any necessary setup or cleanup
  }, []);

  const handleImageClick = (img: string) => {
    setZoomedImage(img);
    setImageZoom(true);
  };

  return (
    <div className="post-content-container">
      <div className="scroll-container" onScroll={handleClose}>
        <div className="separator"></div>
        <div className="content-container">
          <div className="drag-indicator"></div>
          <div className="user-info-container">
            <img
              className="user-icon"
              src={user_data[0]?.users?.avatar || '/path-to-demo-user-icon.png'}
              alt="User Avatar"
            />
            <div className="user-info">
              <span className="nickname">{user_data[0]?.users?.nickname}</span>
              <span className="date">{date}</span>
            </div>
          </div>

          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlay={false}
            centerMode={false}
            containerClass="carousel-container"
            draggable
            focusOnSelect={false}
            infinite
            itemClass="carousel-item"
            keyBoardControl
            minimumTouchDrag={80}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 1,
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 1,
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
              },
            }}
            showDots
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {posts_images.map((item, index) => (
              <button
                key={index}
                className="image-container"
                onClick={() => handleImageClick(item.images.img)}
                data-testid={`image-touchable-${index}`}
              >
                <img
                  src={item.images.img}
                  alt={`Post ${index + 1}`}
                  className="post-image"
                />
              </button>
            ))}
          </Carousel>

          <h2 className="post-title">{title}</h2>
          <p className="content-text">{content}</p>
          <Comments id={id} />
        </div>
      </div>

      {imageZoom && (
        <div className="modal" onClick={() => setImageZoom(false)} data-testid="zoom-modal">
          <img
            src={zoomedImage}
            alt="Zoomed"
            className="zoomed-image"
            data-testid="zoomed-image"
          />
        </div>
      )}
    </div>
  );
};

export default PostContent;
