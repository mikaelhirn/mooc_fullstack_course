import ShowWeather from './ShowWeather.jsx'

const ListCountries = ( {result, searchText, sendSearchText, apiKey} ) => {
	let resLen = 0
	let countries = []

	const handleClick = (country) => {
		sendSearchText(country)
	}
	result.length > 0 ? resLen = result[0].length : 0
	if (resLen > 0) {
		countries = result[0].filter((x) => x.name.common.toLowerCase().includes(searchText)).map((x) => x.name.common)
	}
	if(countries.length > 10 && searchText.length !== 0){
		return (
			<b>Too many result, specify another filter.</b>
		)
	}else if(countries.length > 1 && searchText.length !== 0){
		return (
			countries.map((x, i) => <li key={i}>{x} <button onClick={() => handleClick(x)}>show</button></li>)
		)
	}else if(countries.length === 1 && searchText.length !== 0){
		const countryData = result[0].filter((x) => x.name.common.toLowerCase().includes(searchText))
		return (
			<div>
				<h1>{countryData[0].name.common}</h1>
				capital {countryData[0].capital[0]}<br />
				population {countryData[0].capital[0]}<br /><br />
				<h2>Languages</h2>
				<ul>{Object.values(countryData[0].languages).map((x) => <li key={x}>{x}</li>)}</ul><br /><br />
				<img src={Object.values(countryData[0].flags)[0]} /><br />
				<h2>Weather in {countryData[0].capital[0]}</h2>
				<ShowWeather apiKey={apiKey}  place={countryData[0].capital[0]}/>

			</div>
			  	
		)
	}
}

export default ListCountries
