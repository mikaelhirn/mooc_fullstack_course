const PersonForm = ({newName, addNewName, handleNewName, newNumber, handleNewNumber}) => {
    return (
    <form onSubmit={addNewName}>
        <div>
            name: <input value={newName} onChange={handleNewName}/><br />
            phone: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    )
}

export default PersonForm