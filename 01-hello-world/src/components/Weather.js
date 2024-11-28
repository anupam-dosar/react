import { useEffect, useState } from "react";
import "../weather.css";

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

function formatDay(dateStr) {
  if (new Date().toDateString() === new Date(dateStr).toDateString()) return "Today";
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default function Weather() {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState("Unnao");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function getWeather(location) {
      setIsLoading(true);
      try {
        // 1) Getting location (geocoding)
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
          { signal: controller.signal }
        );
        const geoData = await geoRes.json();
        // console.log(geoData);

        if (!geoData.results) throw new Error("Location not found");

        const { latitude, longitude, timezone, name, country_code } = geoData.results.at(0);
        // console.log(`${name} ${convertToFlag(country_code)}`);

        // 2) Getting actual weather
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );
        const weatherData = await weatherRes.json();
        // console.log(weatherData.daily);
        setWeatherData({ weather: weatherData.daily, location: geoData.results.at(0) });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
        setWeatherData(null);
      } finally {
        setIsLoading(false);
      }
    }

    if (location.length > 2) {
      getWeather(location);
    }

    return () => controller.abort();
  }, [location]);

  return (
    <>
      <h1>Weather</h1>
      <div>
        <input
          type="text"
          placeholder="Search by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div className="loader">retrieving weather data..</div>
      ) : (
        weatherData && (
          <>
            <h2>
              Weather for {location}, {weatherData.location.country}{" "}
              {convertToFlag(weatherData.location.country_code)}
            </h2>
            <div className="weather">
              {weatherData.weather.time.map((date, i) => (
                <WDay weatherData={weatherData.weather} index={i} key={date} />
              ))}
            </div>
          </>
        )
      )}
    </>
  );
}

function WDay({ weatherData, index }) {
  return (
    <div className="day">
      <span>{getWeatherIcon(weatherData.weathercode[index])}</span>
      <p>{formatDay(weatherData.time[index])}</p>
      <p>
        {weatherData.temperature_2m_min[index]}&deg; -{" "}
        <strong>{weatherData.temperature_2m_max[index]}&deg;</strong>
      </p>
    </div>
  );
}
