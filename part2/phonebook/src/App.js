import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPersons, setFilterPersons] = useState(persons)

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

  const handleFilterChange = event => {
    const newFilterPersons = persons.filter(person => person.name.toLowerCase().startsWith(event.target.value.toLowerCase()))
    setFilterPersons(newFilterPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with<input type="text" onChange={handleFilterChange} /></div>
      <h2>add a new</h2>
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
        filterPersons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
      }
    </div>
  )
}

export default App