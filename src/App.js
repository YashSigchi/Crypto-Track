import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header/Header';
import MarketStats from './components/MarketStats/MarketStats';
import CryptoTable from './components/CryptoTable/CryptoTable';
import Footer from './components/Footer/Footer';
import AuthInit from './components/Auth/AuthInit';
import WebSocketSimulator from './services/websocketSimulator';
import { store } from './redux/store';

// Initialize our WebSocket simulator with the Redux store
const wsSimulator = new WebSocketSimulator(store);

function App() {
  const isLightMode = useSelector(state => state.crypto.isLightMode);
  
  useEffect(() => {
    // Start the simulator when the app loads
    wsSimulator.connect();
    
    // Set initial theme
    document.body.classList.toggle('dark-mode', !isLightMode);
    
    // Cleanup on unmount
    return () => {
      wsSimulator.disconnect();
    };
  }, [isLightMode]); // Added isLightMode as dependency
  
  // Update theme when it changes
  useEffect(() => {
    document.body.classList.toggle('dark-mode', !isLightMode);
  }, [isLightMode]);
  
  return (
    <div className="App">
      <AuthInit />
      <Header />
      <div className="container">
        <MarketStats />
        <CryptoTable />
      </div>
      <Footer />
    </div>
  );
}

export default App;