import { useState, useEffect } from 'react'
import axios from 'axios'

const MatchedCountries = ({ matchedCountries }) => {
  if (matchedCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else {
    if (matchedCountries.length > 1) {
      return <>
        {matchedCountries.map(matchedCountry => <div key={matchedCountry.name.common}>{matchedCountry.name.common}</div>)}
      </>
    }
    if (matchedCountries.length === 1) {
      const matchedCountry = matchedCountries[0]
      return (
        <>
          <h2>{matchedCountry.name.common}</h2>
          <div>capital {matchedCountry.capital[0]}</div>
          <div>area {matchedCountry.area}</div>
          <h4>languages:</h4>
          <ul>
            {Object.values(matchedCountry.languages).map(language => <li key={language}>{language}</li>)}
          </ul>
          <img src={matchedCountry.flags.svg} alt={`the flag of ${matchedCountry.name.common}`} style={{ width: "180px" }} />
        </>
      )
    }
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    console.log('effect')
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