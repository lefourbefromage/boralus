import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedInput = inputValue.trim().toLowerCase();

    if (normalizedInput === 'agneau' || normalizedInput === "l'agneau") {
      navigate('/house');
    } else {
      setErrorMessage('Vous avez toqué à la mauvaise porte');
    }
  };

  return (
    <div className="main__container">
      <form className="main__form" onSubmit={handleSubmit}>
        <label htmlFor="secret-input">Qu'elle est le nom de la maison de Grosciflard ?</label>
        <input
          type="text"
          placeholder="Nom de la maison"
          id="secret-input"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setErrorMessage('');
          }}
        
        />
        <button className='main__submit' type="submit">
          Valider
        </button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default HomePage;