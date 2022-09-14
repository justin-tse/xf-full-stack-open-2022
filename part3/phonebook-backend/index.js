require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Person = require('./models/person')

app.use(express.json())

app.use(morgan('tiny'))

app.use(cors())

app.use(express.static('build'))

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':data'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  // const hasPerson = Person.find(request.params.name)
  // console.log(hasPerson)

  // if (hasPerson) {
  //   return response.status(400).json({
  //     error: 'name must be unique'
  //   })
  // }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/info', (request, response) => {
  response.send(`<div>Phonebook has info for ${persons.length} people</div> 
  <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  // const person = persons.find(person => person.id === id)
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
  // if (person) {
  //   response.json(person)
  // } else {
  //   response.status(400).end("Can not find this person")
  // }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server on ${PORT}`)
