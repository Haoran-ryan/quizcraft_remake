import { useState, useEffect, useMemo } from "react";

import QuizCard from "./QuizCard";
import { retrieveQuiz, listenToCurrentQuestionIndex } from "../utilities/FirestoreServices";

function QuizList({isHost, roomToJoin, totalQuizLength, isRoomCreated }){
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null) 
    const [isAnswerSelected, setIsAnswerSelected] = useState(false);

    //Firestore functions 
    // retrieve the quiz data from Firestore
    useEffect(() => {
        retrieveQuiz(roomToJoin.toString())
          .then((data) => {
            if (data.questions) {
              console.log("Quiz data retrieved from Firestore", data.questions);
              setQuizData(data.questions);
            }
          })
          .catch((error) => {
            console.log(`Error retrieving quiz data: ${error.message}`);
          });
      }, [roomToJoin, isHost, totalQuizLength, isRoomCreated]);

      
    // listen to currentQuestionIndex in Firestore
    useEffect(() => {
      if (quizData) {
        const unsubscribe = listenToCurrentQuestionIndex(roomToJoin, (updatedIndex) =>
          setCurrentQuestionIndex(updatedIndex)
        );
    
        return () => {
          unsubscribe();
        };
      }
    }, [quizData, roomToJoin]);
    

    const handleNextQuestion = ()=>{
        if(currentQuestionIndex < totalQuizLength - 1){
        setCurrentQuestionIndex(currentQuestionIndex + 1)};
        setIsAnswerSelected(false);
    };

    const handleRestartClick =()=>{
        setCurrentQuestionIndex(0);
        setIsAnswerSelected(false);
        //TODO: reset the currentQuestionIndex in Firestore !!! 
    }

    // TODO: Debugging
    useEffect(() => {
      console.log("------QuizList Debugging---------");
      console.log("quizData:", quizData);
      console.log("isHost:", isHost);
      console.log("roomToJoin:", roomToJoin);
      console.log("totalQuizLength:", isHost? totalQuizLength: "N/A. It's in Player mode.");
      console.log("currentQuestionIndex:", currentQuestionIndex);
      console.log("--------------------------------");
    }, [quizData, isHost, roomToJoin, totalQuizLength, currentQuestionIndex]);



    if(!quizData) return(<div>Loading...</div>)
    //TODO: Debugging
    console.log("quizData:", quizData);
    console.log("currentQuestionIndex:", currentQuestionIndex);
    return (
        <div>
            { quizData.length > 0  &&
                <QuizCard 
                currentQuizData={quizData[currentQuestionIndex]}
                currentQuestionIndex={currentQuestionIndex}
                isAnswerSelected={isAnswerSelected}
                setIsAnswerSelected={setIsAnswerSelected}
                handleNextQuestion={handleNextQuestion} 
                isHost={isHost}
                handleRestartClick={handleRestartClick} 
                totalQuizLength={totalQuizLength}
                />
            }
        </div>
    )
};

export default QuizList;