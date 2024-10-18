import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // This should get the API key from .env
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching weather data: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
