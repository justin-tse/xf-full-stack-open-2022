import CountryInfo from "./CountryInfo";

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

export default MatchedMoreThanOne;