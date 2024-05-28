import { useState } from "react";

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

export default function App() {
  const [location, setLocation] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState(null);

  async function getWeather() {
    if (location === "") {
      return;
    }
    setIsLoading(true);

    try {
      // 1. Getting the coordinates points for the place
      const all_weathers = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const data = await all_weathers.json();
      const { latitude, longitude, timezone, name, country_code } =
        data.results.at(0);

      setPlaceName(`${name} ${convertToFlag(country_code)}`);

      // 2. Now getting actual data

      let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min`;
      if (timezone) {
        url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=${timezone}`;
      }
      const weatherReport = await fetch(url);

      const geoWeatherReport = await weatherReport.json();
      setWeather(geoWeatherReport.daily);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      ></input>
      <button onClick={getWeather}>Get Weather</button>

      {isLoading && <p>Loading...</p>}
      {weather && <Weather weather={weather} placeName={placeName} />}
    </div>
  );
}

function Weather({ weather, placeName }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

  return (
    <div>
      <h2>Weather {placeName}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <Day
            date={date}
            max={max.at(i)}
            min={min.at(i)}
            code={codes.at(i)}
            key={date}
            today={i === 0}
          />
        ))}
      </ul>
    </div>
  );
}

function Day({ date, max, min, code, today }) {
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{today ? "today" : formatDay(date)}</p>
      <p>
        {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
      </p>
    </li>
  );
}
