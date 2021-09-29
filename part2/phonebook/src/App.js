import React, { useState, useEffect } from 'react'
import personService from './services/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('a new name')
  const [newNumber, setNewNumber] = useState('0123456789')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(personsList => {
        setPersons(personsList)
      })
  }, [])
 
  const addContact = (e) => {
    e.preventDefault()
    const personUpdate = persons.find(person => person.name === newName);
    const regex = /^\(?([0-9]{2,3})\)?[-. ]?([0-9]{2,3})[-. ]?([0-9]{4,6})$/;
    
    if (!newNumber.match(regex)) {
      window.alert(`${newNumber} is not a phone number`)
    } else {
      if (personUpdate) {
        const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)
        const personObj = {
          id: personUpdate.id,
          name: newName,
          number: newNumber,
        }
        if (result) {
          personService
            .update(personUpdate.id, personObj)
            .then(returnedPerson => {
              setMessage(`Updated ${newName}`)
              setMessageType('success')
              setShowMessage(true)
              setTimeout(function () {
                setShowMessage(false)
              }, 5000);
              setPersons(persons.map(person => person.id !== personUpdate.id ? person : returnedPerson))
            })
            .catch(error => {
              setMessage(`Information of ${newName} has already been removed from server`)
              setMessageType('error')
              setShowMessage(true)
              setTimeout(function () {
                setShowMessage(false)
              }, 5000)
            })
        }
      } else {
        const personObj = {
          id: persons.length + 1,
          name: newName,
          number: newNumber,
        }
        personService
          .create(personObj)
          .then(person => {
            setMessage(`Added ${newName}`)
            setMessageType('success')
            setShowMessage(true)
            setTimeout(function () {
              setShowMessage(false)
            }, 5000)
            setPersons(persons.concat(person))
          })
          .catch(error => {
            setMessage(`ID of ${newName} has duplicated`)
            setMessageType('error')
            setShowMessage(true)
            setTimeout(function () {
              setShowMessage(false)
            }, 5000)
          })

        setNewName('')
        setNewNumber('')
      }
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    if (e.target.value !== ''){
      setShowAll(false)
      setSearch(e.target.value)
    } else {
      setSearch('')
    }
  }

  const handleDelete = (e) => {
    const name = e.target.value
    const personDelete = persons.find(x => x.name === name);
    const result = window.confirm(`Delete ${name} ?`);
    
    if (result) {
      personService
        .remove(personDelete.id)
        .then(res => {
          personService
            .getAll()
            .then(personsList => {
              setPersons(personsList)
            })
        })
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      {showMessage ? (
        <Notification message={message} classes={messageType}/>): (
        <div></div>
      )}
      <Filter value={search} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm 
        name={newName} 
        number={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        addContact={addContact} 
      />
      <h2>Numbers</h2>
      {personsToShow.map(person => (<Persons key={person.id} name={person.name} number={person.number} handleDelete={handleDelete} />)
      )}
    </div>
  )
}

export default App
