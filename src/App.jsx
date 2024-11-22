// filename: components/BitcoinPrice.js

import React, { useState, useEffect } from 'react';
import RealTimeBitcoinChart from './RealTimeBitcoinChart';
import BitcoinChart from './BitcoinChart';

const BitcoinPrice = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula um carregamento de 2 segundos antes de mostrar os gráficos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, []);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <h3>Real-time Bitcoin Price History (USD)</h3>
      <RealTimeBitcoinChart />
      <h3>Closed Day Price History (USD)</h3>
      <BitcoinChart />

    </div>
  );
};

export default BitcoinPrice;
