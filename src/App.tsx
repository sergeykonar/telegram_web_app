import React, { useEffect } from 'react';
import './App.css';

const tg = window.Telegram.WebApp;



function App() {
  useEffect(() => {
    tg.ready()
  }, [])

  const onClose = () => {
    tg.sendData("T")
    tg.requestContact((success: boolean, response: RequestContactResponse) => {
      if (success) {
          console.log('Contact received:', response);
      } else {
          console.error('Failed to receive contact');
      }
  });
  }
  return (
    <div className="App">
      <button onClick={onClose}>Test</button>
    </div>
  );
}

export default App;
