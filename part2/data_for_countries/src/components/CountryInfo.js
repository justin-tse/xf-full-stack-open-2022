import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city, weatherInfo }) => {
  return (
    <>
      <h3>Weather in {city}</h3>
      <div>temperature {weatherInfo.temp} Celcius</div>
      <img src={weatherInfo.url} alt="Weather condition icon" />
      <div>wind {weatherInfo.wind} m/s</div>
    </>
  )
}

const CountryInfo = ({ matchedCountry }) => {
  const [weatherInfo, setWeatherInfo] = useState({})
  const capital = matchedCountry.capital[0]
  
  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${capital},${matchedCountry.name.common}&units=metric&APPID=${apiKey}`
    console.log('effect weatherInfo')
    axios
      .get(url)
      .then(res => {
        console.log('promise fulfilled...', res.data)
        const icon = res.data.weather[0].icon
        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
        const newWeatherInfo = {
          temp: res.data.main.temp,
          wind: res.data.wind.speed,
          url: iconUrl
        }
        setWeatherInfo(newWeatherInfo)
      })
      .catch(e => {
        console.error("Please definded your own .env file to use your REACT_APP_API_KEY, following the .env.example file in the root")
      })
  }, [])

  return (
    <>
      <h2>{matchedCountry.name.common}</h2>
      <div>capital {capital}</div>
      <div>area {matchedCountry.area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.values(matchedCountry.languages).map(language =>
          <li key={language}>
            {language}
          </li>)}
      </ul>
      <img src={matchedCountry.flags.svg} alt={`the flag of ${matchedCountry.name.common}`} style={{ width: "180px" }} />
      
      <Weather city={capital} weatherInfo={weatherInfo} />
    </>
  )
}

export default CountryInfo