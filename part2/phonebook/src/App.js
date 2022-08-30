import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

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