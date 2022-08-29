import { useState, useEffect } from 'react'
import axios from 'axios'

const Input = ({ text, value, onChange }) => {
  return (
    <div>
      {text}: <input value={value} onChange={onChange} />
    </div>
  )
}

const Filter = ({ handleFilterChange }) => {
  return (
    <div>filter shown with<input onChange={handleFilterChange} /></div>
  )
}

const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, handleSubmit }) => {
  return (
    <form >
      <Input text='name' value={newName} onChange={handleNameChange} />
      <Input text='number' value={newNumber} onChange={handleNumberChange} />
      <div>
        <button type="submit" onClick={handleSubmit}>add</button>
      </div>
    </form>
  )
}

const Persons = ({ filterPersons }) => {
  return (
    <>
      {
        filterPersons.map(person =>
          <div key={person.name}>
            {person.name} {person.number}
          </div>)
      }
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect((() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        console.log('promise fulfilled', res)
        setPersons(res.data)
      })
  }), [])

  const [filterName, setFilterName] = useState('')

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
    setFilterName(event.target.value)
  }

  const filterPersons = persons.filter(person => person.name.toLowerCase().startsWith(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <Persons filterPersons={filterPersons} />
    </div>
  )
}

export default App