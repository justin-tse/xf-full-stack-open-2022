const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://xf-fullstack-2022:${password}@cluster0.onlalo2.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
    const note = new Note({
      content: 'HTML is Easy',
      date: new Date(),
      important: false,
    })
  
    note.save().then(result => {
      console.log('note saved!')
      mongoose.connection.close()
    })
  })