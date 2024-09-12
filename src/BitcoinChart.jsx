import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment';

function BitcoinChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(response => response.json())
      .then(data => {
        const dates = Object.keys(data.bpi).map(date => moment(date).format('MMM D, YYYY'));
        const prices = Object.values(data.bpi);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Bitcoin Price',
              data: prices,
              borderColor: 'rgba(255, 165, 0, 1)',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (chartData.labels.length > 0) {
      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: false,
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div>
      <canvas id="myChart" width="400" height="200"></canvas>
    </div>
  );
}

export default BitcoinChart;
