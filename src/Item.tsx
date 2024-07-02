
import React from 'react';
import './Item.css'; // Assuming you want to add some custom styles
import { useTonConnectUI } from '@tonconnect/ui-react';

const transaction = {
    messages: [
        {
            address: "0:412410771DA82CBA306A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F", 
            amount: "20000000",
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