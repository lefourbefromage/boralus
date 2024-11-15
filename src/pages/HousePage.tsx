import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HousePage: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null); // Référence pour l'élément audio
    const [isPlaying, setIsPlaying] = useState(true); // État pour gérer le statut de lecture
  
    useEffect(() => {
        if (audioRef.current) {
          audioRef.current.volume = 0.1; // Définit le volume à 50% au chargement
        }
      }, []);

    const togglePlayPause = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying); // Bascule l'état de lecture
      }
    };

  const navigate = useNavigate();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const vinyls = [
    '/assets/stormrage.webp',
    '/assets/buffalo.webp',
    '/assets/fjord.webp',
    '/assets/hardcore.webp',
    '/assets/monastere.webp',
  ];
  const openGallery = () => {
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const goToChest = () => {
    navigate('/chest');
  };

  return (

    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <audio ref={audioRef} src="/assets/song.mp3" autoPlay loop />
        <div
            className='button'
            style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            cursor: 'pointer',
            }}
            onClick={togglePlayPause}
        >
            {isPlaying ? 'Pause' : 'Play'}
        </div>


      <h1>Bienvenue à la maison</h1>
      <div style={{ marginTop: '20px' }}>
        <button onClick={openGallery} style={{ margin: '10px', padding: '10px 20px' }}>
          Pile de vinyles
        </button>
        <a className="button" href="./assets/books.pdf" target='_blank' style={{ margin: '10px', padding: '10px 20px' }}>
          Livre sur la table
        </a>
        <button onClick={goToChest} style={{ margin: '10px', padding: '10px 20px' }}>
          Coffre fermé
        </button>
      </div>

      {/* Galerie des vinyles */}
      {isGalleryOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            overflow: 'auto'
          }}
          onClick={closeGallery}
        >
          {vinyls.map((image, index) => (
            <a href={image} target='_blank' key={index} style={{ margin: '10px' }}>
              <img
                src={image}
                alt={`Vinyl ${index + 1}`}
                style={{
                  maxWidth: '500px',
                  maxHeight: '500px',
                  cursor: 'pointer'
                }}
              />
            </a>
          ))}
          <button
            onClick={closeGallery}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              border: 'none',
              padding: '10px 15px',
              cursor: 'pointer',
              fontSize: '16px',
              borderRadius: '5px',
            }}
          >
            Fermer
          </button>
        </div>
      )}
      
    </div>
  );
};

export default HousePage;