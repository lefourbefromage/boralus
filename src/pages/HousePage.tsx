import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HousePage: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null); // Référence pour l'élément audio
    const [isPlaying, setIsPlaying] = useState(false); // État pour gérer le statut de lecture
  
    useEffect(() => {
        if (audioRef.current) {
          audioRef.current.volume = 0.05; // Définit le volume à 50% au chargement
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
  const [activeGallery, setActiveGallery] = useState<'vinyls' | 'books' | null>(null);

  const vinyls = [
    '../src/assets/postal.jpg',
    '../src/assets/postal.jpg',
  ];

  const books = [
    '../src/assets/postal.jpg',
    '../src/assets/postal.jpg',
  ];

  const openGallery = (gallery: 'vinyls' | 'books') => {
    setActiveGallery(gallery);
  };

  const closeGallery = () => {
    setActiveGallery(null);
  };

  const goToChest = () => {
    navigate('/chest');
  };

  const galleryImages = activeGallery === 'vinyls' ? vinyls : books;

  return (

    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <audio ref={audioRef} src="../src/assets/song.mp3" autoPlay loop />
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
        <button onClick={() => openGallery('vinyls')} style={{ margin: '10px', padding: '10px 20px' }}>
          Pile de vinyles
        </button>
        <a className="button" href="../src/assets/books.pdf" target='_blank' style={{ margin: '10px', padding: '10px 20px' }}>
          Livre sur la table
        </a>
        <button onClick={goToChest} style={{ margin: '10px', padding: '10px 20px' }}>
          Coffre fermé
        </button>
      </div>

      {/* Galerie active */}
      {activeGallery && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            overflow: 'auto',

          }}
          onClick={closeGallery}
        >
            <div
                style={{
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    flexFlow: 'column',
                    gap:'20px',
                    padding: '20px'
                }}
            >
            {galleryImages.map((image, index) => (
            <a href={image} target='blank' key={index} style={{ display:'block' }}>
              <img
                src={image}
                alt={`Gallery item ${index + 1}`}
                style={{ maxWidth: '50vw', maxHeight: '50vh', display: 'block', cursor: 'pointer'}}
              />
            </a>
          ))}
            </div>
          
          <button
            onClick={closeGallery}
            style={{
              position: 'fixed',
              top: '20px',
              right: '40px',
              backgroundColor: 'white',
              border: 'none',
              padding: '10px 15px',
              cursor: 'pointer',
              fontSize: '16px',
              borderRadius: '5px',
              color: 'black'
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