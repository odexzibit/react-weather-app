import React from 'react';

const Current = ({icon, currentCity, city, country, temperature, humidity}) => (
  <li>
    <img src={`http://openweathermap.org/img/w/${icon}.png`}/>
    <span className="some"> Current position: {currentCity ?  (<span>{city} {country}, weather: <span className="degrees">{temperature}</span>,
    humidity: {humidity}%</span>) : (<span>getting data..</span>)}</span>
  </li>
)

export default Current;
