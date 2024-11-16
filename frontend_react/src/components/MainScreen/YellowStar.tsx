import React from 'react';
import './YellowStar.css';

interface YellowStarProps {
  rate: number;
  handlePress: () => void;
}

const YellowStar: React.FC<YellowStarProps> = ({ rate, handlePress }) => {
  const coverageWidth = rate * 25; // Adjust for the percentage of the star to be gold

  return (
    <button className="star-container" onClick={handlePress} data-testid="star">
      <img
        src="/path-to-star-icon.png"
        alt="star-outline"
        className="star-icon"
        style={{ filter: 'brightness(0.5)' }}
      />
      <div
        className="gold-star-container"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: `${coverageWidth}px`,
        }}
      >
        <img
          src="/path-to-star-icon.png"
          alt="gold-star"
          className="star-icon"
          style={{ filter: 'brightness(1)' }}
        />
      </div>
    </button>
  );
};

export default YellowStar;
