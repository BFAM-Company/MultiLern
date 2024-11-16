import React from 'react';
import { useState } from 'react';
import './BoxCarousel.css'; // Assuming you'll have a separate CSS file for styles
import FeatureBox from '../FeatureBox/FeatureBox.tsx'; // Assuming you have a similar FeatureBox component for the web
import { useNavigate } from 'react-router-dom';

function BoxCarousel() {
    const navigate = useNavigate()
  const IMAGES = {
    ImageBackground1: '/assets/cool-background.png',
    ImageBackground2: '/assets/cool-background (1).png',
    ImageBackground3: '/assets/cool-background (2).png',
    ImageBackground4: '/assets/cool-background (3).png',
  };

  return (
    <div className="mainContainer">
      <div className="scroll">
        <div className="carousel">
          <FeatureBox buttonAction={() => navigate('/main')} title={'Rozwiązania Zadań'} buttonText={'Zobacz'} imageSource={IMAGES.ImageBackground1}>
            Najlepsze rozwiązania zadań. Wszystkie podręczniki i sprawdzone odpowiedzi przez ekspertów i specjalną sztuczną inteligencję.
          </FeatureBox>
          <FeatureBox buttonAction={() => navigate('/main')} title={'Nowoczesne Sposoby Nauki'} buttonText={'Zobacz'} imageSource={IMAGES.ImageBackground2}>
            Już dziś zacznij korzystać z nowoczesnych technik nauki i pomocy naukowych. Fiszki, notatki to tylko część dostępnych narzędzi.
          </FeatureBox>
          <FeatureBox buttonAction={() => navigate('/main')} title={'Baza Sprawdzianów'} buttonText={'Zobacz'} imageSource={IMAGES.ImageBackground3}>
            Największa baza sprawdzianów, z różnych szkół, nauczycieli i poziomów nauczania. Sprawdź czy mamy coś, co może Ci pomóc.
          </FeatureBox>
          <FeatureBox buttonAction={() => navigate('/main')} title={'Korepetycje'} buttonText={'Zobacz'} imageSource={IMAGES.ImageBackground4}>
            Znajdź osoby chętne do pomocy z całej Polski. Umów spotkania za pośrednictwem naszego chatu. Daj sobie pomóc!
          </FeatureBox>
        </div>
      </div>
    </div>
  );
}

export default BoxCarousel;
