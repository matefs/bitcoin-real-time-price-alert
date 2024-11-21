// filename: components/RealTimeBitcoinChart.js

import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js'; 

const playDingAudio = () => {
  const audio = new Audio('../public/ding.mp3');
  audio.play().catch(error => {
    console.error('Error playing audio:', error);
  }); 

   if (Notification.permission === 'granted') {
    new Notification('Bitcoin Alert!', {
      body: 'Bitcoin price has dropped below the set minimum!',
      icon: '../public/notification-icon.png', // Adicione o caminho para um ícone, se necessário
    });
  } else if (Notification.permission !== 'denied') { 
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('Bitcoin Alert!', {
          body: 'Bitcoin price has dropped below the set minimum!',
          icon: '../public/notification-icon.png',
        });
      }
    });
  }

};

const RealTimeBitcoinChart = () => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [minPrice, setMinPrice] = useState(99000); // Estado inicial para o valor mínimo
  const [inputValue, setInputValue] = useState(99000); // Estado para controlar o valor do input
  const canPlayAudio = useRef(true); // Controle para evitar tocar o som repetidamente
  const audioCooldown = useRef(null); // Referência ao temporizador de cooldown

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const btcPriceUSD = parseFloat(data.p);

      // Toca o som se o preço estiver abaixo ou igual ao mínimo e o cooldown permitir
      if (btcPriceUSD <= minPrice && canPlayAudio.current) {
        playDingAudio();
        canPlayAudio.current = false;

        const tenSecondsInMilliseconds = 10000;
        audioCooldown.current = setTimeout(() => {
          canPlayAudio.current = true;
        }, tenSecondsInMilliseconds);
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
  }, [minPrice]); // Atualiza o WebSocket ao mudar o valor mínimo

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Atualiza o valor do input
  };

  const handleSetMinPrice = () => {
    setMinPrice(parseFloat(inputValue)); // Define o valor mínimo ao clicar no botão
  };

  return (
    <div>
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
      <div
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  }}
>
  <input
    type="number"
    value={inputValue}
    onChange={handleInputChange}
    placeholder="Set minimum USD price"
    style={{
      padding: '8px 12px',
      fontSize: '16px',
      border: '2px solid #ccc',
      borderRadius: '4px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    }}
    onFocus={(e) => (e.target.style.borderColor = '#ff9900')}
    onBlur={(e) => (e.target.style.borderColor = '#ccc')}
  />
  <button
    onClick={handleSetMinPrice}
    style={{
      padding: '8px 16px',
      fontSize: '16px',
      fontWeight: 'bold',
      backgroundColor: '#ff9900',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = '#cc7a00')}
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#ff9900')}
    onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
    onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
  >
    Set Minimum Notification Price
  </button>
</div>

    </div>
  );
};

export default RealTimeBitcoinChart;
