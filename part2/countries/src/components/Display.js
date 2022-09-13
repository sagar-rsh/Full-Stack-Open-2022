import CountryInfo from './CountryInfo';

const Display = ({ searchResult, showCountry, handleshowCountry }) => {
  return (
    <>
      {searchResult.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}

      {searchResult.length === 1 && <CountryInfo country={searchResult[0]} />}

      {searchResult.length <= 10 &&
        searchResult.length > 1 &&
        searchResult.map((result) => (
          <div key={result.name}>
            {result.name}{' '}
            <button onClick={() => handleshowCountry(result)}>show</button>
          </div>
        ))}

      {Object.keys(showCountry).length > 0 && (
        <CountryInfo country={showCountry} />
      )}
    </>
  );
};

export default Display;
