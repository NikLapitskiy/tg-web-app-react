import React from 'react';
import MenuItem from './MenuItem';

const MenuItems = ({ menuItems, cart, onAddToCart, onRemoveFromCart }) => {
  return (
    <div className="menu-items">
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          quantity={cart[item.id] || 0} // Передаем текущее количество товара
        />
      ))}
    </div>
  );
};

export default MenuItems;