const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://huyen:${password}@cluster0.ngs24.mongodb.net/phonebookdb?retryWrites=true`


mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (!process.argv[3]) {
    Person.find({}).then(result => {
        console.log(`phone book:`)
        result.forEach(person => {
          console.log(`${person.name}  ${person.number}`)
        })
        mongoose.connection.close()
      })
} else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
      
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phone book`)
        mongoose.connection.close()
    })
}