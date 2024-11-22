import React, { useEffect, useRef, useState } from 'react';
import Carousel from '../components/carousel';


const HousePage: React.FC = () => {
  const [hoveredClass, setHoveredClass] = useState<string | null>(null);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [isBagVisible, setIsBagVisible] = useState(false); // État pour toggler le bloc "bag"
  const [isChestVisible, setIsChestVisible] = useState(false); // État pour toggler le bloc "bag"
  const [isPlaying, setIsPlaying] = useState(true); // État pour gérer le statut de lecture
  const audioRef = useRef<HTMLAudioElement | null>(null); // Référence pour l'élément audio


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1; // Définit le volume à 50% au chargement
    }

    const chestVisibility = localStorage.getItem('toggleChestVisibility');
    if (chestVisibility === 'true') {
      setIsChestVisible(true); // Définit l'état local
      localStorage.removeItem('toggleChestVisibility');
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

  const handleSongsClick = () => {
    setIsCarouselVisible(true); // Affiche le carousel
  };

  const toggleChestVisibility = () => {
    setIsChestVisible((prevState) => !prevState); // Basculer la visibilité du bag
    setIsBagVisible(false)
  };

  const toggleBagVisibility = () => {
    setIsBagVisible((prevState) => !prevState); // Basculer la visibilité du bag
    setIsChestVisible(false)
  };

  const links = [
    {
      className: 'house__link--songs',
      label: 'Pile de vinyles',
      isButton: true,
      onClick: handleSongsClick, // Affiche le carousel
    },
    { className: 'house__link--book', label: 'Livre sur la table', href: './assets/books.pdf', isButton: false },
    localStorage.getItem('chestUnlocked') === 'true'
    ? {
        className: 'house__link--coffre',
        label: 'Coffre ouvert',
        onClick: toggleChestVisibility,
        isButton: true,
      }
    : {
        className: 'house__link--coffre',
        label: 'Coffre fermé',
        href: '/chest',
        isButton: false,
      },

    { className: 'house__link--bag', label: 'Sac', onClick: toggleBagVisibility, isButton: true },
  ];

  return (    
    <div className={`house ${hoveredClass ? `house--${hoveredClass.split('--')[1]}` : ''}`}>
      <audio ref={audioRef} src="/assets/song.mp3" autoPlay loop />
      <button type='button' className={`house__audio ${isPlaying ? 'house__audio--pause' : ''}`}  onClick={togglePlayPause}>
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 25 24" fill="#FFF" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7 3.25C5.75736 3.25 4.75 4.25736 4.75 5.5V18.4999C4.75 19.7426 5.75736 20.75 7 20.75H8.75C9.99264 20.75 11 19.7426 11 18.4999V5.5C11 4.25736 9.99264 3.25 8.75 3.25H7ZM6.25 5.5C6.25 5.08579 6.58579 4.75 7 4.75H8.75C9.16421 4.75 9.5 5.08579 9.5 5.5V18.4999C9.5 18.9142 9.16421 19.2499 8.75 19.2499H7C6.58579 19.2499 6.25 18.9142 6.25 18.4999V5.5Z" fill="#FFF"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M16.25 3.25C15.0074 3.25 14 4.25736 14 5.5V18.4999C14 19.7426 15.0074 20.75 16.25 20.75H18C19.2426 20.75 20.25 19.7426 20.25 18.4999V5.5C20.25 4.25736 19.2426 3.25 18 3.25H16.25ZM15.5 5.5C15.5 5.08579 15.8358 4.75 16.25 4.75H18C18.4142 4.75 18.75 5.08579 18.75 5.5V18.4999C18.75 18.9142 18.4142 19.2499 18 19.2499H16.25C15.8358 19.2499 15.5 18.9142 15.5 18.4999V5.5Z" fill="#FFF"/>
          </svg>
        ): (
          <svg width="20" height="20" viewBox="0 0 25 24" fill="#FFF" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M19.4357 13.9174C20.8659 13.0392 20.8659 10.9608 19.4357 10.0826L9.55234 4.01389C8.05317 3.09335 6.125 4.17205 6.125 5.93128L6.125 18.0688C6.125 19.828 8.05317 20.9067 9.55234 19.9861L19.4357 13.9174ZM18.6508 11.3609C19.1276 11.6536 19.1276 12.3464 18.6508 12.6391L8.76745 18.7079C8.26772 19.0147 7.625 18.6552 7.625 18.0688L7.625 5.93128C7.625 5.34487 8.26772 4.9853 8.76745 5.29215L18.6508 11.3609Z" fill="#FFF"/>
          </svg>
        )}
      </button>
        
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
            target={link.href && link.href.startsWith('./') ? '_blank' : '_self'} // Vérification de link.href
            onMouseEnter={() => setHoveredClass(link.className)}
            onMouseLeave={() => setHoveredClass(null)}
          >
            {link.label}
          </a>
        )
      )}

      {isCarouselVisible && (
        <div className="carousel">
          <button className="carousel__close" onClick={() => setIsCarouselVisible(false)}>
            Fermer
          </button>

          <Carousel />
        </div>
      )}

      {isChestVisible && (
        <div className="bag">
          <button className="bag__close" onClick={toggleChestVisibility}>
          close
          </button>

          <a href="/registre" className="bag__item bag__item--chest bag__item--book">
            <div className="item bag__popup">
              <div className="item__title item__title--uncommon">Registre de rendez-vous</div>
              <div className="item__level">Niveau d'objet 1</div>
              <div className="item__bind">Lié quand ramassé</div>
              <div className="item__desc">"Un livre regroupant les derniers rendez-vous de Grosciflard" </div>
              <div className="item__use">{`<Cliquer pour lire>`}</div>
            </div>
          </a>

          <a href="./assets/01.webp" target="_blank" className="bag__item bag__item--chest bag__item--code01">
            <div className="item bag__popup">
              <div className="item__title item__title--rare">Bout de papier déchiré - 01</div>
              <div className="item__level">Niveau d'objet 1</div>
              <div className="item__bind">Lié quand ramassé</div>
              <div className="item__desc">"Le coin d'un papier déchiré avec des symboles dessiné." </div>
              <div className="item__use">{`<Cliquer pour voir>`}</div>
            </div>
          </a>

          {localStorage.getItem('clue02') === 'true' && (
            <a href="./assets/02.webp" target="_blank" className="bag__item bag__item--chest bag__item--code02">
              <div className="item bag__popup">
                <div className="item__title item__title--rare">Bout de papier déchiré - 02</div>
                <div className="item__level">Niveau d'objet 1</div>
                <div className="item__bind">Lié quand ramassé</div>
                <div className="item__desc">"Le centre d'un papier déchiré avec des symboles dessiné." </div>
                <div className="item__use">{`<Cliquer pour voir>`}</div>
              </div>
            </a>
          )}

          {localStorage.getItem('clue03') === 'true' && (
            <a href="./assets/03.webp" target="_blank" className="bag__item bag__item--chest bag__item--code03">
              <div className="item bag__popup">
                <div className="item__title item__title--rare">Bout de papier déchiré - 03</div>
                <div className="item__level">Niveau d'objet 1</div>
                <div className="item__bind">Lié quand ramassé</div>
                <div className="item__desc">"Un autre morceau du papier déchiré avec des symboles dessiné." </div>
                <div className="item__use">{`<Cliquer pour voir>`}</div>
              </div>
            </a>
          )}


          {localStorage.getItem('clue04') === 'true' && (
            <a href="./assets/04.webp" target="_blank" className="bag__item bag__item--chest bag__item--code04">
              <div className="item bag__popup">
                <div className="item__title item__title--rare">Bout de papier déchiré - 04</div>
                <div className="item__level">Niveau d'objet 1</div>
                <div className="item__bind">Lié quand ramassé</div>
                <div className="item__desc">"Un coin du morceau du papier déchiré avec des symboles dessiné." </div>
                <div className="item__use">{`<Cliquer pour voir>`}</div>
              </div>
            </a>
          )}

          <img src="/assets/chest.png" alt="Bag" />
        </div>
      )}

      {isBagVisible && (
        <div className="bag">
          <button className="bag__close" onClick={toggleBagVisibility}>
          close
          </button>
          <div className="bag__item bag__item--voucher">
            <div className="item bag__popup">
              <div className="item__title item__title--uncommon">Carte de fidélité</div>
              <div className="item__level">Niveau d'objet 1</div>
              <div className="item__bind">Lié quand ramassé</div>
              <div className="item__desc">"Une carte tamponnée à chaque achat dans l'auberge du Bélier Rôti. Elle est presque pleine." </div>
            </div>
          </div>

          <div className="bag__item bag__item--stone">
            <div className="item bag__popup">
              <div className="item__title item__title--artefact">Caillou porte-bonheur</div>
              <div className="item__level">Niveau d'objet 1</div>
              <div className="item__desc">"Pauleth prétend que ceci vous portera chance." </div>
            </div>
          </div>

          <div className="bag__item bag__item--hearthstone">
            <div className="item bag__popup">
              <div className="item__title">Pierre de foyer</div>
              <div className="item__level">Niveau d'objet 1</div>
              <div className="item__bind">Lié quand ramassé</div>
              <div className="item__use">"Utiliser: Vous renvoie au Bélier Rôti de Valdrakken. Parlez à l'aubergiste d'une autre ville pour changer de foyer." </div>
            </div>
          </div>

          <div className="bag__item bag__item--paper">
            <div className="item bag__popup">
              <div className="item__title item__title--junk">Tas de factures</div>
              <div className="item__level">Niveau d'objet 1</div>
              <div className="item__desc">"Des reçus de paiements au manoir de Ravenholdt. Une chambre "Malfurion et Tyrande", Mousseux de Gentepression x2, Toilettage à l'huile de Murloc x2"</div>
            </div>
          </div>

          <div className="bag__item bag__item--status">
            <div className="item bag__popup">
              <div className="item__title item__title--rare">Statuette en bois</div>
              <div className="item__level">Niveau d'objet 1</div>
              <div className="item__bind">Lié quand ramassé</div>
              <div className="item__desc">"Une statuette en forme d'aigle, "MADE IN HR" est gravé sous la base."</div>
            </div>
          </div>

          <a href="/assets/rando.jpeg" target='_blank' className="bag__item bag__item--photo">
            <div className="item bag__popup">
              <div className="item__title item__title--legendary">Photo dans un tube</div>
              <div className="item__level">Niveau d'objet 1</div>
              <div className="item__bind">Lié quand ramassé</div>
              <div className="item__use">Utilise: Vous déroulez la photo pour l'afficher en grand.</div>
              <div className="item__desc">"Une photo semble enroulée dans ce tube de metal"</div>
            </div>
          </a>

          <img src="/assets/bag.png" alt="Bag" />
        </div>
      )}
    </div>
  );
};

export default HousePage;