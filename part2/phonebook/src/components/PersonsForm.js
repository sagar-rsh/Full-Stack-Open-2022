const PersonsForm = (props) => {
  const {
    handleAddPerson,
    newName,
    handleNewName,
    newNumber,
    handlenewNumber,
  } = props;
  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handlenewNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonsForm;
