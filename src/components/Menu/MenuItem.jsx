import React from 'react';

const MenuItem = ({ item, onAddToCart, onRemoveFromCart, quantity }) => {
  return (
    <div className="menu-item">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <span>{item.price} ₽</span>
      <div className="item-controls">
        <button onClick={() => onRemoveFromCart(item)}>-</button>
        <span>{quantity || 0}</span>
        <button onClick={() => onAddToCart(item)}>+</button>
      </div>
    </div>
  );
};

export default MenuItem;