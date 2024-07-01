
import React from 'react';
import './Item.css'; // Assuming you want to add some custom styles

export interface ItemProps {
  title: string;
  price: number;
  image: string;
}

const Item: React.FC<ItemProps> = ({ title, price, image }) => {
  return (
    <div className="item">
      <img src={image} alt={title} className="item-image" />
      <h2 className="item-title">{title}</h2>
      <p className="item-price">${price.toFixed(2)}</p>
    </div>
  );
};

export default Item;