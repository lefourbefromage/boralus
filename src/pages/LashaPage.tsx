import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LashaPage: React.FC = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    { question: string; answer: string }[]
  >([]);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Indique si le questionnaire est terminé avec succès

  // Référence pour le conteneur de contenu
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Scrolling automatique
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [answeredQuestions, message]);

  const correctAnswers: Record<number, string | string[]> = {
    1: "jambonneau",
  };

  const questions: Record<number, string> = {
    1: `<div class="dialog-page__message dialog-page__message--question" style="animation-delay: 2s;"> Pour accéder a la station, veuillez me fournir le mot de passe </div>`,
  };

  const normalizeInput = (input: string) =>
    input
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Supprime les accents

  const handleAnswer = (answer: string) => {
    const normalizedAnswer = normalizeInput(answer);

    if (correctAnswers[currentStep]) {
      const isCorrect =
        Array.isArray(correctAnswers[currentStep])
          ? correctAnswers[currentStep].includes(normalizedAnswer)
          : normalizedAnswer === correctAnswers[currentStep];

      if (isCorrect) {
        setAnsweredQuestions((prev) => [
          ...prev,
          { question: questions[currentStep], answer },
        ]);

        if (currentStep === 1) {
          setIsSuccess(true); // Marque le questionnaire comme terminé avec succès
        } else {
          setCurrentStep((prev) => prev + 1);
        }
      } else {
        resetQuestionnaire();
      }
    } else {
      resetQuestionnaire();
    }
  };

  const resetQuestionnaire = () => {
    setCurrentStep(1);
    setAnsweredQuestions([]);
    setMessage("Désolé, le temps c'est de l'argent.");
    setIsSuccess(false);
  };

  return (
    <div className="dialog-page dialog-page--lasha">
      <button className="house__cta house__cta--left" onClick={() => navigate('/house')}>Retourner à Boralus</button>

        <div className="dialog-page__content" ref={contentRef}>    
          <div className="dialog-page__message" style={{ animationDelay: '0s' }}>
            B'jour !
          </div>

          <div className="dialog-page__message" style={{ animationDelay: '1s' }}>
           Bienv'nue à la Station du Plaisir
          </div>

          {/* Messages d'erreur */}

          {message && !isSuccess && (
            <p className="dialog-page__message dialog-page__message--error">{message}</p>
          )}

          {/* Questions précédentes avec réponses */}
          {answeredQuestions.map((q, index) => (
            <div key={index} className="answered-question">
              <div className="dialog-page__wrapper" dangerouslySetInnerHTML={{ __html: q.question }}></div>
              <p className="dialog-page__message dialog-page__message--self">
                {q.answer}
              </p>
            </div>
          ))}

          {/* Affiche la question actuelle uniquement si le questionnaire n'est pas terminé */}
          {!isSuccess && currentStep <= 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = (e.target as HTMLFormElement).elements.namedItem(
                  'answer'
                ) as HTMLInputElement;
                handleAnswer(input.value);
                input.value = '';
              }}
            >
              {message && !isSuccess ? (
                <div className="dialog-page__wrapper dialog-page__wrapper--error" data-question={currentStep} dangerouslySetInnerHTML={{ __html: questions[currentStep] }}></div>
              ) : (
                <div className="dialog-page__wrapper" data-question={currentStep} dangerouslySetInnerHTML={{ __html: questions[currentStep] }}></div>
              )}
                
              <div className="dialog-page__footer" style={{ animationDelay: '3s' }}>
                <input
                  type="text"
                  name="answer"
                  placeholder="Votre réponse"
                  required
                  autoComplete="off"
                />
                <button type="submit">Valider</button>
              </div>
            </form>
          )}

          {/* Message final */}
          { isSuccess && (
            <div className="dialog-page__wrapper">
              <p className="dialog-page__message dialog-page__message--true" style={{ animationDelay: '1s' }}>
                  Ah ! C'est le code de Monsieur Grosciflard ça...
              </p>

              <p className="dialog-page__message" style={{ animationDelay: '2s' }}>
                  Z'êtes pas au courant ? Ce gros druide nous a posé quelques soucis récemment. A cause de lui, les agents du SI7 sont venus fouiller dans mes affaires...
              </p>

              <p className="dialog-page__message" style={{ animationDelay: '5s' }}>
                J'vais pas passer par 4 rails, vot' copain il a clamsé. Il s'est engueulé avec des Elfes de sang et il a terminé dans l'eau.
              </p>

              <p className="dialog-page__message" style={{ animationDelay: '8s' }}>
                Le soucis c'est qu'il sait pas nager ce con ! Un comble pour un druide, non ?! Du coup on l'a retrouvé le lendemain matin à flotter dans les bains...
              </p>

              <p className="dialog-page__message" style={{ animationDelay: '10s' }}>
                J'ai ce petit souvenir pour vous ! Si vous voulez partager l'information à ses proches
              </p>

              <a href='' target="_blank" className="dialog-page__message dialog-page__message--photo" style={{ animationDelay: '12.5s' }}>
                <img src='./assets/drown.webp'/>
              </a>


              <a href="https://forms.gle/i5G5Z4SqoGPiingt5" className="dialog-page__message dialog-page__message--link" style={{ animationDelay: '12.5s' }}>
                Histoire de terminer un peu tout' nos affaires, vous devez remplir <strong>ce formulaire.</strong>
              </a>

              <p className="dialog-page__message" style={{ animationDelay: '12.5s' }}>
                Vous devriez envoyer un p'tit mot à sa dame non ? 
              </p>

    

            </div>
          )}
        </div>

    </div>
  );
};


export default LashaPage;