import Person from './Person';

const Persons = ({ phoneBookToShow, handleDeletePerson }) => {
  return (
    <>
      {phoneBookToShow.map((person) => (
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          handleDeletePerson={() => handleDeletePerson(person.id)}
        />
      ))}
    </>
  );
};

export default Persons;
