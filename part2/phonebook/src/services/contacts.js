import axios from 'axios'
const baseURL = 'http://localhost:3000/api/persons'

const getPersons = () => {
	const request = axios.get(baseURL)
	return request.then(response => response.data)
}

const postPerson = (person) => {
	const request = axios.post(baseURL, person)
	return request.then(response => response.data)
}

const update = (id, person) => {
	const request = axios.put(`${baseURL}/${id}`, person)
	return request.then(response => response.data)
}

const deletePerson = (id) => {
	const request = axios.delete(`${baseURL}/${id}`)
	return request.then(response => response.data)
}

export default { getPersons, postPerson, update, deletePerson }
