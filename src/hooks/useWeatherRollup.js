// src/hooks/useWeatherRollup.js

import { useState, useEffect } from "react";

const aggregateWeatherData = (weatherData) => {
  let maxTemp = -Infinity;
  let minTemp = Infinity;
  let totalTemp = 0;
  let count = 0;
  const weatherConditionCount = {};

  weatherData.forEach((data) => {
    const temp = data.main.temp;
    totalTemp += temp;
    count++;
    maxTemp = Math.max(maxTemp, temp);
    minTemp = Math.min(minTemp, temp);

    const condition = data.weather[0].main;
    weatherConditionCount[condition] =
      (weatherConditionCount[condition] || 0) + 1;
  });

  const dominantCondition = Object.keys(weatherConditionCount).reduce((a, b) =>
    weatherConditionCount[a] > weatherConditionCount[b] ? a : b
  );

  return {
    avgTemp: totalTemp / count,
    maxTemp,
    minTemp,
    dominantCondition,
  };
};

export const useWeatherRollup = (weatherData) => {
  const [dailySummary, setDailySummary] = useState(null);

  useEffect(() => {
    if (weatherData.length) {
      const summary = aggregateWeatherData(weatherData);
      setDailySummary(summary);
    }
  }, [weatherData]);

  return dailySummary;
};
