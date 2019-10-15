import React from 'react';

const City = ({key, icon, city, temperature, humidity, country, handleDelete}) => (
    <li key={key}>
      <img src={`http://openweathermap.org/img/w/${icon}.png`} />
      <span className="some">City: {city},
        <span className="degrees">{temperature}</span>,
        humidity: {humidity}%,
        country: {country}
        <span className="newClose" onClick={handleDelete}></span>
      </span>
    </li>
);

export default City;
