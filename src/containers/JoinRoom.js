import { useEffect, useState } from "react";
import { addPlayerToRoom } from "../utilities/FirestoreServices";

import PlayerRegistration from "../components/PlayerRegistration";
import QuizList from "../components/QuizList";

function JoinRoom({ isHost }){
    const [playerName, setPlayerName] = useState("");
    const [roomToJoin, setRoomToJoin] = useState(0);
    const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
    //Firestore Function 
    // add player to the room , initialize score to 0
    useEffect(()=>{
        if(playerName.length > 0 && roomToJoin > 0 && isRegistrationComplete){
            addPlayerToRoom(roomToJoin, playerName);
        }
    },[isRegistrationComplete])

    // TODO: debugging 
    useEffect(()=>{
        console.log(`------ JoinRoom State ---------`)
        console.log(`playerName: ${playerName}`)
        console.log(`roomToJoin: ${roomToJoin}`)
        console.log(`isRegistrationComplete: ${isRegistrationComplete}`)
        console.log(`------ JoinRoom State END -------`)

    }, [playerName, roomToJoin, isRegistrationComplete])
    return(
        <>
            { !isRegistrationComplete && 
                <PlayerRegistration 
                    playerName={playerName}
                    roomToJoin={roomToJoin}
                    setPlayerName={setPlayerName}
                    setRoomToJoin={setRoomToJoin}
                    setIsRegistrationComplete={setIsRegistrationComplete}
                />}
           { isRegistrationComplete && roomToJoin.toString().length > 0 && 
                <QuizList 
                    isHost={isHost}
                    roomToJoin={roomToJoin}
                />
                }
        </>
    )
};

export default JoinRoom;