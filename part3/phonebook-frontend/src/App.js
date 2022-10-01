import { useState, useEffect } from 'react';

import phonebookService from './services/persons';
import Filter from './components/Filter';
import PersonsForm from './components/PersonsForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterVal, setFilterVal] = useState('');
  const [statusMessagge, setStatusMessage] = useState(null);

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
            setNewName('');
            setNewNumber('');
            setStatusMessage(`Updated ${returnedPerson.name}'s number`);
            setTimeout(() => {
              setStatusMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setStatusMessage(
              `Information of ${updatedPerson.name} has already been removed from server`
            );
            setPersons(
              persons.filter((person) => person.id !== updatedPerson.id)
            );
            setTimeout(() => {
              setStatusMessage(null);
            }, 5000);
          });
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    phonebookService
      .createPerson(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setStatusMessage(`Added ${returnedPerson.name}`);
        setNewName('');
        setNewNumber('');
        setTimeout(() => {
          setStatusMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setStatusMessage(error.response.data.error);
        setTimeout(() => {
          setStatusMessage(null);
        }, 5000);
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
        setStatusMessage(`${personToDelete.name} has been deleted`);
        setTimeout(() => {
          setStatusMessage(null);
        }, 5000);
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
      <Notification message={statusMessagge} />
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
