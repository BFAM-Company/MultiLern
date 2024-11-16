import React from 'react';
import './FeatureBox.css'; // Assuming you have a separate CSS file for styling

interface FeatureBoxProps {
  buttonAction: () => void;
  imageSource: string; // For React web, we use string paths for images
  title: string;
  children: string | JSX.Element;
  buttonText: string;
}

function FeatureBox({ buttonAction, imageSource, title, children, buttonText }: FeatureBoxProps) {
  return (
    <div className="featureBox" data-testid="feature-box">
      <div
        className="imageBackground"
        style={{
          backgroundImage: `url(${imageSource})`,
        }}
      >
        <h3 className="title">{title}</h3>
        <p className="description">{children}</p>
        <button className="button" onClick={buttonAction}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default FeatureBox;
