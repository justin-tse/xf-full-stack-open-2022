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

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
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

// something went wrong will tell us the error
app.use(unknowEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})