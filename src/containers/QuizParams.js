import { useState,useEffect } from 'react';
import QuizParamsForm from '../components/QuizParamsForm';
import QuizLoader from './QuizLoader';
function QuizParams({ setQuiz,setIsRoomCreated }){
    const [quizNumber, setQuizNumber] = useState(0);
    const [quizDifficulty, setQuizDifficulty] = useState('');
    const [quizCategory, setQuizCategory] = useState('');
    const [isParamsSubmitted, setIsParamsSubmitted] = useState(false);

    // TODO: debugging 
    // useEffect(()=>{
    //     console.log(`---------QuizParams Data Testing---------`);
    //     console.log(`quizNumber: `, quizNumber);
    //     console.log(`quizDifficulty: `, quizDifficulty);
    //     console.log(`quizCategory: `, quizCategory);
    //     console.log(`isParamsSubmitted: `, isParamsSubmitted);
    //     console.log(`----------------END----------------------`)
    // },[quizNumber,quizDifficulty,quizCategory,isParamsSubmitted])

    return(
        <div>
            { !isParamsSubmitted &&(
                <QuizParamsForm 
                    setIsParamsSubmitted={ setIsParamsSubmitted }
                    setQuizNumber={ setQuizNumber }
                    setQuizDifficulty={ setQuizDifficulty }
                    setQuizCategory={ setQuizCategory }
                />
            )}

            { isParamsSubmitted && (
                <QuizLoader 
                    setQuiz={ setQuiz }
                    quizNumber={ quizNumber }
                    quizDifficulty={ quizDifficulty }
                    quizCategory={ quizCategory }
                    setIsRoomCreated={ setIsRoomCreated }
                    />
            )}
        </div>
    )
};

export default QuizParams;