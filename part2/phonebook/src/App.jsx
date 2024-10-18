import { useEffect, useState } from 'react'
import axios from 'axios'
import ListContacts from './ListContacts'
import PersonForm from './PersonForm'
import Filter from './Filter'
import contacts from './services/contacts'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')


	useEffect(() => {
		contacts
		.getPersons()
		.then(initialPersons => {
		setPersons(initialPersons)
    })
	}, [])

	const addNewName = (event) => {
		event.preventDefault()
		const personObject = {
		name: newName,
		number: newNumber
		}
		if(persons.find((x) => x.name === newName)) {
			const confirmed = confirm(newName + " existst. Overwrite number?")
			if (confirmed){
				const personId = persons.find((x) => x.name === newName).id
				contacts
					.update(personId, personObject)
					.then(putPerson => {
						setPersons(persons.map((x) => x.id === personId ? putPerson : x))
						setNewName('')
						setNewNumber('')
					})
					.catch((error) => {
						console.log('Inserting data failed', error)

					})
			}
		}else{
			contacts
			.postPerson(personObject)
			.then(postedPerson => {
				setPersons(persons.concat(postedPerson))
				setNewName('')
				setNewNumber('')
		})
		.catch((error) => {
			console.log('Failed to add object..')
		})
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

	const handleDeleteName = (id, event) => {
		contacts
		.deletePerson(id)
		.then((delPerson) => {
			console.log('::::::::', delPerson.id)
			setPersons(persons.filter(person => person.id !== delPerson.id))
		})
		.catch((error) => {
		console.log('Failed to delete..', error)
		})
	}
	return (
		<div>
			<h1>Phonebook</h1>
			<Notification message="{errorMessage}" />
			<h2>Search</h2>
			<Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
			<h2>Add New Contact</h2>
			<PersonForm newName={newName} addNewName={addNewName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
			<h2>Numbers</h2>
			<ListContacts persons={persons} filter={newFilter} handleDeleteName={handleDeleteName}/>
		</div>
	)
}

export default App
