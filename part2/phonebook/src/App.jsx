import { useState } from 'react'
import ListContacts from './ListContacts'
import PersonForm from './PersonForm'
import Filter from './Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addNewName = (event) => {
    event.preventDefault()    
    if(persons.find((x) => x.name === newName)) {
      alert(`${newName} exists.`)
    }else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value) 
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)    
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
      <h2>Add New Contact</h2>
      <PersonForm newName={newName} addNewName={addNewName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <ListContacts persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App