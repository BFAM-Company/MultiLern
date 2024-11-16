import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import './NotificationModal.css';

interface NotificationModalProps {
  buttonAction: (action: string) => void;
  hideHandler: () => void;
  isVisible: boolean;
}

interface NotificationProps {
  buttonAction: () => void;
  content: string;
}

function Notification({ buttonAction, content }: NotificationProps) {
  return (
    <div className="modalButton" onClick={buttonAction}>
      <span className="notificationContent">{content}</span>
    </div>
  );
}

function NotificationModal({ buttonAction, hideHandler, isVisible }: NotificationModalProps) {
  return (
    <ReactModal
      isOpen={isVisible}
      onRequestClose={hideHandler}
      className="modalContent"
      overlayClassName="modalOverlay"
      ariaHideApp={false}
    >
      <div className="mainModalContainer">
        <div className="closeButtonContainer">
          <h2 className="notificationTitle">Powiadomienia</h2>
          <button className="closeButton" onClick={hideHandler} aria-label="Close">
            <img
              src="/assets/close-icon-bold.png"
              alt="Close"
              className="closeButtonIcon"
            />
          </button>
        </div>
        <div className="buttonsContainer">
          <Notification
            content="Dodaj swoje pierwsze zadanie"
            buttonAction={() => buttonAction('CreatePost')}
          />
          <Notification
            content="Pomagaj innym! Dodawaj własne rozwiązania i dziel się swoją wiedzą"
            buttonAction={() => buttonAction('CreatePost')}
          />
          <Notification
            content="Zobacz najbardziej popularne sety leksykalne!"
            buttonAction={() => buttonAction('FlashcardsList')}
          />
          <Notification
            content="Notuj z MultiLern"
            buttonAction={() => buttonAction('Notes')}
          />
        </div>
      </div>
    </ReactModal>
  );
}

export default NotificationModal;
