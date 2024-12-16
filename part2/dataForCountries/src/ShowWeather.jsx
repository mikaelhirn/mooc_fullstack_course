import axios from 'axios'
import { useState, useEffect } from 'react'

const ShowWeather = ( {apiKey, place} ) => {
	const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=metric`
	const [currentTemp, setCurrentTemp] = useState(null)

	useEffect(() => {
		axios
			.get(weatherUrl)
			.then(response => {
				setCurrentTemp(response.data.main.temp)
				console.log("resp: ", currentTemp)
			})
		}, [weatherUrl]
	);

	return (
		<div>
			Current temperature {currentTemp !== null ? `${currentTemp} C` : 'Not fetched'}<br />

		</div>
	)
}

export default ShowWeather
