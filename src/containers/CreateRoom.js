import { useEffect, useRef, useState } from "react";
import QuizParams from "./QuizParams";
import QuizList from "../components/QuizList";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";

const CreateRoom = ({ setRoomID, roomID, setHostName, hostName, setQuiz,quiz }) => {
    const [isHostCreated, setIsHostCreated] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [isCreateButtonDisabled, setIsCreateButtonDisabled] = useState(true);
    const [isRoomCreated, setIsRoomCreated] = useState(false);

    //useEffect to automatically change isRoomCreated to true when quiz data is loaded
    useEffect(()=>{
      if(quiz.length > 0){
        setIsRoomCreated(true);
      }
    },[quiz])
    // Function: generate a random 6-digit number
    // TODO: convert to String before pushing to database
    const generateID = () => {
        const random_key = Math.floor(100000 + Math.random() * 900000);
        return random_key;
    };
    const handleCreateClick = ()=>{
        const id = generateID();
        setRoomID(id);
        setIsHostCreated(true);
    }; 

    // Validate name input 
    const nameValidation = (name)=>{
        if(name.length > 0){
            return true;
        }
        return false;
    }; 

    const handleNameSubmit = ()=>{
        if(!nameValidation(nameInput)){
            alert('Please enter your name');
            return; 
        }
        setHostName(nameInput);
        setIsCreateButtonDisabled(false);
    }; 

    const handleCancelClick = ()=>{
        alert('cancel implemented later');
    }

    // TODO: debugging
    useEffect(()=>{
        console.log(`------ CreateRoom State ---------`)    
        console.log(`hostName: ${hostName}`)
        console.log(`nameInput: ${nameInput}`)
        console.log(`isRoomCreated: ${isRoomCreated}`)
        console.log(`roomID: ${roomID}`)
        console.log(`type of roomID: ${typeof(roomID)}`)
        console.log(`isHostCreated: ${isHostCreated}`)
        console.log(`---------------------------------`)
    },[hostName, nameInput, isRoomCreated, roomID, isHostCreated])
    return(
        <div>
            { !isHostCreated && !isRoomCreated &&
                (<Card className="w-96">
                <CardHeader
                  variant="gradient"
                  color="blue"
                  className="mb-4 grid h-28 place-items-center"
                >
                  <Typography variant="h3" color="white">
                    Host Registration
                  </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                  <Input label="Host Name" size="lg" type ='text' value={ nameInput } onChange={(e)=>setNameInput(e.target.value)}/>
                  <Button onClick={ handleNameSubmit }>Register Host</Button>
                  <Button onClick={ handleCreateClick } disabled={ isCreateButtonDisabled }>Create Your Room</Button>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button variant="gradient" fullWidth onClick={ handleCancelClick }>
                    Cancel
                  </Button>
                </CardFooter>
              </Card>)
            }
            { isHostCreated && !isRoomCreated &&
            (<QuizParams 
                setQuiz={ setQuiz }
                setIsRoomCreated={ setIsRoomCreated }
            />)}

            {!!isHostCreated && !!isRoomCreated && (
              <QuizList 
              isHost={true} 
              roomToJoin={roomID.toString()} 
              totalQuizLength={quiz.length}
              isRoomCreated={isRoomCreated}
              />
            )}

        </div>
    )
};

export default CreateRoom;