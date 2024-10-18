import { useState } from 'react'

function App() {
	const [searchText, setSearchText] = useState('')
	const [result, setResult] = useState('')

	const handleSearch = (event) => {
		console.log(event.target.value)
	}


	return (
		<div>
			find countries:<input onChange={handleSearch}/>
			{result}
		</div>
	)
}

export default App
