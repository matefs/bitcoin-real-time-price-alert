// File: BitcoinChart.js
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import moment from 'moment';

function BitcoinChart() {
  const [chartData, setChartData] = useState({ dates: [], prices: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];

        // Fetch historical data
        const historicalResponse = await fetch(
          `https://api.coindesk.com/v1/bpi/historical/close.json?start=2010-07-17&end=${today}`
        );
        const historicalData = await historicalResponse.json();

        // Fetch current price data
        const currentPriceResponse = await fetch(
          'https://api.coindesk.com/v1/bpi/currentprice/USD.json'
        );
        const currentPriceData = await currentPriceResponse.json();
        const currentDate = moment().format('MMM D, YYYY');
        const currentPrice = currentPriceData.bpi.USD.rate_float;

        // Combine historical data with the current price
        const historicalDates = Object.keys(historicalData.bpi).map(date =>
          moment(date).format('MMM D, YYYY')
        );
        const historicalPrices = Object.values(historicalData.bpi);

        const dates = [...historicalDates, currentDate];
        const prices = [...historicalPrices, currentPrice];

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
