const NameDisplay = ({ persons, deletePerson }) => {
    return (
        <>
          {persons.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
              <button onClick={() => deletePerson(person.id)}>delete</button>
            </li>
          ))}  
        </>
    )
  }

export default NameDisplay