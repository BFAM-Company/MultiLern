import React from "react";
import "./Button.css";

interface ButtonProps {
  buttonAction: () => void;
  icons?: string[];
  children: string | JSX.Element;
  colors: string[];
  fontColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  buttonAction,
  icons,
  children,
  colors,
  fontColor,
}) => {
  const gradient = `linear-gradient(${colors.join(", ")})`;

  return (
    <button
      className="custom-button"
      onClick={buttonAction}
      style={{ background: gradient }}
    >
      <span
        className="button-text"
        style={{
          color: fontColor || "rgb(33,33,43)",
          textAlign: icons ? "left" : "center",
        }}
      >
        {children}
      </span>
      {icons && (
        <div className="images-container">
          {icons.map((icon, index) => (
            <img
              key={index}
              src={icon}
              alt={`Icon ${index}`}
              className="account-service-icon"
              style={{
                filter: `invert(${fontColor === "white" ? 1 : 0})`,
              }}
            />
          ))}
        </div>
      )}
    </button>
  );
};

export default Button;
