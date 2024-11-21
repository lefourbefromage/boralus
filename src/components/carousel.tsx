import React, { useState } from 'react';

const Carousel: React.FC = () => {
  const vinyls = [
    '/assets/stormrage.webp',
    '/assets/buffalo.webp',
    '/assets/fjord.webp',
    '/assets/hardcore.webp',
    '/assets/monastere.webp',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStack, setIsStack] = useState(false); // État pour toggler le bloc "bag"

  const next = () => {
    if (currentIndex < vinyls.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const toggleStack = () => {
    setIsStack((prevState) => !prevState); // Basculer la visibilité du bag
  };

  return (
    <div className="carousel__wrapper">
      <div className={`carousel__stack ${isStack ? 'carousel__stack--grid' : ''}`}>
        {vinyls.map((vinyl, index) => {
          const isActive = index === currentIndex;
          const zIndex = vinyls.length - Math.abs(currentIndex - index);

          return (
            <a
              href={vinyl}
              target='_blank'
              key={index} 
              className={`carousel__image ${isActive ? 'active' : ''}`}               
              style={{
                zIndex: zIndex,
                transform: isActive
                  ? 'rotate(0) scale(1)'
                  : `rotate(-${index + currentIndex}deg)`,
                opacity: isActive ? 1 : 0.8,
              }}
            >
              <img src={vinyl} alt={`Vinyl ${index + 1}`}/>
            </a>
            
          );
        })}
      </div>

      <div className="carousel__controls">
        <button className="carousel__cta carousel__nav" onClick={prev} disabled={currentIndex === 0}>
          Prev
        </button>

        <button className="carousel__cta" onClick={toggleStack} >
          {isStack  ? (
            <svg width="20" height="20" viewBox="0 0 25 24" fill="#e2d29f" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.25016 10.5C7.5598 10.5 7.00016 11.0596 7.00016 11.75C7.00016 12.4404 7.5598 13 8.25016 13H8.26016C8.95051 13 9.51016 12.4404 9.51016 11.75C9.51016 11.0596 8.95051 10.5 8.26016 10.5H8.25016Z" fill="#e2d29f"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M7.75016 5.5C7.75016 4.25736 8.75751 3.25 10.0002 3.25H19.0002C20.2428 3.25 21.2502 4.25736 21.2502 5.5V14.5C21.2502 15.7426 20.2428 16.75 19.0002 16.75H17.2502V18.5C17.2502 19.7426 16.2428 20.75 15.0002 20.75H6.00016C4.75751 20.75 3.75016 19.7426 3.75016 18.5V17.6916C3.74995 17.6814 3.74995 17.6712 3.75016 17.6611V9.5C3.75016 8.25736 4.75751 7.25 6.00016 7.25H7.75016V5.5ZM15.7502 9.5V15.9558L13.4851 13.8525C12.789 13.206 11.7619 13.0665 10.9186 13.5037L5.25016 16.4421L5.25016 9.5C5.25016 9.08579 5.58594 8.75 6.00016 8.75H15.0002C15.4144 8.75 15.7502 9.08579 15.7502 9.5ZM5.25016 18.5V18.1317L11.6089 14.8354C11.89 14.6896 12.2324 14.7362 12.4644 14.9516L15.7502 18.0028V18.5C15.7502 18.9142 15.4144 19.25 15.0002 19.25H6.00016C5.58594 19.25 5.25016 18.9142 5.25016 18.5ZM9.25016 7.25H15.0002C16.2428 7.25 17.2502 8.25736 17.2502 9.5V15.25H19.0002C19.4144 15.25 19.7502 14.9142 19.7502 14.5V5.5C19.7502 5.08579 19.4144 4.75 19.0002 4.75H10.0002C9.58594 4.75 9.25016 5.08579 9.25016 5.5V7.25Z" fill="#e2d29f"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 25 24" fill="#e2d29f" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.60352 3.25C4.36088 3.25 3.35352 4.25736 3.35352 5.5V8.99998C3.35352 10.2426 4.36087 11.25 5.60352 11.25H9.10352C10.3462 11.25 11.3535 10.2426 11.3535 8.99998V5.5C11.3535 4.25736 10.3462 3.25 9.10352 3.25H5.60352ZM4.85352 5.5C4.85352 5.08579 5.1893 4.75 5.60352 4.75H9.10352C9.51773 4.75 9.85352 5.08579 9.85352 5.5V8.99998C9.85352 9.41419 9.51773 9.74998 9.10352 9.74998H5.60352C5.1893 9.74998 4.85352 9.41419 4.85352 8.99998V5.5Z" fill="#e2d29f"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M5.60352 12.75C4.36088 12.75 3.35352 13.7574 3.35352 15V18.5C3.35352 19.7426 4.36087 20.75 5.60352 20.75H9.10352C10.3462 20.75 11.3535 19.7426 11.3535 18.5V15C11.3535 13.7574 10.3462 12.75 9.10352 12.75H5.60352ZM4.85352 15C4.85352 14.5858 5.1893 14.25 5.60352 14.25H9.10352C9.51773 14.25 9.85352 14.5858 9.85352 15V18.5C9.85352 18.9142 9.51773 19.25 9.10352 19.25H5.60352C5.1893 19.25 4.85352 18.9142 4.85352 18.5V15Z" fill="#e2d29f"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M12.8535 5.5C12.8535 4.25736 13.8609 3.25 15.1035 3.25H18.6035C19.8462 3.25 20.8535 4.25736 20.8535 5.5V8.99998C20.8535 10.2426 19.8462 11.25 18.6035 11.25H15.1035C13.8609 11.25 12.8535 10.2426 12.8535 8.99998V5.5ZM15.1035 4.75C14.6893 4.75 14.3535 5.08579 14.3535 5.5V8.99998C14.3535 9.41419 14.6893 9.74998 15.1035 9.74998H18.6035C19.0177 9.74998 19.3535 9.41419 19.3535 8.99998V5.5C19.3535 5.08579 19.0177 4.75 18.6035 4.75H15.1035Z" fill="#e2d29f"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M15.1035 12.75C13.8609 12.75 12.8535 13.7574 12.8535 15V18.5C12.8535 19.7426 13.8609 20.75 15.1035 20.75H18.6035C19.8462 20.75 20.8535 19.7426 20.8535 18.5V15C20.8535 13.7574 19.8462 12.75 18.6035 12.75H15.1035ZM14.3535 15C14.3535 14.5858 14.6893 14.25 15.1035 14.25H18.6035C19.0177 14.25 19.3535 14.5858 19.3535 15V18.5C19.3535 18.9142 19.0177 19.25 18.6035 19.25H15.1035C14.6893 19.25 14.3535 18.9142 14.3535 18.5V15Z" fill="#e2d29f"/>
            </svg>
          )}
        </button>

        <button className="carousel__cta carousel__nav" disabled={currentIndex === vinyls.length - 1} onClick={next} >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;