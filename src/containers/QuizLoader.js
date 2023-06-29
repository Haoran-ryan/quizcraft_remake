import { useEffect } from "react";
import axios from 'axios';

function QuizLoader({ setQuiz, quizNumber, quizDifficulty, quizCategory }){
    useEffect(()=>{
        const api_url = `https://opentdb.com/api.php?amount=${quizNumber}&category=${quizCategory}&difficulty=${quizDifficulty.toLowerCase()}&type=multiple`;
        axios
        .get(api_url)
        .then((response)=>{
            setQuiz(response.data.results);
        })
        .catch((error)=>{
            console.log("QuizLoader Axios Error Message: ",error.message);
        })
    },[quizNumber, quizDifficulty, quizCategory])
    
};

export default QuizLoader;