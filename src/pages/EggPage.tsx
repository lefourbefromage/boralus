import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EggPage: React.FC = () => {
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
    1: "61,88",
    2: ['Ombrelune',"la vallee d'ombrelune", "vallee d'ombrelune", "shadowmoon valley"],
  };

  const questions: Record<number, string> = {
    1: '<p class="dialog-page__message dialog-page__message--question">Donnez moi l\'emplacement de l\'oeuf <br/> (Exemple pour [12.32, 40.17] => tapez 12,40)</p>',
    2: '<p class="dialog-page__message dialog-page__message--true">Mes espions me disent que c\'est bien ça.</p><p class="dialog-page__message dialog-page__message--question">Mais dans quel région ?</p>'
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

        if (currentStep === 2) {
          localStorage.setItem('clue04', 'true');
          localStorage.setItem('toggleChestVisibility', 'true');
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
    setMessage('Il y a rien la bas ?! Zou vouj fouteiz de Kej ?');
    setIsSuccess(false);
  };

  return (
    <div className="dialog-page dialog-page--egg">
      <button className="house__cta house__cta--left" onClick={() => navigate('/house')}>Retourner à Boralus</button>

      {!message && !isSuccess && localStorage.getItem('clue04') === 'true' ? (
        <div className="dialog-page__content" ref={contentRef}>    
            <div className="dialog-page__message" style={{ animationDelay: '0' }}>
              Oui ?
            </div>
            <div className="dialog-page__message" style={{ animationDelay: '1s' }}>
              Tu as déjà eu ce que tu voulais...
            </div>
            <div className="dialog-page__message" style={{ animationDelay: '2s' }}>
              Le papier est dans le coffre de Grosciflard
            </div>
            <div className="dialog-page__message" style={{ animationDelay: '3s' }}>
            File maintenant !
            </div>
        </div>  
      ) : (
        <div className="dialog-page__content" ref={contentRef}>    
          <div className="dialog-page__message" style={{ animationDelay: '0s' }}>
            Bonjour...<br/>
          </div>

          <div className="dialog-page__message" style={{ animationDelay: '2s' }}>
            vous avez des oeufs ?...<br/>
          </div>
          
          <div className="dialog-page__message" style={{ animationDelay: '3.5s' }}>
            J'échange informations contre oeufs. 
          </div>

          <div className="dialog-page__message" style={{ animationDelay: '4.5s' }}>
            Grosse informations ? Gros oeufs
          </div>

          <a href='' target="_blank" className="dialog-page__message" style={{ animationDelay: '6.5s' }}>
            <img src='./assets/egg-location.webp'/>
          </a>

          <div className="dialog-page__message" style={{ animationDelay: '6.5s' }}>
            Ça être oeuf de Chimère et moi veux oeuf de chimère dans ma collection.
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
          {!isSuccess && currentStep <= 2 && (
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

              
              <div className="dialog-page__footer">
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
              <p className="dialog-page__message dialog-page__message--true">
                  Oeufs bientôt a moi !!!!
              </p>
              <p className="dialog-page__message dialog-page__message--true">
                  Voila papier que druide m'a donné pour acheter oeuf.
              </p>
              <p className="dialog-page__message dialog-page__message--true">
                Je met le papier dans le coffre de Grosciflard !
              </p>

              <p className="dialog-page__message" style={{animationDelay: "10s"}}>
                Qu'est-ce qui est apparu en premier : l'œuf ou le nérubien ? Laissez moi à mes occupations...
              </p>
            </div>
          )}
        </div>
      )};
    </div>
  );
};


export default EggPage;