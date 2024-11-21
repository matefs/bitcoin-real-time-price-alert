// filename: components/RealTimeBitcoinChart.js

import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';

const playDingAudio = () => {
  const audio = new Audio('../public/ding.mp3');
  audio.play().catch(error => {
    console.error('Error playing audio:', error);
  });
};

const RealTimeBitcoinChart = () => {
  const [priceHistory, setPriceHistory] = useState([]);
  const canPlayAudio = useRef(true); // Controle para evitar tocar o som repetidamente
  const audioCooldown = useRef(null); // Referência ao temporizador de cooldown

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const btcPriceUSD = parseFloat(data.p);

       if (btcPriceUSD <= 99000 && canPlayAudio.current) {
        playDingAudio();
        canPlayAudio.current = false;

        let tenSecondsInMiliseconds = 10000
        audioCooldown.current = setTimeout(() => {
          canPlayAudio.current = true;
        }, tenSecondsInMiliseconds );  
      }

      setPriceHistory((prevPrices) => {
        const newPrices = [...prevPrices, btcPriceUSD];
        if (newPrices.length > 10000) {
          newPrices.shift(); 
        }
        return newPrices;
      });

      console.log('Bitcoin pricing in USD (WebSocket):', btcPriceUSD);
    };

    return () => {
      socket.close();
      if (audioCooldown.current) {
        clearTimeout(audioCooldown.current); // Limpa o temporizador ao desmontar o componente
      }
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
          line: { color: 'orange', shape: 'spline' }, // Linhas arredondadas
        },
      ]}
      layout={{
        title: 'Bitcoin Price (USD)',
        xaxis: { title: 'Time (miliseconds)' },
        yaxis: { title: 'Price (USD)' },
      }}
    />
  );
};

export default RealTimeBitcoinChart;
