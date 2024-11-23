import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookPage: React.FC = () => {
  const navigate = useNavigate();
  const [contactName, setContactName] = useState('');
  const [contactLocation, setContactLocation] = useState('');
  const [error, setError] = useState('');

  // Fonction pour valider et rediriger
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const redirections: { [key: string]: string } = {
      'milhouse,dornogal': '/milhouse',
      'gorgonzormu,valdrakken': '/fromage',
      'izkrk\'tkrzn,cite des fils': '/egg',
      'malia pierce,reve d’emeraude': '/drood',
    };
  
    // Normaliser les entrées pour ignorer les majuscules et accents
    const normalizeInput = (input: string) =>
      input
        .toLowerCase() // Convertit en minuscules
        .normalize('NFD') // Décompose les caractères spéciaux
        .replace(/[\u0300-\u036f]/g, ''); // Supprime les accents
  
    const key = `${normalizeInput(contactName)},${normalizeInput(contactLocation)}`;
  
    if (redirections[key]) {
      navigate(redirections[key]);
    } else {
      setError('Contact ou localisation invalide. Veuillez réessayer.');
    }
  };

  return (
    <div className="main__container book">
      <a href="/house" type="button" className="house__cta">
        Fermer le livre
      </a>

      <img className="book__img" src="./assets/book.webp" alt="Book"></img>

      <div className="book__form">
        <h2>Aller à la rencontre de</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="contactName">
              Nom du contact
              <small>(avec ou sans accents)</small>
            </label>
            <input
              type="text"
              id="contactName"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactLocation">Localisation du contact
            <small>Nom de la ville ou se situe le contact</small>

            </label>
            <input
              type="text"
              id="contactLocation"
              value={contactLocation}
              onChange={(e) => setContactLocation(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit__cta">
            Valider
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default BookPage;