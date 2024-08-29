import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BitcoinPrice = () => {
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {

  }, []);

  const chartData = {
    labels: priceHistory.map((_, index) => index + 1), // Labels for the x-axis
    datasets: [
      {
        label: 'Bitcoin Price (USD)',
        data: priceHistory,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h1>Real time Bitcoin Price History (USD)</h1>
      <Line data={chartData} /> {/* Render the chart */}
    </div>
  );
};

export default BitcoinPrice;