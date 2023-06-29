// TODO: supersed RoleSelector.jsx with SelectRole.jsx
import { useEffect } from "react";
import CreateRoom from "../containers/CreateRoom";
import JoinRoom from "../containers/JoinRoom";

import { ButtonGroup, Button } from "@material-tailwind/react";

export function SelectRole({ isHost, setIsHost, isRoleSelected, setIsRoleSelected, hostName, setHostName, setRoomID, roomID, setQuiz, quiz}){

    const handleRoleClick = (e)=>{
        const role = e.target.value;
        if (role === 'host'){
            setIsRoleSelected(true);
            setIsHost(true);
        } else if (role === 'player'){
            setIsRoleSelected(true);
            setIsHost(false);
        } 
    };

    return(
        <>
            { !isRoleSelected && 
            (
                <div className="flex flex-col w-max gap-4">
                <ButtonGroup variant="gradient" size="lg">
                    <Button value="host" onClick={ handleRoleClick }>Host</Button>
                    <Button value="player" onClick={ handleRoleClick }>Player</Button>
                    
                </ButtonGroup>
            </div>)
            }

            {
                isRoleSelected && isHost &&(
                    <CreateRoom 
                    isHost={isHost}
                    hostName={hostName} 
                    setHostName={setHostName}
                    setRoomID={setRoomID}
                    setQuiz={setQuiz}
                    quiz={quiz}
                    roomID={roomID}
                    />
                )
            }

            {
                isRoleSelected && !isHost &&(
                    <JoinRoom 
                        isHost={isHost}
                        />
                )
            }
        </>
    )
}