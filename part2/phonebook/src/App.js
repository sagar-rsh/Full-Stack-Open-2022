import { useState, useEffect } from 'react';

import phonebookService from './services/persons';
import Filter from './components/Filter';
import PersonsForm from './components/PersonsForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterVal, setFilterVal] = useState('');

  useEffect(() => {
    phonebookService.getPersons().then((personsList) => {
      setPersons(personsList);
    });
  }, []);

  const handleAddPerson = (event) => {
    event.preventDefault();

    const person = persons.find((person) => person.name === newName);
    if (person) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...person, number: newNumber };
        phonebookService
          .updatePerson(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.name !== newName ? person : returnedPerson
              )
            );
          });
      }
      setNewName('');
      setNewNumber('');
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    phonebookService.createPerson(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
    });
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handlenewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      phonebookService.deletePerson(id).then((deletedPerson) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
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
      <Persons
        phoneBookToShow={phoneBookToShow}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
