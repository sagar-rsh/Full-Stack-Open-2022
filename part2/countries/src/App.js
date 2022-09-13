import { useState, useEffect } from 'react';
import axios from 'axios';
import Display from './components/Display';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [showCountry, setShowCountry] = useState({});

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(
        response.data.map((country) => ({
          name: country.name.common,
          capital: country.capital,
          area: country.area,
          languages: country.languages ? Object.values(country.languages) : [],
          flags: country.flags.png,
        }))
      );
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    setShowCountry({});
  };

  const handleshowCountry = (result) => {
    setShowCountry(result);
  };

  const searchResult =
    searchInput === ''
      ? []
      : countries.filter((country) =>
          country.name.toLowerCase().includes(searchInput.toLowerCase())
        );

  return (
    <div>
      <p>
        find countries{' '}
        <input value={searchInput} onChange={handleSearchChange} />
      </p>
      <Display
        searchResult={searchResult}
        showCountry={showCountry}
        handleshowCountry={handleshowCountry}
      />
    </div>
  );
};

export default App;
