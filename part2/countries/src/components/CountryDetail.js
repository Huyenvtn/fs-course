import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Language from './Language'
const api_key = process.env.REACT_APP_API_KEY

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState([])
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data.current)
      })
      .catch(error => {
        alert('Error')
      })
  }, [url])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.area}</div>
      <div>
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map(language => (
            <Language key={language} name={language} />
          ))}
        </ul>
        <img src={country.flags.png} alt='Flag' width='100' height='100' />
      </div>
      <div>
        <h2>Weather in {country.capital}</h2>
        <div>
          <b>temperature:</b> {weather.temperature} Celsius
        </div>
        <img src={weather.weather_icons} alt='Icon' width='50' height='50' />
        <div>
          <b>wind:</b> {weather.wind_degree} mph direction SSW
        </div>
      </div>
    </div>
  )
}

export default CountryDetail
