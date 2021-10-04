const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())

morgan.token('data', (req, res) => {
    if (req.method === "POST") {
       return JSON.stringify(req.body|| {}) 
    }
})
app.use(morgan(' :method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.json())
app.use(express.static('build'))

const generateId = () => {
    return Math.floor(Math.random() * (1000 - 4) + 4)
}

app.get('/info', ( req, res ) => {
    const current = new Date();
    Person.find({}).then(persons => {
        res.send(`Phone book has info for ${persons.length} people </br> </br> ${current}`)    
    })  
})

app.get('/api/persons', ( req, res ) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', ( req, res, next ) => {
    const id = req.params.id
    Person.findById(id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', ( req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', ( req, res, next ) => {
    const body = req.body
    const person = new Person({
        id: generateId(),
        name: body.name,
        number: body.number || '0123456789',
    })
    
    person.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', ( req, res, next ) => {
    const body = req.body
    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate( req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    
    if (error.name === 'CastError') {
        return res.status(400).json({error: 'malformed id'})
    } else if (error.name === 'ValidationError') {
        console.log(error.message)
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})