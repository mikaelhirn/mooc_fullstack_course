import { useState, useEffect } from 'react'
import axios from 'axios'
import ListCountries from './ListCountries.jsx' 

function App() {
	const [searchText, setSearchText] = useState('')
	const [result, setResult] = useState([])
	const api_key = import.meta.env.VITE_WEATHER_KEY
	const url = "https://studies.cs.helsinki.fi/restcountries/api/all"

	useEffect(() => {
		axios
		.get(url)
		.then(response => {
			setResult([response.data])
		})
		.catch(error => {
			console.log(`Fetch error ${error}`)
		})

	},[])

	const handleSearch = (event) => {
		setSearchText(event.target.value)
	}

	const handleShowCountry = (data) => {
		setSearchText(data.toLowerCase())
	}

	return (
		<div>
			find countries:<input name="searchText" value={searchText} onChange={handleSearch}/><br/>
			<ListCountries result={result} searchText={searchText} sendSearchText={handleShowCountry} apiKey={api_key}/>
		</div>
	)
}

export default App
