import { useState, useEffect } from 'react'
import NameDisplay from './components/NameDisplay'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import personsService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'


function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)


  const hook = () => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    // check if person is already added
    const isPersonAdded = persons.some(person => person.name === newName)
    if (isPersonAdded) {
      const confirmUpdate = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      if (confirmUpdate) {
        const personToUpdate = persons.find(person => person.name === newName)
        const updatedPerson = { ...personToUpdate, number: newNumber }
        personsService
          .update(personToUpdate.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')

            setNotification(`Updated ${newName}'s number`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error=> {
            setError(`Information of ${newName} has already been removed from the server`)
            setTimeout(() => {
              setError(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== personToUpdate.id))
          })

        
      }
      return
    }
    if (newName === '') {
      alert('Name cannot be empty')
      return
    }
    const newPersons = {
      name: newName,
      number: newNumber,
      id: `${persons.length + 1}`
    }
    personsService
      .create(newPersons)
      .then(returnedPerson => {
        setPersons(persons.concat(newPersons))
        setNewName('')
        setNewNumber('')
        setNotification(`Added ${newName}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const deletePerson = (id) => {
    // find the person to delete
    const personToDelete = persons.find(person => person.id === id)
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`)
    if (confirmDelete) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setError(`Information of ${personToDelete.name} has already been removed from the server`)
          setTimeout(() => {
            setError(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h2>Add a New Person</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <NameDisplay persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
