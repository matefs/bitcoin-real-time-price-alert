// filename: components/RealTimeBitcoinChart.js

import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const playDingAudio = () => {
  // const audio = new Audio('../public/ding.mp3');
  // audio.play().catch(error => {
  //   console.error('Error playing audio:', error);
  // });
}

const RealTimeBitcoinChart = () => {
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const btcPriceUSD = parseFloat(data.p);
      if (btcPriceUSD <= 58000) {
        playDingAudio();
      }

      setPriceHistory((prevPrices) => {
        const newPrices = [...prevPrices, btcPriceUSD];
        if (newPrices.length > 5) {
          newPrices.shift();
        }
        return newPrices;
      });

      console.log('Bitcoin pricing in USD (WebSocket):', btcPriceUSD);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <Plot
      data={[
        {
          x: priceHistory.map((_, index) => index + 1),
          y: priceHistory,
          type: 'scatter',
          mode: 'lines',
          line: { color: 'orange', shape: 'spline' }, // Adicionando shape: 'spline' para linhas arredondadas
        },
      ]}
      layout={{
        title: 'Bitcoin Price (USD)',
        xaxis: { title: 'Time (seconds)' },
        yaxis: { title: 'Price (USD)' },
      }}
    />
  );
};

export default RealTimeBitcoinChart;
