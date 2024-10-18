import React, { useState, useEffect } from "react";
import { getWeatherData } from "./api/weatherApi";
import { useWeatherRollup } from "./hooks/useWeatherRollup";
import TemperatureChart from "./components/TemperatureChart";
import "./App.css";

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(""); // State for user input city
  const [inputCity, setInputCity] = useState(""); // State to store the input city
  const dailySummary = useWeatherRollup(weatherData);

  const fetchWeather = async (city) => {
    try {
      const data = await getWeatherData(city);
      setWeatherData([data]); // Update state with new weather data
    } catch (err) {
      setError("Error fetching weather data for " + city);
    }
  };

  // Fetch weather data every 5 minutes for default cities
  useEffect(() => {
    const defaultCities = [
      "Delhi",
      "Mumbai",

      "Bangalore",
      "Kolkata",
      "Hyderabad",
    ];
    const fetchDefaultWeather = async () => {
      const dataPromises = defaultCities.map((city) => getWeatherData(city));
      const results = await Promise.all(dataPromises);
      setWeatherData(results);
    };

    fetchDefaultWeather();
    const interval = setInterval(fetchDefaultWeather, 300000); // 5 mins
    return () => clearInterval(interval);
  }, []);

  const handleCityChange = (e) => {
    setInputCity(e.target.value); // Update input city
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    fetchWeather(inputCity); // Fetch weather for the input city
    setCity(""); // Clear input after submission
  };

  if (error) return <p>{error}</p>;

  const temperatures = weatherData.map((data) => data.main.temp);

  return (
    <div className="App">
      <h1>Real-Time Weather Monitoring</h1>

      {/* Input form for city */}
      <form onSubmit={handleCitySubmit}>
        <input
          type="text"
          value={inputCity}
          onChange={handleCityChange}
          placeholder="Enter city name"
          required
        />
        <button type="submit">Fetch Weather</button>
      </form>

      <div className="city-container">
        {weatherData.map((data, index) => (
          <div key={index} className="city-weather">
            <h2>{data.name}</h2>
            <p>Temperature: {data.main.temp} °C</p>
            <p>Feels Like: {data.main.feels_like} °C</p>
            <p>Main Condition: {data.weather[0].main}</p>
          </div>
        ))}
      </div>

      {dailySummary && (
        <div className="daily-summary">
          <h2>Daily Summary</h2>
          <p>Average Temperature: {dailySummary.avgTemp.toFixed(2)} °C</p>
          <p>Max Temperature: {dailySummary.maxTemp.toFixed(2)} °C</p>
          <p>Min Temperature: {dailySummary.minTemp.toFixed(2)} °C</p>
          <p>Dominant Condition: {dailySummary.dominantCondition}</p>
        </div>
      )}

      <TemperatureChart temperatures={temperatures} />

      {/* Alerting */}
      {dailySummary && dailySummary.maxTemp > 35 && (
        <div className="alert">
          <p>Alert: Temperature exceeded 35°C!</p>
        </div>
      )}
    </div>
  );
};

export default App;
