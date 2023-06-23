import { useEffect, useRef, useState } from "react";


const CreateRoom = ({ generateID, setRoomID, roomID, setIsRoomCreated, setHostName }) => {
    const inputRef = useRef(null);
    const [isCreateShow, setIsCreateShow] = useState(false);
    let id = 0;
    
    const nameValidation = (name)=>{
        if(name.length > 0){
            return true;
        }
        return false;
    }
    const handleNameSubmit = (e)=>{
        e.preventDefault();
        const inputName = inputRef.current.value;
        console.log(`host name is: ${inputName}`)
        if(!nameValidation(inputName)){
            alert('Please enter your name');
            return; 
        }
        setHostName(inputName);
        setIsCreateShow(true);
    }
    
    const handleCreateClick = ()=>{
        id = generateID();
        setRoomID(id);
        setIsRoomCreated(true);
    }


    return(
        <>
            <h3>Host a Game</h3>
            <form onSubmit={ handleNameSubmit }>
                <input type="text" placeholder="Enter your name" ref={ inputRef }/>
                <button type="submit" >Submit</button>
            </form>
            { isCreateShow &&
                (<button onClick={()=>handleCreateClick()}>Create</button>)
            }
        </>
    )
};

export default CreateRoom;