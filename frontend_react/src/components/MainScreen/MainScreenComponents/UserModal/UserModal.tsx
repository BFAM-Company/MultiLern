import React, { useContext, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { UserDataState } from '../../../context/UserContext/UserContext';
import './UserModal.css';

interface UserModalProps {
  buttonAction: (page: string, options?: any) => void;
  hideHandler: () => void;
  isVisible: boolean;
  user: UserDataState | undefined;
}

interface ButtonProps {
  buttonAction: () => void;
  icon: string;
  content: string;
  coloredIcon?: boolean;
}

function Button({ buttonAction, icon, content, coloredIcon = true }: ButtonProps) {
  return (
    <div className="modalButton" onClick={buttonAction}>
      <img
        className={`buttonIcon ${coloredIcon ? 'coloredIcon' : ''}`}
        src={icon}
        alt={`${content} icon`}
      />
      <span>{content}</span>
    </div>
  );
}

function UserModal({ buttonAction, hideHandler, isVisible, user }: UserModalProps) {
  const authContext = useContext(AuthContext);

  const logout = async () => {
    await authContext?.logout();
  };

  return (
    <ReactModal
      isOpen={isVisible}
      onRequestClose={hideHandler}
      className="modalContent"
      overlayClassName="modalOverlay"
      ariaHideApp={false} // Important for accessibility
    >
      <div className="mainModalContainer">
        <div className="accountContainer">
          <div>
            <h2 className="usernameTitle">{user?.nickname}</h2>
            <p className="emailText">{user?.email}</p>
          </div>
          <img className="avatarImage" src={user?.avatar as unknown as string} alt="User avatar" />
        </div>

        <div className="buttonsContainer">
          <Button
            content="Wyszukaj"
            icon="/assets/search-icon.png"
            buttonAction={() => buttonAction('Home')}
          />
          <Button
            content="Twoje Zadania"
            icon="/assets/exercises-icon.png"
            buttonAction={() => buttonAction('UserExercises', { userId: user?.id })}
          />
          <Button
            content="Konto"
            icon={user?.avatar || '/assets/default-avatar.png'}
            buttonAction={() => buttonAction('Home')}
            coloredIcon={false}
          />
          <Button
            content="Ustawienia"
            icon="/assets/settings-icon.png"
            buttonAction={() => buttonAction('Home')}
          />
          <button className="logoutButton" onClick={logout}>
            Wyloguj się
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

export default UserModal;
