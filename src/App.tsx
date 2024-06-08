import React, { useEffect } from 'react';
import './App.css';
import SendMessage from './Input';

const tg = window.Telegram.WebApp;

const handleSend = (text: string) => {
  // Assuming your backend URL is set up to receive the data

  sendMessage("test")

  
};


function App() {
  useEffect(() => {
    tg.ready()
    tg.expand()
    console.log(tg.initData)
  }, [])

  return (
    <div className="App">
      <SendMessage onClick={handleSend}/>
    </div>
  );
}


interface ApiRequestData {
  [key: string]: any;
}

function apiRequest(
  method: string,
  data: ApiRequestData,
  onOk: () => void,
  onEroor: () => void
): void {


  const authData = tg.initData || '';
  fetch('/demo/api', {
      method: 'POST',
      body: JSON.stringify(Object.assign(data, {
          _auth: authData,
          method: method,
      })),
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
      .then(result => onOk()) // Assuming success callback takes result
      .catch(error => onEroor());
}

function sendMessage(msg_id?: string, with_webview: boolean = false): void {
  if (!tg.initDataUnsafe.query_id) {
      alert('WebViewQueryId not defined');
      return;
  }

  document.querySelectorAll('button').forEach((btn) => {
      (btn as HTMLButtonElement).disabled = true;
  });


  apiRequest(
      'sendMessage',
      {
          msg_id: msg_id || '',
          with_webview: !tg.initDataUnsafe.receiver && with_webview ? 1 : 0,
      },
      function () {
        document.querySelectorAll('button').forEach((btn) => {
          (btn as HTMLButtonElement).disabled = false;
      });
        alert("Sent!") 
      },
      function() {
        alert('Unknown error');
      }
  );
}



export default App;
