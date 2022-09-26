const Filter = ({ filterVal, setFilterVal }) => {
  return (
    <div>
      <span>filter shown with </span>
      <input
        value={filterVal}
        onChange={(event) => setFilterVal(event.target.value)}
      />
    </div>
  );
};

export default Filter;
