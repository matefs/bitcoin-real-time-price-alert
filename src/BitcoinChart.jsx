import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import moment from 'moment';

function BitcoinChart() {
  const [chartData, setChartData] = useState({ dates: [], prices: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coindesk.com/v1/bpi/historical/close.json?start=2010-07-17&end=2024-11-04'
        );
        const data = await response.json();
        const dates = Object.keys(data.bpi).map(date =>
          moment(date).format('MMM D, YYYY')
        );
        const prices = Object.values(data.bpi);
        setChartData({ dates, prices });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
