import React, { useEffect } from 'react';
import './App.css';
import Item, { ItemProps } from './Item';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';

import { Buffer } from 'buffer'; if (!window.Buffer) {   window.Buffer = Buffer; } 

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

  const getItems = (): ItemProps[] => {
    return [
      {
        title: 'Sample Item 1',
        price: 29.99,
        image: 'https://i.imgur.com/RriuMjK.png'
      },
      {
        title: 'Sample Item 2',
        price: 49.99,
        image: 'https://i.imgur.com/RriuMjK.png'
      },
      {
        title: 'Sample Item 3',
        price: 19.99,
        image: 'https://i.imgur.com/RriuMjK.png'
      }
    ];
  };

  
  useEffect(() => {
    tg.ready()
    tg.expand()
    console.log(parseQueryString(tg.initData))
  }, [])

  const items: ItemProps[] = getItems();

  return (
    <div className="App">
      <TonConnectUIProvider manifestUrl="https://master--tranquil-selkie-6cdd3c.netlify.app/tonconnect-manifest.json">
        <center><TonConnectButton/></center>
          {items.map((item, index) => (
            <Item key={index} title={item.title} price={item.price} image={item.image} />
          ))}
          <Item title='Test' price={90} image='https://i.imgur.com/RriuMjK.png'/>
          
      </TonConnectUIProvider>
      

    </div>
  );
}

export default App;
