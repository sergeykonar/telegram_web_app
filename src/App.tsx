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
  }, [])

  return (
    <div className="App">
      <SendMessage onClick={handleSend}/>
    </div>
  );
}


// Define the type for the response object
interface ApiResponse {
    response?: any;
    error?: any;
}

type ApiRequestCallback = (result: ApiResponse) => void;

function apiRequest(method: string, params: { [key: string]: any }, callback: ApiRequestCallback): void {
  // Simulate an asynchronous API request
  setTimeout(() => {
      // Simulate a successful response
      const result: ApiResponse = {
          response: {
              ok: true,
              description: "Message sent successfully!"
          }
      };

      // Invoke the callback function with the result
      callback(result);
  }, 1000); // Simulated delay of 1 second
}

function sendMessage(msg_id?: string, with_webview: boolean = false): void {
  if (!tg.initDataUnsafe.query_id) {
      alert('WebViewQueryId not defined');
      return;
  }

  document.querySelectorAll('button').forEach((btn) => {
      (btn as HTMLButtonElement).disabled = true;
  });

  const btn = document.querySelector('#btn_status') as HTMLButtonElement;
  btn.textContent = 'Sending...';

  apiRequest(
      'sendMessage',
      {
          msg_id: msg_id || '',
          with_webview: !tg.initDataUnsafe.receiver && with_webview ? 1 : 0,
      },
      function (result) {
          document.querySelectorAll('button').forEach((btn) => {
              (btn as HTMLButtonElement).disabled = false;
          });

          if (result.response) {
              if (result.response.ok) {
                  btn.textContent = 'Message sent successfully!';
                  btn.className = 'ok';
                  btn.style.display = 'block';
              } else {
                  btn.textContent = result.response.description;
                  btn.className = 'err';
                  btn.style.display = 'block';
                  alert(result.response.description);
              }
          } else if (result.error) {
              btn.textContent = result.error;
              btn.className = 'err';
              btn.style.display = 'block';
              alert(result.error);
          } else {
              btn.textContent = 'Unknown error';
              btn.className = 'err';
              btn.style.display = 'block';
              alert('Unknown error');
          }
      }
  );
}

export default App;
