import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()
    const newNameObj = {
      name: newName,
      number: newNumber
    }
    persons.some(person => JSON.stringify(person) === JSON.stringify(newNameObj))
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newNameObj))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form >
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
      }
    </div>
  )
}

export default App