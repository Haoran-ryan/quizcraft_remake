import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
  } from "@material-tailwind/react";


  
function PlayerRegistration({ roomToJoin,playerName,setPlayerName, setRoomToJoin, setIsRegistrationComplete}){

    const handleNameChange =(e)=>{
        const inputName = e.target.value;
        if(inputName.length > 0){
            setPlayerName(inputName);
        }
      
    };
    const handleRoomChange =(e)=>{
        const inputRoom = e.target.value;
        if(inputRoom.length === 6){
            setRoomToJoin(inputRoom);
        }
    };

    const handleJoinSubmit =()=>{
        if(playerName.length >0 && roomToJoin.length === 6 ){
            setIsRegistrationComplete(true);
        }
        else{
            alert("Please enter your name and room number");
        }
    };

    
    return (
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Player Registration
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Name" size="lg" onChange={handleNameChange} />
            <Input label="Room Number" size="lg" onChange={ handleRoomChange } />
        
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit" onClick={handleJoinSubmit}>
              Join
            </Button>
          </CardFooter>
        </Card>
      );
};

export default PlayerRegistration;