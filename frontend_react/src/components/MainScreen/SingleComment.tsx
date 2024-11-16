import React, { useState } from 'react';
import './SingleComment.css';
import RateComponent from './RateComponent';
import PostContent from './PostContent';

interface SubjectCardProps {
  id: number;
  user_data: any[];
  category?: any[];
  title: string;
  description: string;
  rate: number;
  date: string;
  posts_images: any[];
}

const SingleComment: React.FC<SubjectCardProps> = ({ 
  id, 
  category, 
  title, 
  description, 
  rate, 
  date, 
  posts_images, 
  user_data 
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handlePress = () => {
    setIsActive(true);
  };

  const handleClose = () => {
    setIsActive(false);
  };

  return (
    <>
      <div
        onClick={handlePress}
        className={`card-container ${isActive ? 'hidden' : ''}`}
      >
        <div className="comment-container">
          <div className="user-container">
            <img
              className="user-icon"
              src={user_data[0].users.avatar || '/demo-user-icon.png'}
              alt="User"
            />
            <div>
              <p>{user_data[0].users.nickname}</p>
              <p>{date}</p>
            </div>
            <div className="rating-container">
              <RateComponent rate={rate} />
            </div>
          </div>
          <p className="comment-title-text" title={title}>
            {title}
          </p>
          <p className="comment-content" title={description}>
            {description}
          </p>
        </div>
      </div>

      {isActive && (
        <div className="modal" onClick={handleClose}>
          <div className="elements-container" onClick={(e) => e.stopPropagation()}>
            <PostContent 
              id={id} 
              title={title} 
              handleClose={handleClose} 
              posts_images={posts_images} 
              content={description} 
              user_data={user_data} 
              date={date} 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SingleComment;
