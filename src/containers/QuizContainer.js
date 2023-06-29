// TODO: supersede QuestionsContainer.js
import { useState, useEffect } from 'react';
import { SelectRole } from '../components/SelectRole';
import { createRoom } from '../utilities/FirestoreServices';
import { addQuizToRoom } from "../utilities/FirestoreServices";

import { Avatar, Typography } from "@material-tailwind/react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 

export function QuizContainer(){
    const [isRoleSelected, setIsRoleSelected] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [hostName, setHostName] = useState('');
    const [roomID, setRoomID] = useState('');
    const [quiz, setQuiz] = useState([]);

    // Firestore Functions
    // Create a new room, with the host name
    useEffect(()=>{
        if(roomID && hostName){
            createRoom(roomID.toString(), hostName);
        }
    },[roomID, hostName]);

    useEffect(()=>{
        if(roomID && quiz.length >0){
            addQuizToRoom(roomID.toString(), quiz);
        }
    },[quiz])

    //TODO: debugging 
    useEffect(()=>{
        console.log(`---------QuizContainer Data Testing---------`);
        console.log(`Quiz: `, quiz);
        console.log(`-------------------END----------------------`)
    },[quiz])
    return(
        <div className="flex flex-col gap-6">
            
            <div className="flex items-center gap-4">
                <AccountCircleIcon/>
                <div>
                <Typography variant="h6">Host Name: { hostName? hostName:"Loading ..." }</Typography>
                <Typography variant="small" color="gray" className="font-normal">Room ID:{ roomID? roomID:"Loading" }</Typography>
                </div>
            </div> 
            
           
            <SelectRole 
                isRoleSelected={ isRoleSelected }
                setIsRoleSelected={ setIsRoleSelected }
                isHost={ isHost }
                setIsHost={ setIsHost }
                hostName={ hostName }
                setHostName={ setHostName }
                setRoomID={ setRoomID }
                roomID={ roomID }
                setQuiz={ setQuiz }
                quiz={ quiz }
            />
        </div>
    )
};