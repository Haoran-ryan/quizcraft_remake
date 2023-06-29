import React,{ useState, useEffect } from "react";
import QuestionsLoader from "./QuestionsLoader";
import QuestionsForm from "./QuestionsForm";
import QuestionsList from "../components/QuestionsList";
import PlayerData from "./PlayerData";
import RoleSelector from "../components/RoleSelector";
import CreateRoom from "./CreateRoom";
import { WriteDB } from '../utilities/WriteDB'

function QuestionsContainer() {
    const [questionCount, setQuestionCount] = useState(0);
    const [difficulty, setDifficulty] = useState('');
    const [category, setCategory] = useState('');
    const [isSelected, setIsSelected] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [isRoomCreated, setIsRoomCreated] = useState(false);
    const [isRoleSelected, setIsRoleSelected] = useState(false); 
    const [roomID, setRoomID] = useState(''); 
    const [hostName, setHostName] = useState('');

    // Function: generate a random 6-digit number, used as 'document.ID' in the database
    const generateID = () => {
        const random_key = Math.floor(100000 + Math.random() * 900000);
        return random_key;
    }
    //Firestore: create a new room, with the host name
   useEffect(()=>{
    if(isRoomCreated && roomID && hostName){
        WriteDB(roomID.toString(), {
            host: hostName,
            questions: selectedQuestions,
            
        })
   }},[roomID, selectedQuestions]) 
 
    // Function: select question no. , difficulty, category
    const handleSubmit = ()=>{
        if (questionCount === 0){
            alert("Please select a number of questions");
            return;
        }
        if (difficulty === ''){
            alert("Please select a difficulty");
            return;
        }
        if (category === ''){
            alert("Please select a category");
            return;
        }
        setIsSelected(true);
        console.log('You have chosen: ', questionCount, difficulty, category);
    }


    // TODO: remove later | What questions are selected by the user
    useEffect(()=>{
        console.log('---------Container Data Testing---------')
        console.log('selectedQuestions: ', selectedQuestions)
        console.log('score: ', score)
        console.log('isCompleted: ', isCompleted)
        console.log('isRoleSelected: ', isRoleSelected)
        console.log('isHost: ', isHost)
        console.log('isRoomCreated: ', isRoomCreated)
        console.log('roomID: ', roomID)
        console.log("----------------------------------------")
    }, [selectedQuestions, score, isCompleted, isRoleSelected, isHost, isRoomCreated, roomID])


    return (
    <>
        { !isRoleSelected && (
            <RoleSelector 
                setIsRoleSelected={ setIsRoleSelected }
                setIsHost={ setIsHost }
                />
        )}
        { isHost && !isRoomCreated && (
            <CreateRoom 
                generateID={ generateID }
                setRoomID = { setRoomID }
                roomID = { roomID }
                setIsRoomCreated = { setIsRoomCreated }
                setHostName = { setHostName }
            />
        )}

        {isRoleSelected && isHost && (
            <div>
                { roomID && hostName && (
                    <>
                    <h3>Room ID: { roomID }</h3>
                    <h3>Host Name: { hostName }</h3>
                    </>) } 
                
                   {isRoomCreated && !isSelected && (
                        <QuestionsForm
                        questionCount={questionCount}
                        setQuestionCount={setQuestionCount}
                        difficulty={difficulty}
                        setDifficulty={setDifficulty} 
                        category={category}
                        setCategory={setCategory} 
                        onSave={handleSubmit}
                          />
                   )}
                    

                {isSelected && <QuestionsLoader 
                    questionCount={questionCount}
                    difficulty={difficulty}
                    category={category}
                    saveQuestions={setSelectedQuestions}
                    />}
                
                { selectedQuestions.length > 0 && <QuestionsList 
                    questions={selectedQuestions} 
                    setScore={ setScore }
                    setIsCompleted={setIsCompleted}
                    />
                    }   

                { isCompleted && <PlayerData 
                    roomID={ roomID }
                    score={score} /> }
            </div>
        )}
        
    </>


    );
}

export default QuestionsContainer;