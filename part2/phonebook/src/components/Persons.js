import PropTypes from 'prop-types'

const Persons = ({ filterPersons, handleDelete }) => {

  return (
    <>
      {
        filterPersons.map(person =>
          <div key={person.id}>
            {person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
          </div>)
      }
    </>
  )
}

Persons.propTypes = {
  filterPersons: PropTypes.array,
  handleDelete: PropTypes.func
}

export default Persons
