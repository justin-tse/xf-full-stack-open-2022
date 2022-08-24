import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Justin' },
  ])
  const [newName, setNewName] = useState('')

  const handlePersonsChange = event => setNewName(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()
    const newNameObj = { name: newName }
    persons.some(person => JSON.stringify(person) === JSON.stringify(newNameObj))
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newNameObj))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form >
        <div>
          name: <input value={newName} onChange={handlePersonsChange} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => <div key={person.name}>{person.name}</div>)
      }
    </div>
  )
}

export default App