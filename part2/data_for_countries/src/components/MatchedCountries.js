import { useState, useEffect } from 'react'
import MatchedMoreThanOne from "./MatchedMoreThanOne"
import CountryInfo from "./CountryInfo"

const MatchedCountries = ({ matchedCountries, searchName }) => {
  const matchedNum = matchedCountries.length
  const [show, setShow] = useState(new Array(matchedNum).fill(false))

  const handleShow = (idx) => {
    const newShow = [...show]
    newShow[idx] = !newShow[idx]
    setShow(newShow)
  }

  useEffect(() => {
    setShow(new Array(matchedNum).fill(false))
  }, [matchedNum])

  if (!searchName) {
    return <div>Please specify countries you want to find</div>
  } else {
    if (matchedNum > 10) {
      return <div>Too many matches, specify another filter</div>
    }
  
    if (matchedNum > 1) {
      return <MatchedMoreThanOne matchedCountries={matchedCountries} handleShow={handleShow} show={show} />
    }
  
    if (matchedNum === 1) {
      const matchedCountry = matchedCountries[0]
      return <CountryInfo matchedCountry={matchedCountry} />
    }
  
    if (matchedNum === 0) {
      return <div>No matches, specify some other fliter</div>
    }
  }
}

export default MatchedCountries