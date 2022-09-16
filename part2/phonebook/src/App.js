import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)

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

  const updateState = (message, type = `info`) => {
    setMessage({ message, type })
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  }

  const handleSubmit = event => {
    event.preventDefault()

    setNewName('')
    setNewNumber('')

    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
        const id = existingPerson.id
        const changePerson = { ...existingPerson, number: newNumber }
        personService
          .update(id, changePerson)
          .then(updatePerson => {
            setPersons(persons.map(person => person.id === id ? updatePerson : person))
            updateState(`Update ${newName}'s number`)
          }).catch(error => {
            updateState(`Information of ${newName} has already been removed from server`, 'warning')
            setPersons(persons.filter(person => person.id !== id))
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
          updateState(`Added ${newName}`)
        })
        .catch(error => updateState(error.response.data.error, 'warning'))
    }
  }

  const handleFilterChange = event => {
    setFilterName(event.target.value)
  }

  const handleDelete = (id, name) => {
    console.log(id, 'i am id')
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(removeId => {
          console.log('Delete successful', removeId)
          setPersons(persons.filter(person => person.id !== removeId))
          updateState(`Delete ${name} successful.`)
        });
    }
  }

  const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={message}
      />
      <Filter handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons
        filterPersons={filterPersons}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App