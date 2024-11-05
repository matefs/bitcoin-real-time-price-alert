// filename: components/BitcoinChart.js

import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import moment from 'moment';

function BitcoinChart() {
  const [chartData, setChartData] = useState({ dates: [], prices: [] });

  useEffect(() => {
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(response => response.json())
      .then(data => {
        const dates = Object.keys(data.bpi).map(date => moment(date).format('MMM D, YYYY'));
        const prices = Object.values(data.bpi);

        setChartData({ dates, prices });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <Plot
        data={[
          {
            x: chartData.dates,
            y: chartData.prices,
            type: 'scatter',
            mode: 'lines',
            line: { color: 'orange' },
          },
        ]}
        layout={{
          title: 'Bitcoin Price History',
          xaxis: { title: 'Date' },
          yaxis: { title: 'Price (USD)' },
        }}
      />
    </div>
  );
}

export default BitcoinChart;
