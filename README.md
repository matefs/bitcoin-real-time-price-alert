
# Bitcoin Price Visualization with React and Plotly

This project visualizes Bitcoin's price history using React and Plotly, fetching data from the CoinDesk API.
![image](https://github.com/user-attachments/assets/07f43274-e39c-4fa5-9fd5-931fd9ed084e)


## Features

-   **Historical Price Chart**: Displays Bitcoin's closing prices  
    
-   **Real-Time Price Chart**: Shows live Bitcoin price updates.
    
-   **Transaction Statistics**: Provides key Bitcoin transaction metrics.
    

## Installation

1.  **Clone the repository**:
    `git clone https://github.com/matefs/bitcoin-real-time-price-alert.git` 
    
2.  **Navigate to the project directory**:
    
    `cd bitcoin-real-time-price-alert` 
    
3.  **Install dependencies**:
    `npm install` 
    

## Usage

Start the development server:

`npm start` 

Open http://localhost:3000 in your browser to view the application.

## Components

-   **BitcoinPrice**: Main component that renders the historical and real-time price charts along with transaction statistics.
    
-   **BitcoinChart**: Fetches and displays historical Bitcoin prices using Plotly.
    
-   **RealTimeBitcoinChart**: Displays real-time Bitcoin price updates.
    

## Data Sources

-   **CoinDesk API**: Provides historical Bitcoin price data.
    
-   **Real-Time Data Source**: Replace with your preferred real-time Bitcoin price API.
    

## Dependencies

-   **React**: JavaScript library for building user interfaces.
    
-   **Plotly.js**: Open-source graphing library for interactive charts.
    
-   **react-plotly.js**: React wrapper for Plotly.js.
    
-   **moment.js**: Library for parsing, validating, and formatting dates.
    

## License

This project is licensed under the MIT License.

## Acknowledgments

-   [CoinDesk](https://www.coindesk.com/) for providing Bitcoin price data.
    
-   [Plotly](https://plotly.com/) for the charting library.
    
-   [React](https://reactjs.org/) for the UI framework.
