import React, { useEffect } from 'react';
import './App.css';
import SendMessage from './Input';

const tg = window.Telegram.WebApp;

const handleSend = (text: string) => {
  // Assuming your backend URL is set up to receive the data

  tg.sendData(text)
  // Replace with the actual chat ID
  
};


function App() {
  useEffect(() => {
    tg.ready()
    tg.expand()
  }, [])

  const onClose = () => {
    
  }
  return (
    <div className="App">
      <button onClick={onClose}>Test</button>
      <SendMessage onClick={handleSend}/>
    </div>
  );
}

export default App;
