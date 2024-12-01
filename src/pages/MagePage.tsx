import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MagePage: React.FC = () => {
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
    1: 'jerimus',
    2: ['arcatraz', "l'arcatraz", "dans l'arcatraz"],
    3: 'coroborus',
    4: 'millificent',
    5: 'b',
  };

  const questions: Record<number, string> = {
    1: '<p class="dialog-page__message dialog-page__message--question"><strong>Première question</strong>, quel est mon deuxième prénom ?</p>',
    2: '<p class="dialog-page__message dialog-page__message--true">Pas mal. Maintenant on va remonter un peu le temps !</p> <p class="dialog-page__message dialog-page__message--question">J\'ai été malencontreusement enfermé durant ma carrière, où était-ce ?</p>',
    3: '<p class="dialog-page__message dialog-page__message--true">Bonne réponse !</p><p class="dialog-page__message dialog-page__message--question">Durant le <em>cataclysme</em>, j\'ai croisé des aventuriers mais un monstre m\'a éjecté dans le vide, qui était-ce ?</p>',
    4: '<p class="dialog-page__message dialog-page__message--true">Bien joué...</p><p class="dialog-page__message">Vous connaissez ma femme ?</p><p class="dialog-page__message"> Elle est <strong>belle</strong> hein ?</p><p class="dialog-page__message dialog-page__message--question">Mais c\'est quoi son nom ?</p>',
    5: `<p class="dialog-page__message dialog-page__message--true">Ouais ouais ouais !</p><div class="dialog-page__message dialog-page__message--question">Je suis à l'origine de la création du meilleur sort jamais créé. Lequel est-ce ?
      <ul>
        <li>A- Métamorphose en rat</li>
        <li>B- Métamorphose en canard</li>
        <li>C- Métamorphose en chat</li>
        <li>D- Métamorphose en mousselaine</li>
      </ul></div>`,
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

        if (currentStep === 5) {
          localStorage.setItem('clue02', 'true');
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
    setMessage('Vous vous êtes planté comme la grosse épée en Silithus. On recommence ?');
    setIsSuccess(false);
  };

  return (
    <div className="dialog-page dialog-page--mage">
      <button className="house__cta house__cta--left" onClick={() => navigate('/house')}>Retourner à Boralus</button>

      {!message && !isSuccess && localStorage.getItem('clue02') === 'true' ? (
        <div className="dialog-page__content" ref={contentRef}>    
            <div className="dialog-page__message" style={{ animationDelay: '0' }}>
              Rebonjour ?
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
          <div className="dialog-page__message" style={{ animationDelay: '1s' }}>
            Vous vous trouvez en face du grand...<br/>
          </div>

          <div className="dialog-page__message" style={{ animationDelay: '1.5s' }}>
            ...
          </div>

          <div className="dialog-page__message" style={{ animationDelay: '2.5s' }}>
            ...
          </div>

          <div className="dialog-page__message" style={{ animationDelay: '3.5s' }}>
            ...
          </div>

          <div className="dialog-page__message" style={{ animationDelay: '4.5s' }}>
            MILHOUSE TEMPÊTE-DE-MANA !!!
          </div>

          <div className="dialog-page__message" style={{ animationDelay: '5.5s' }}>
            Vous me trouvez ici dans une situation des plus cocasse... Je crois que vous êtes proche de Grosciflard ?
          </div>

          <div className="dialog-page__message" style={{ animationDelay: '7.5s' }}>
            J'ai sûrement un petit truc pour vous mais pour ça vous devez me prouver que vous me connaissez autant que Grosciflard !
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
          {!isSuccess && currentStep <= 5 && (
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
                  Je vois que vous me connaissez aussi bien que Grosciflard !
              </p>
              <p className="dialog-page__message dialog-page__message--true">
                  Je suppose que je peux vous faire confiance. Voici un papier qu'il m'a donné la dernière fois mais je n'ai aucune idée de son utilité. 
              </p>
              <p className="dialog-page__message dialog-page__message--true">
                Je met le papier dans le coffre de Grosciflard !
              </p>

              <p className="dialog-page__message dialog-page__message--error" style={{animationDelay: "10s"}}>
                Euh... Tu vas rester ici a me regarder ? Retourne à Boralus !
              </p>
            </div>
          )}
        </div>
      )};
    </div>
  );
};


export default MagePage;