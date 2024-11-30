import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GobelinPage: React.FC = () => {
  const navigate = useNavigate();

  // Scrolling automatique

  return (
    <div className="dialog-page dialog-page--gobelin">
      <button className="house__cta house__cta--left" onClick={() => navigate('/house')}>Retourner à Boralus</button>

      <div className="dialog-page__content">    
        <div className="dialog-page__message" style={{ animationDelay: '0s' }}>
          Salut ! Comment ça va ?
        </div>

        <div className="dialog-page__message" style={{ animationDelay: '2s' }}>
          Vous venez faire affaire ou vous cherchez un renseignement ?
        </div>

        <div className="dialog-page__message" style={{ animationDelay: '4s' }}>
          Si vous cherchez Grosciflard, il m'a rendu un "service" et je lui ai offert un petit cadeau en retour...
        </div>

        <div className="dialog-page__message" style={{ animationDelay: '7s' }}>
          Ce n'est pas contre vous mais je ne peux pas vous dire où il est actuellement. La seul chose que je peux vous donner c'est le dernier message qu'il m'a envoyé.
        </div>

        <div className="dialog-page__message dialog-page__message--audio" style={{ animationDelay: '10s' }}>
          <audio controls src="assets/alloallo.mp3"></audio>
        </div>

        <div className="dialog-page__message" style={{ animationDelay: '30s' }}>
          Ah ! Il m'a aussi envoyé celui la.
        </div>

        <div className="dialog-page__message dialog-page__message--audio" style={{ animationDelay: '32s' }}>
          <audio controls src="assets/allo2.mp3"></audio>
        </div>

        <div className="dialog-page__message" style={{ animationDelay: '40s' }}>
          Et le dernier...
        </div>

        <div className="dialog-page__message dialog-page__message--audio" style={{ animationDelay: '42s' }}>
          <audio controls src="assets/code.mp3"></audio>
        </div>
      </div>
    </div>
  )
};


export default GobelinPage