import React, { useState } from 'react';
// import './ExcercisesCard.css';
import RateComponent from './RateComponent';
import PostContent from './PostContent';

interface SubjectCardProps {
  id: number;
  user_data: any[];
  category?: string;
  title: string;
  description: string;
  rate: number;
  date: string;
  posts_images: any[];
}

function ExercisesCard({
  id,
  category,
  title,
  description,
  rate,
  date,
  posts_images,
  user_data,
}: SubjectCardProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handlePress = () => setIsActive(true);
  const handleClose = () => setIsActive(false);

  return (
    <>
      {!isActive && (
        <div className="cardContainer" onClick={handlePress}>
          <div className="cardContent">
            <div
              className="imageBackground"
              style={{
                backgroundImage: `url('/assets/cool-background.png')`,
              }}
            >
              <div className="infoContainer">
                <p className="categoryText">{category}</p>
                <h3 className="titleText">{title}</h3>
                <p>{description}</p>
              </div>
              <div className="userInfoContainer">
                <img
                  className="userIcon"
                  src={
                    user_data[0]?.users?.avatar
                      ? user_data[0].users.avatar
                      : '/assets/demo-user-icon.png'
                  }
                  alt="User Avatar"
                />
                <div>
                  <p>{user_data[0]?.users?.nickname}</p>
                  <p>{date}</p>
                </div>
                <div className="ratingContainer">
                  <RateComponent rate={rate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isActive && (
        <div className="modalOverlay">
          <div className="modalContent">
            <PostContent
              id={id}
              title={title}
              handleClose={handleClose}
              posts_images={posts_images}
              content={description}
              user_data={user_data}
              date={date}
            />
            <button className="closeButton" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ExercisesCard;
