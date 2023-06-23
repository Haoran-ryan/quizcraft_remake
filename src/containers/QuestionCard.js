import { useState, useEffect } from 'react';

const QuestionCard = ( { question, onNext, setScore, setIsCompleted, lastQuestionIndex, currentQuestionIndex } )=>{
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    // shuffle the answers when the question prop changes 
    useEffect(()=>{
        shuffleAnswers();
    }
    , [question]);

    const shuffleAnswers = () => {
        const answers = [...question.incorrect_answers, question.correct_answer];
        const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
        setShuffledAnswers(shuffledAnswers)
    };

    const completionChecker = () => {
        if (currentQuestionIndex === lastQuestionIndex) {
            setIsCompleted(true);
        }
    }
    const handleAnswerClick = (answer)=>{
        //TODO: remove later 
        console.log(`${answer} was selected by the player.`);
        console.log(`The correct answer is ${question.correct_answer}`);
        
        const isCorrect = answer === question.correct_answer;
        if(isCorrect){
            setScore((score) => score + 1);
        }
        onNext();
        completionChecker();
    };

    // clean up the text 
    function removeCharacters(text) {
        return text
          .replace(/(&quot;)/g, '"')
          .replace(/(&rsquo;)/g, "'")
          .replace(/(&#039;)/g, "'")
          .replace(/(&amp;)/g, "&");
      }

    return(
        <>
            <h3>{removeCharacters(question.question)}</h3>
            <ul>
                {shuffledAnswers.map((answer, index) => (
                <li key={index}>
                    <button onClick={() => handleAnswerClick(answer)}>
                    {removeCharacters(answer)}
                    </button>
                </li>
                ))}
            </ul>
        </>
    )
};

export default QuestionCard;