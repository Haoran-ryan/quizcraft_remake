import { useState } from "react";
import QuestionCard from "../containers/QuestionCard";

const QuestionsList = ({ questions, setScore, setIsCompleted }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    
    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prev) => prev + 1);
    };
    
    const totalQuestions = questions.length;

    return (
    <>
        {currentQuestionIndex < questions.length ? (
            <QuestionCard 
                question={questions[currentQuestionIndex]}
                onNext={handleNextQuestion}
                setScore={setScore}
                lastQuestionIndex = { questions.length - 1}
                currentQuestionIndex = {currentQuestionIndex}
                setIsCompleted = {setIsCompleted}
            />
        ) : (
            <p>Quiz Completed!</p>
        )}
        

    </>
    );
};

export default QuestionsList;
