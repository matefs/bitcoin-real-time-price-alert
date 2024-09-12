import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import BitcoinChart from './BitcoinChart'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const playDingAudio = () => {
  // const audio = new Audio('../public/ding.mp3');
  // audio.play().catch(error => {
  //   console.error('Error playing audio:', error);
  // });  
}

const BitcoinPrice = () => {
  const [priceHistory, setPriceHistory] = useState([]);
 
  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const btcPriceUSD = parseFloat(data.p);
      btcPriceUSD <=  58000  ? playDingAudio() : null
      
      setPriceHistory((prevPrices) => {
        const newPrices = [...prevPrices, btcPriceUSD];
        if (newPrices.length > 10) {
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

  const chartData = {
    labels: priceHistory.map((_, index) => index + 1), // Labels for the x-axis
    datasets: [
      {
        label: 'Bitcoin Price (USD)',
        data: priceHistory,
        fill: false,
        borderColor: 'rgba(255, 165, 0, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>  
      <h3 style={{ textAlign: 'center' }}>Real time Bitcoin Price History (USD)</h3>
      <Line data={chartData} /> {/* Render the chart */}
      <h3 style={{ textAlign: 'center' }}>Closed day Price History (USD)</h3>
      <BitcoinChart /> 
    </div>
  );
};

export default BitcoinPrice;