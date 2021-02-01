
import React, { useState } from 'react';
const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  ///Calling the api using a useState////
  const [query, setQuery] = useState('');
  ///Also going to call the weather api suing a usestate and have it equal to an empty array.
  const [weather, setWeather] = useState({})

  ///This is a simple fetch request for the api where we are creating the varoible search
  //Search is going to equal an event and if the event key eqauls what we enter, we are going to fetch the link leading to the weather app website app.base
  ///And call the search query using ?q = what we searched in our query and have it equall the api.key
  ///Then we will return the response into a json file and have the result equal tot he setWeather from the useState. 

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('');
          console.log(result);

        });
    }
  }

  const dateBuilder = (d) => {
    let months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={
      ///Whats happening is that I am checking for the type of weather. 
      /// If the the weather eqaul undefined, meaning if we haven't done a search query yet,
      ///Then we are going to make it eqaul to app. But if the temprue increases, then its going to app.
      (typeof weather.main != 'undefined') ?
       ((weather.main.temp > 16) ?
        'app warm' : 
        'app') : 
        'app'}>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>

            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weather.main.temp)}°c

            </div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>



        ) : ('')}
      </main>
    </div>
  );
}

export default App;

