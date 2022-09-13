import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonsForm from './components/PersonsForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterVal, setFilterVal] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

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
