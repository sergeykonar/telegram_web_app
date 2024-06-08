import React, { useEffect } from 'react';
import './App.css';

const tg = window.Telegram.WebApp;



function App() {
  useEffect(() => {
    tg.ready()
    tg.expand()
  }, [])

  const onClose = () => {
    tg.sendData("Test")
  }
  return (
    <div className="App">
      <button onClick={onClose}>Test</button>
    </div>
  );
}

export default App;
