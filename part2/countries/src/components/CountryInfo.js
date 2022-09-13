import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryInfo = ({ country }) => {
  const [temperature, setTemperature] = useState(0);
  const [wind, setWind] = useState(0);
  const [icon, setIcon] = useState('');

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        const temp = Math.floor(
          ((response.data.main.temp - 273.15) * 100) / 100
        );
        setTemperature(temp);
        setWind(response.data.wind.speed);
        setIcon(response.data.weather[0].icon);
      });
  }, [country.capital]);

  return (
    <>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags} alt={country.flags} width='300' height='200' />
      <h2>Weather in {country.capital[0]}</h2>
      <div>temperature {temperature} Celcius</div>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='' />
      <div>wind {wind} m/s</div>
    </>
  );
};

export default CountryInfo;
