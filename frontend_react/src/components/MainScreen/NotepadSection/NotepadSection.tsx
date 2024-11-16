import React from 'react';
import './NotepadSection.css';
import { useNavigate } from 'react-router-dom';

function NotepadSection() {

    const navigate = useNavigate()

  return (
    <div className="mainContainer">
      <div className="topHeader">
        <h2 className="title">Notatki</h2>
      </div>
      <div className="container" onClick={() => navigate('/notes')}>
        <img className="image" src="/assets/notepad-bcg.png" alt="Notepad Background" />
        <h3 className="buttonTitle">Twoje Notatki</h3>
        <p className="buttonDescription">Zobacz wszystkie</p>
        <button className="button" onClick={() => navigate('/notes')}>
          Dalej
        </button>
      </div>
      <div className="container" onClick={() => navigate('/notes')}>
        <img className="image" src="/assets/pencilKit-icon.png" alt="Pencil Kit Icon" />
        <h3 className="buttonTitle">Nowa Notatka</h3>
        <p className="buttonDescription">Zacznij notować</p>
        <button className="button" onClick={() => navigate('/notes')}>
          Utwórz +
        </button>
      </div>
    </div>
  );
}

export default NotepadSection;
