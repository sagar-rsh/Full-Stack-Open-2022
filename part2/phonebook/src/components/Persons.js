import Person from './Person';

const Persons = ({ phoneBookToShow }) => {
  return (
    <>
      {phoneBookToShow.map((person) => (
        <Person key={person.name} name={person.name} number={person.number} />
      ))}
    </>
  );
};

export default Persons;
