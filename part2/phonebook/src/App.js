import { useState } from 'react';
import Filter from './components/Filter';
import PersonsForm from './components/PersonsForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterVal, setFilterVal] = useState('');

  const handleAddPerson = (event) => {
    event.preventDefault();

    const checkExists = persons.some((person) => person.name === newName);
    if (checkExists) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(nameObject));
    setNewName('');
    setNewNumber('');
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handlenewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const phoneBookToShow =
    filterVal === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterVal.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterVal={filterVal} setFilterVal={setFilterVal} />
      <h2>add a new</h2>
      <PersonsForm
        handleAddPerson={handleAddPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handlenewNumber={handlenewNumber}
      />
      <h2>Numbers</h2>
      <Persons phoneBookToShow={phoneBookToShow} />
    </div>
  );
};

export default App;
