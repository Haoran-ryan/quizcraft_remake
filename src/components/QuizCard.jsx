import { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    List, 
    ListItem,
  } from "@material-tailwind/react";

  import {
    ArrowLongRightIcon,
    ArrowPathIcon
  } from "@heroicons/react/24/outline";
   

function QuizCard({ currentQuizData, currentQuestionIndex, handleNextQuestion, isAnswerSelected, setIsAnswerSelected, isHost, handleRestartClick, totalQuestions }){
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const isResetDisabled = currentQuestionIndex +1 === totalQuestions? false: true;
    const shuffleAnswers = () => {
        const answers = [...currentQuizData.incorrect_answers, currentQuizData.correct_answer];
        const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
        setShuffledAnswers(shuffledAnswers)
    };

    // shuffle the answers when the currentQuizData prop changes 
    useEffect(()=>{
        shuffleAnswers();
    }
    , [currentQuizData]);
    // clean up the text 
    function removeCharacters(text) {
        return text
            .replace(/(&quot;)/g, '"')
            .replace(/(&rsquo;)/g, "'")
            .replace(/(&#039;)/g, "'")
            .replace(/(&amp;)/g, "&");
        }
    
    const handleAnswerClick = (answer)=>{
        console.log(removeCharacters(answer));
        setIsAnswerSelected(true);
    };

    if(!currentQuizData) return(<div>Loading...</div>)

    //TODO: Debugging
    console.log("currentQuizData:", currentQuizData);
    console.log("shuffledAnswers:", shuffledAnswers);

    return(
        <div>
            <Card className="mt-6 w-96">
            <CardHeader color="blue-gray" className="relative h-56">
                <img src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="img-blur-shadow" layout="fill" />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                Question No. {currentQuestionIndex + 1 }
                </Typography>
                <Typography>
                    
                {removeCharacters(currentQuizData.question)}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                
                {shuffledAnswers.map((answer, index)=>
                (<List>
                    <ListItem 
                        onClick={ ()=>handleAnswerClick(answer)}
                        disabled={isAnswerSelected}
                        key={index}
                        >
                            {removeCharacters(answer)}
                    </ListItem>
                </List>))}
                <div className="flex items-center gap-4">
                    <Button variant="text" className="flex items-center gap-2" 
                        onClick={()=>handleNextQuestion()}
                        disabled={isHost? false: !isAnswerSelected}
                        >
                        Next <ArrowLongRightIcon strokeWidth={2} className="h-5 w-5" />
                    </Button>
                    <Button variant="outlined" className="flex items-center gap-3"
                        disabled={isHost? false:isResetDisabled}
                        onClick={()=>handleRestartClick()}    
                        >
                        Start Over
                        <ArrowPathIcon strokeWidth={2} className="h-5 w-5" />
                    </Button>
                    
                </div>
            </CardFooter>
            </Card>
        </div>
    )
};

export default QuizCard;