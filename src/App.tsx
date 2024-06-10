import React, { useEffect } from 'react';
import './App.css';
import SendMessage from './Input';
import { useCallback, useState } from 'react';

const tg = window.Telegram.WebApp;

function parseQueryString(queryString: string) {
  const params = new URLSearchParams(queryString);
  
  const queryId = params.get('query_id');
  const user = JSON.parse(decodeURIComponent(params.get('user')!));
  const authDate = params.get('auth_date');
  const hash = params.get('hash');


  return { queryId, user, authDate, hash };
}

function App() {
  const [text] = useState('');
  const queryId = tg.initDataUnsafe.query_id
  const onSendData = useCallback(() => {
    const data = {
        queryId,
        text
    }

    fetch('http://83.8.130.218:7777/send', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data)
          })
  }, [queryId, text]
  )

  useEffect(() => {
    tg.ready()
    tg.expand()
    console.log(parseQueryString(tg.initData))
  }, [])

  return (
    <div className="App">
      <SendMessage onClick={onSendData}/>
    </div>
  );
}





export default App;
