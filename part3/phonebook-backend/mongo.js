const mongoose = require('mongoose')
const { Schema } = mongoose

if (process.argv.length < 3) {
  console.log('Please input the password as the third argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://xf-fullstack-2022:${password}@cluster0.onlalo2.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connect')
    if (process.argv.length > 3) {
      const name = process.argv[3]
      const number = process.argv[4]
      const person = new Person({
        name: name,
        number: number
      })
      person.save().then(() => {
        mongoose.connection.close()
      })
    } else {
      console.log('person:')
      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name, person.number)
        })
      }).then(() => {
        mongoose.connection.close()
      })
    }
  })
