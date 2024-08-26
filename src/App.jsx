import React, { useState, useEffect } from 'react';

const BitcoinPrice = () => {
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(
      'wss://stream.binance.com:9443/ws/btcusdt@trade'
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const btcPriceUSD = parseFloat(data.p);

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

  return (
    <div>
      <h1>Bitcoin Price History (USD)</h1>
      <ul>
        {priceHistory.map((price, index) => (
          <li key={index}>${price.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default BitcoinPrice;
