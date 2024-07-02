
import React from 'react';
import './Item.css'; // Assuming you want to add some custom styles
import { useTonConnectUI } from '@tonconnect/ui-react';

const transaction = {
    messages: [
        {
            address: "0:d8aa56f70aee4b65eba778619730cd8e97d79b060750c4870ba3cfdbe9d91e73", 
            amount: "2000000000",
        }
    ], validUntil: Date.now() + 1000 * 60 * 5

}

export interface ItemProps {
  title: string;
  price: number;
  image: string;
}

const Item: React.FC<ItemProps> = ({ title, price, image }) => {
  const [tonConnectUI] = useTonConnectUI();
  return (
    <div className="item">
      <img src={image} alt={title} className="item-image" />
      <h2 className="item-title">{title}</h2>
      <p className="item-price">${price.toFixed(2)}</p>
      <button onClick={() => tonConnectUI.sendTransaction(transaction)}>Buy</button>
    </div>
  );
};

export default Item;