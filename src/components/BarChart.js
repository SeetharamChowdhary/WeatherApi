// src/components/BarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ temperatures, cities }) => {
  const data = {
    labels: cities,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
        backgroundColor: "rgba(76, 175, 80, 0.5)", // Light green for bars
        borderColor: "rgba(76, 175, 80, 1)", // Dark green for borders
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Temperature Bar Graph</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
