import PropTypes from 'prop-types'

const Filter = ({ handleFilterChange }) => {
  return (
    <div>filter shown with<input onChange={handleFilterChange} /></div>
  )
}

export default Filter

Filter.propTypes = {
  handleFilterChange: PropTypes.func
}
