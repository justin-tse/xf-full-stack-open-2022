import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({ filterPersons, persons, setPersons }) => {
 
  const handleDelete = (id, name) => {
    console.log(id, 'i am id')
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(removeId => {
          console.log('Delete successful', removeId)
          setPersons(persons.filter(person => person.id !== removeId))
        });
    }
  }
  useEffect(() => {
    setPersons(persons)
  }, [])

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

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect((() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled', initialPersons)
        setPersons(initialPersons)
      })
  }), [])

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()

    const person = persons.find(person => person.name === newName)
    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
        const id = person.id
        const changePerson = { ...person, number: newNumber }
        personService
          .update(id, changePerson)
          .then(updatePerson => {
            setPersons(persons.map(person => person.id === id ? updatePerson : person))
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(res => {
          setPersons(persons.concat(res))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = event => {
    setFilterName(event.target.value)
  }

  const filterPersons = persons.filter(person => person.name.toLowerCase().startsWith(filterName.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <Persons filterPersons={filterPersons} setPersons={setPersons} persons={persons} />
    </div>
  )
}

export default App