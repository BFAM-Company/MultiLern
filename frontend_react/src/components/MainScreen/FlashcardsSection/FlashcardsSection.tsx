import React from 'react';
import './FlashcardsSection.css';
import { useNavigate } from 'react-router-dom';

function FlashcardsSection() {
    const navigate = useNavigate()
  return (
    <div className="mainContainer">
      <div className="topHeader">
        <h2 className="title">Fiszki</h2>
      </div>
      <div 
        className="container" 
        onClick={() => navigate('/flashcardsList?range=my')}
      >
        <img 
          className="image" 
          src="/assets/flashcards-icon2.png" 
          alt="Flashcards Icon" 
        />
        <h3 className="buttonTitle">Twoje Fiszki</h3>
        <button 
          className="buttonDescription" 
          onClick={(e) => {
            e.stopPropagation();
            navigate('/flashcardsList?range=all');
          }}
        >
          Zobacz wszystkie
        </button>
        <button 
          className="button" 
          onClick={(e) => {
            e.stopPropagation();
            navigate('/flashcardsList?range=my');
          }}
        >
          Dalej
        </button>
      </div>
      <div 
        className="container" 
        onClick={() => navigate('/newFlashcard')}
      >
        <img 
          className="image" 
          src="/assets/flashcards-icon.png" 
          alt="New Flashcards Icon" 
        />
        <h3 className="buttonTitle">Nowe Fiszki</h3>
        <p className="buttonDescription">Utwórz nowy set</p>
        <button 
          className="button" 
          onClick={(e) => {
            e.stopPropagation();
            navigate('/newFlashcard');
          }}
        >
          Utwórz +
        </button>
      </div>
    </div>
  );
}

export default FlashcardsSection;
