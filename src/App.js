import React, { useState } from "react";
const api = {
  key: "b984ba3a8f27a415ad58bf0046cc0dd2",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?zip=${query}&units=imperial&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();

    return `${date} ${month} ${year} ${hour}:${min}:${sec}`;
  };
  return (
    <div className="app">
      <main>
        <div className="inputbox">
        <input type="text" className="inputbar" placeholder="Enter Zipcode for weather data" onChange={(e) => setQuery(e.target.value)}
        value={query} onKeyPress={search} />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="container1">
            <div className="city">{weather.name}</div>
            
          </div>
            <div className="weather-container">
              <div className="temp"> {Math.round(weather.main.temp)} <span>°F</span></div>
              <div className="icon">
                <img className="weather-icon"
                  src={"https://openweathermap.org/img/wn/" + weather.weather[0].icon +".png"}
                  alt={weather.weather[0].main}
                />
              </div>
              <div className="weather-condition">{weather.weather[0].main}</div>
              <div className="hi-lo">
                {Math.round(weather.main.temp_min)}°F | 
                {Math.round(weather.main.temp_max)}°F
              </div>
              <div className="humidity"> Humidity: {weather.main.humidity}%</div>
              <div className="feels"> Feels Like: {weather.main.feels_like} °F</div>
            </div>
          </div>
        ) : ("")}
      </main>
      <div className="date">{dateBuilder(new Date())}</div>
    </div>
    
  );
}

export default App;
