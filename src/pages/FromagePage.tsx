import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FromagePage: React.FC = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0); // Étape actuelle
  const [answers, setAnswers] = useState<{ [key: number]: string | string[] }>({}); // Réponses utilisateur
  const [error, setError] = useState<string>(''); // Message d'erreur
  const [success, setSuccess] = useState(false); // État de réussite
  const contentRef = useRef<HTMLDivElement | null>(null); // Référence pour défilement automatique

  // Liste des questions
  const questions = [
    {
      id: 1,
      type: 'radio',
      question: "Combien y'a-t-il de mugs blanc à l'Abracadabar de Dalaran (Légion) ?",
      answer: "Cela semble en règle",
      options: ['43', '42', '39', '47'],
      correctAnswer: '43',
    },
    {
      id: 2,
      type: 'text',
      question: "Quel est le prix d’une tarte aux cerises maison de Thomas Miller (A²) ou d’un Poulet roti chez Olvia (H²) ? (exemple de réponse: '8po 8pa 88pc')",
      answer: "Ce sont les bon prix!",
      correctAnswer: '7pa 60pc',
    },
    {
      id: 3,
      type: 'radio',
      question: "À la banque de l'Aldor, de quelle couleur est la statuette de tigre vendue par les commissaires priseurs ?",
      answer: "Les pauvres n'ont toujours pas réussit a vendre cette babiole...",
      options: ['Vert', 'Jaune', 'Rouge', 'Bleu', 'Violet'],
      correctAnswer: 'Vert',
    },
    {
      id: 4,
      type: 'checkbox',
      question: 'Quelles boissons ne sont pas vendues par Gorenda à Dornogal ?',
      options: [
        { id: '06', content: '<img src="./assets/06.jpg" alt="Drink 6">' },
        { id: '05', content: '<img src="./assets/05.jpg" alt="Drink 5">' },
        { id: '02', content: '<img src="./assets/02.jpg" alt="Drink 2">' },
        { id: '03', content: '<img src="./assets/03.jpg" alt="Drink 3">' },
        { id: '01', content: '<img src="./assets/01.jpg" alt="Drink 1">' },
        { id: '04', content: '<img src="./assets/04.jpg" alt="Drink 4">' },

      ],
      correctAnswer: ['01', '05 '], // IDs corrects
    }
  ];

  // Défilement automatique en bas de page
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [currentStep, error, success]);

  // Validation des réponses utilisateur
  const validateAnswer = (question: any, userAnswer: any) => {
    if (question.type === 'checkbox') {
      const cleanAnswers = (answers: string[]) =>
        answers.map((answer) => answer.trim().toLowerCase()).sort();
  
      const correctAnswers = cleanAnswers(question.correctAnswer);
      const selectedAnswers = cleanAnswers(userAnswer || []);
  
      console.log('Correct:', correctAnswers);
      console.log('Selected:', selectedAnswers);
  
      return JSON.stringify(selectedAnswers) === JSON.stringify(correctAnswers);
    }
    return userAnswer === question.correctAnswer;
  };

  // Gestion des réponses
  const handleSubmit = () => {
    const currentQuestion = questions[currentStep];
    const userAnswer = answers[currentQuestion.id];

    if (!userAnswer || !validateAnswer(currentQuestion, userAnswer)) {
      setError('Il y a erreur... Il faut tout reprendre depuis le début !');
      setCurrentStep(0); // Retour à la première question
      setAnswers({}); // Réinitialisation des réponses
      return;
    }

    setError('');
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1); // Passe à la question suivante
    } else {
      // Succès : mettre à jour le localStorage
      localStorage.setItem('clue03', 'true');
      localStorage.setItem('toggleChestVisibility', 'true');
      setSuccess(true);
    }
  };

  // Gestion des changements de réponses
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, questionId: number) => {
    const { value, checked, type } = e.target;
  
    setAnswers((prev) => {
      const updatedAnswers = { ...prev };
  
      if (type === 'checkbox') {
        if (!updatedAnswers[questionId]) updatedAnswers[questionId] = [];
        const currentAnswers = updatedAnswers[questionId] as string[];
  
        if (checked) {
          // Ajout seulement si la valeur n'est pas déjà présente
          if (!currentAnswers.includes(value.trim())) {
            currentAnswers.push(value.trim());
          }
        } else {
          // Suppression de la valeur si désélectionnée
          updatedAnswers[questionId] = currentAnswers.filter((id) => id !== value.trim());
        }
      } else {
        updatedAnswers[questionId] = value.trim();
      }

      return updatedAnswers;
    });
  };

  // Rendu de chaque question
  const renderQuestion = (question: any) => {
    switch (question.type) {
      case 'text':
        return (
          <div className="dialog-page__message dialog-page__message--self  dialog-page__message--text">
          <input
            type="text"
            placeholder="Votre réponse"
            value={answers[question.id] || ''}
            onChange={(e) => handleChange(e, question.id)}
          />
          </div>
          
        );
      case 'radio':
        return (
          <div className="dialog-page__message dialog-page__message--radio">
            {
              question.options.map((option: string) => (
                <label className="dialog-page__radio" key={option}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={(e) => handleChange(e, question.id)}
                  />
                  <span>{option}</span>
                </label>
              ))
            }
          </div>
        );
      case 'checkbox':
        return (
          <div className="dialog-page__message dialog-page__message--checkbox">
            {
              question.options.map((option: { id: string; content: string }) => (
                <label className="dialog-page__checkbox" key={`${question.id}-${option.id}`}> {/* Clé unique basée sur question.id et option.id */}
                  <input
                    type="checkbox"
                    name={`question-${question.id}`}
                    value={option.id}
                    checked={(answers[question.id] || []).includes(option.id)}
                    onChange={(e) => handleChange(e, question.id)}
                  />
                  <span dangerouslySetInnerHTML={{ __html: option.content }} />
                </label>
              ))
            }
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dialog-page dialog-page--fromage" ref={contentRef}>
      <button className="house__cta house__cta--left" onClick={() => navigate('/house')}>Retourner à Boralus</button>

      <div className="dialog-page__content">
    
        { !success && localStorage.getItem('clue03') === 'true' ? (
          <>
            <div className="dialog-page__message">
              Bonjour et bienvenue chez Gorgonzormu ?
            </div>
            <div className="dialog-page__message" >
              Ah mais je vous connait déjà !
            </div>
            <div className="dialog-page__message" >
              Le papier est dans le coffre de Grosciflard
            </div>
            <div className="dialog-page__message" >
              Faites places, vous faites fuir mes clients...
            </div>
          </>
        ) : (
          <>
            <p className='dialog-page__message'>
              Bonjour et bienvenue chez Gorgonzormu
            </p>

            <p className='dialog-page__message'>
              Les meilleurs fromages des Îles aux dragons !
            </p>

            <p className='dialog-page__message' >
              Vous êtes de la guilde &lt;First try en deux pull&gt; ? je suppose que vous connaissez Grosciflard !
            </p>

            <p className='dialog-page__message' >
              Cela fait un moment que je ne l'ai pas vu... et il a oublié un papier chez moi la dernière fois.
            </p>

            <p className='dialog-page__message'>
              Comme on dit, les affaires sont les affaires. Si vous me rendez un service, je vous donne le papier.
            </p>

            <p className='dialog-page__message' >
              Je suis Président du comité de contrôle des trucs inutiles et j'ai besoin que vous checkez quelques trucs pour moi !
            </p>

            {/* Message d'erreur */}
            {error && <div className="dialog-page__message dialog-page__message--error">{error}</div>}


            {/* Affiche les questions précédentes et leurs réponses */}
            {questions.slice(0, currentStep).map((q) => (
              <div key={q.id} className="dialog-page__wrapper">
                <p className="dialog-page__message dialog-page__message--question">{q.question}</p>
                <p className="dialog-page__message dialog-page__message--self">{answers[q.id]}</p>
                <p className="dialog-page__message dialog-page__message--true">{q.answer}</p>
              </div>
            ))}

            {/* Affiche la question actuelle */}
            <div className="dialog-page__wrapper" data-index={currentStep}>
              <p className='dialog-page__message dialog-page__message--question'>{questions[currentStep].question}</p>
              {renderQuestion(questions[currentStep])}
            </div>

        

            { success ? (
              <>
              <div className="dialog-page__message dialog-page__message--true">Merci de votre assistance. Je vais remplir ma part du marché.</div>
              <div className="dialog-page__message dialog-page__message--true">Je vous envoie le papier directement dans le coffre de Grosciflard.</div>
              <div className="dialog-page__message dialog-page__message--true">Si vous le voyez, dites lui que j'ai un nouvel arrivage d'ici peu.</div>
              </>

            ) : (
              <button className="dialog-page__submit" onClick={handleSubmit}>
                {currentStep < questions.length - 1 ? 'Suivant' : 'Terminer'}
              </button>

            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FromagePage;