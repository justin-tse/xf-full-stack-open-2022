require('dotenv').config()
const express = require('express')
const app = express()

const Note = require('./models/note')

const cors = require('cors')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(cors())
app.use(requestLogger)

// the front end static webside
app.use(express.static('build'))

app.get('/', (resquest, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    console.log('empty')
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(saveNote => {
    response.json(saveNote)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const unknowEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknowEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})