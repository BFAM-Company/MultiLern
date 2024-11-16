import React, { useContext } from 'react';
import './ExcercisesSection.css'
import { UserDataContext } from '../../context/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';


function ExercisesSection() {
  const userContext = useContext(UserDataContext);
    const navigate = useNavigate()

  return (
    <div className="mainContainer">
      <div className="topHeader">
        <h2 className="title">Potrzebujesz pomocy?</h2>
      </div>
      <div
        className="container"
        onClick={() => navigate(`/userExercises?userId=${userContext?.userData?.id}`)}
      >
        <img
          className="image"
          src="/assets/users-exercises-button-bg.jpg"
          alt="User Exercises"
        />
        <h3 className="buttonTitle">Twoje pytania</h3>
        <p className="buttonDescription">Zobacz wszystkie</p>
        <button
          className="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/userExercises?userId=${userContext?.userData?.id}`);
          }}
        >
          Dalej
        </button>
      </div>
      <div
        className="container"
        onClick={() => navigate('/createPost')}
      >
        <img
          className="image"
          src="/assets/exercises-button-bg.jpeg"
          alt="Create Post"
        />
        <h3 className="buttonTitle">Zadaj pytanie</h3>
        <p className="buttonDescription">Zacznij notować</p>
        <button
          className="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate('/createPost');
          }}
        >
          Utwórz +
        </button>
      </div>
    </div>
  );
}

export default ExercisesSection;
