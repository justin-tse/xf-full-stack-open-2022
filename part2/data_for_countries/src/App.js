import { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const CountryInfo = ({ matchedCountry }) => {
  const [weatherInfo, setWeatherInfo] = useState({})

  useEffect(() => {
    console.log('effect weatherInfo')
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${matchedCountry.capital[0]},${matchedCountry.name.common}&units=metric&APPID=${apiKey}`)
      .then(res => {
        console.log('promise fulfilled...', res.data)
        const icon = res.data.weather[0].icon
        const url = `http://openweathermap.org/img/wn/${icon}@2x.png`
        const newWeatherInfo = {
          temp: res.data.main.temp,
          wind: res.data.wind.speed,
          url
        }
        setWeatherInfo(newWeatherInfo)
      })
      .catch(e => {
        console.error("Please definded your own .env file to use your REACT_APP_API_KEY, following the .env.example file in the root")
      })
  }, [matchedCountry.name.common, matchedCountry.capital])

  return (
    <>
      <h2>{matchedCountry.name.common}</h2>
      <div>capital {matchedCountry.capital[0]}</div>
      <div>area {matchedCountry.area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.values(matchedCountry.languages).map(language =>
          <li key={language}>
            {language}
          </li>)}
      </ul>
      <img src={matchedCountry.flags.svg} alt={`the flag of ${matchedCountry.name.common}`} style={{ width: "180px" }} />

      <h3>Weather in {matchedCountry.capital[0]}</h3>
      <div>temperature {weatherInfo.temp} Celcius</div>
      <img src={weatherInfo.url} alt="Weather condition icon" />
      <div>wind {weatherInfo.wind} m/s</div>
    </>
  )
}

const MatchedMoreThanOne = ({ matchedCountries, handleShow, show }) => {
  return (
    <>
      {
        matchedCountries.map((matchedCountry, idx) =>
          <div key={matchedCountry.name.common}>
            {matchedCountry.name.common}&nbsp;
            <button onClick={() => handleShow(idx)}>show</button>
            {show[idx] && <CountryInfo matchedCountry={matchedCountry} />}
          </div>)}
    </>
  )
}

const MatchedCountries = ({ matchedCountries }) => {
  const matchedNum = matchedCountries.length
  const [show, setShow] = useState(new Array(matchedNum).fill(false))

  const handleShow = (idx) => {
    const newShow = [...show]
    newShow[idx] = !newShow[idx]
    setShow(newShow)
  }

  if (matchedNum > 10) {
    return <div>Too many matches, specify another filter</div>
  } else {
    if (matchedNum > 1) {
      return <MatchedMoreThanOne matchedCountries={matchedCountries} handleShow={handleShow} show={show} />
    }
    if (matchedNum === 1) {
      const matchedCountry = matchedCountries[0]
      return <CountryInfo matchedCountry={matchedCountry} />
    }
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    console.log('effect countries')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        console.log('promise fulfilled...', res)
        setCountries(res.data)
      })
  }, [])

  const handleSearchChange = event => {
    setSearchName(event.target.value)
  }

  const matchedCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      find countries <input onChange={handleSearchChange} />
      <MatchedCountries matchedCountries={matchedCountries} />
    </div>
  )
}

export default App;