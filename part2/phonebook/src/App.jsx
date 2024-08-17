import { useState } from 'react'
import NameDisplay from './components/NameDisplay'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


function App() {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    // check if person is already added
    const isPersonAdded = persons.some(person => person.name === newName)
    if (isPersonAdded) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    if (newName === '') {
      alert('Name cannot be empty')
      return
    }
    const newPersons = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPersons))
    setNewName('')
    setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <NameDisplay persons={filteredPersons} />
    </div>
  )
}

export default App
