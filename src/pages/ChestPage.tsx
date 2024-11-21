import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChestPage: React.FC = () => {
  const navigate = useNavigate();
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); // Alphabet A-Z

  // Initialise les valeurs avec des lettres aléatoires
  const getRandomLetter = () => alphabet[Math.floor(Math.random() * alphabet.length)];
  const [inputValues, setInputValues] = useState<string[]>(() =>
    Array(4).fill('').map(() => getRandomLetter())
  );

  // Vérifie si l'accès au coffre a déjà été validé
  useEffect(() => {
    const isCodeValid = localStorage.getItem('chestUnlocked');
    if (isCodeValid === 'true') {
      navigate('/chest-open'); // Redirection automatique
    }
  }, [navigate]);

  // Fonction pour valider le mot de passe
  const validatePassword = (values: string[]) => {
    const enteredCode = values.join('');

    if (enteredCode === 'LARD') {
      localStorage.setItem('chestUnlocked', 'true'); // Stocke la validation
      navigate('/chest-open'); // Redirige vers la page ouverte
    }
  };

  const handleInputChange = (value: string, index: number) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value.toUpperCase(); // Toujours en majuscule
    setInputValues(updatedValues);

    // Vérifie immédiatement si le mot de passe est correct
    validatePassword(updatedValues);
  };

  // Vérifie si le mot de passe est correct au chargement initial
  useEffect(() => {
    validatePassword(inputValues);
  }, [inputValues]);

  return (
    <div className="chest-page">
      <a href="/house" type='button' className="house__cta "  >
        Fermer le coffre
      </a>

      <div className="cryptex">
        <img className='chest-page__clue' src="./assets/sticker.webp" alt="" />

        {inputValues.map((value, index) => {
          const selectedIndex = alphabet.indexOf(value) !== -1 ? alphabet.indexOf(value) : 0;

          return (
            <div className="cryptex__column" key={index}>  
              <div className="cryptex__letter cryptex__letter--above">
                {alphabet[(selectedIndex - 1 + 26) % 26]}
              </div>
              <select
                className="cryptex__input"
                value={value}
                onChange={(e) => handleInputChange(e.target.value, index)}
              >
                <option value="">-</option> {/* Option vide pour initialisation */}
                {alphabet.map((letter, i) => (
                  <option key={i} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
              <div className="cryptex__letter cryptex__letter--below">
                {alphabet[(selectedIndex + 1) % 26]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChestPage;