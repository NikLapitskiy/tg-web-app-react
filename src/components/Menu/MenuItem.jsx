import React from 'react';

const MenuItem = ({ item, handleAddToCart }) => {
    return (
      <div className="menu-item">
        <img src={item.image} alt={item.name} />
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>Цена: {item.price} ₽</p>
        <button onClick={() => handleAddToCart(item)}>Добавить в корзину</button>
      </div>
    );
  };
  
  export default MenuItem;