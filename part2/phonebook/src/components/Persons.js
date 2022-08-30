import personService from '../services/persons'

const Persons = ({ filterPersons, persons, setPersons, message, setMessage }) => {
  const handleDelete = (id, name) => {
    console.log(id, 'i am id')
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(removeId => {
          console.log('Delete successful', removeId)
          setPersons(persons.filter(person => person.id !== removeId))
          setMessage(`Delete ${name} successful.`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        });
    }
  }

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

export default Persons