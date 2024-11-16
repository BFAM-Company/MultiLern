import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import "./HomeScreen.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";


const HomeScreen = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate()

  const loginByGuest = async () => {
    authContext?.setAuthState({
      accessToken: "dupa",
      refreshToken: "dupa",
      authenticated: true,
      isLoggingByGuest: true,
    });
    navigate('/main')
  };

  return (
    <div className="main-container">
      <div className="image-background">
        <div className="account-create-container">
          <div className="logo-container">
            <img
              alt="Logo"
              src="/assets/multilern-logo.png"
              className="logo-image"
            />
            <h1 className="title-text">MultiLern</h1>
          </div>
          <div className="main-text-container">
            <p className="main-text">
              Dołącz do nas i podnieść swoją naukę na wyższy poziom
            </p>
          </div>
          <div className="buttons-container">
            <Button
              colors={["#ffffff"]}
              fontColor="rgb(255, 255, 255)"
              buttonAction={() => navigate("/signup")}
              icons={[
                "/assets/discord-icon.png",
                "/assets/apple-icon.png",
                "/assets/facebook-icon.png",
                "/assets/lock-alt.png",
              ]}
            >
              Zarejestruj się
            </Button>
            <Button
              colors={["#ffffff"]}
              fontColor="rgb(255, 255, 255)"
              buttonAction={() => navigate("/login")}
              icons={["/assets/logIn-icon.png"]}
            >
              Zaloguj się
            </Button>
            <Button
              colors={["rgb(33,33,43)"]}
              fontColor="rgb(255, 255, 255)"
              buttonAction={loginByGuest}
              icons={["/assets/guest-icon.png"]}
            >
              Kontynuuj jako gość
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
