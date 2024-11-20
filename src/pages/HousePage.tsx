import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HousePage: React.FC = () => {
  const [hoveredClass, setHoveredClass] = useState<string | null>(null);

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

  const links = [
    { className: 'house__link--songs', label: 'Pile de vinyles', onClick: openGallery , href: '#', isButton: true },
    { className: 'house__link--book', label: 'Livre sur la table', href: './assets/books.pdf', isButton: false },
    { className: 'house__link--coffre', label: 'Coffre fermé', href: '/chest', isButton: false },
    { className: 'house__link--bag', label: 'Sac', href: '/bag', isButton: false },
  ];

  return (
    <div className={`house ${hoveredClass ? `house--${hoveredClass.split('--')[1]}` : ''}`}>
        <audio ref={audioRef} src="/assets/song.mp3" autoPlay loop />
        <div className={`house__audio ${isPlaying ? 'house__audio--pause' : ''}`}  onClick={togglePlayPause}>
            {isPlaying ? 'Pause' : 'Play'}
        </div>


        <div >
          
          {links.map((link, index) =>
            link.isButton ? (
              <button
                key={index}
                className={`house__link ${link.className}`}
                onMouseEnter={() => setHoveredClass(link.className)}
                onMouseLeave={() => setHoveredClass(null)}
                onClick={link.onClick} //
              >
                {link.label}
              </button>
            ) : (
              <a
                key={index}
                className={`house__link ${link.className}`}
                href={link.href}
                target={link.href.startsWith('./') ? '_blank' : '_self'}
                onMouseEnter={() => setHoveredClass(link.className)}
                onMouseLeave={() => setHoveredClass(null)}
              >
                {link.label}
              </a>
            )
          )}
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
        >
          <div className="songs">
            {vinyls.map((image, index) => (
              <a href={image} className='song' target='_blank' key={index}>
                <img
                  src={image}
                  alt={`Vinyl ${index + 1}`}
                
                />
              </a>
            ))}
          </div>
          
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