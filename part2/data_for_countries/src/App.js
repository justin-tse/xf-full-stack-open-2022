import { useState, useEffect } from 'react'
import axios from 'axios'
import MatchedCountries from './components/MatchedCountries'

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
      find countries <input onChange={handleSearchChange} value={searchName} />
      <MatchedCountries matchedCountries={matchedCountries} searchName={searchName} />
    </div>
  )
}

export default App;