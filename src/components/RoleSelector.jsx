const RoleSelector = ( { setIsRoleSelected, setIsHost }) =>{
    const handleRoleClick = (e)=>{
        
        const roleSelected = e.target.value;
        if (roleSelected === 'host'){
            setIsRoleSelected(true);
            setIsHost(true);
        } else if (roleSelected === 'player'){
            setIsRoleSelected(true);
        }
    }
    return(
        <div>
            <h1>Choose Your Role</h1>
            <button value="host" onClick={ handleRoleClick }>Host</button>
            <button value="player" onClick={ handleRoleClick }>Player</button>
        </div>
    )
};

export default RoleSelector;