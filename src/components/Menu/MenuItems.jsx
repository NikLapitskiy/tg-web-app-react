import React from 'react';
import MenuItem from './MenuItem';

const MenuItems = ({ menuItems, onAddToCart }) => {
  return (
    <div className="menu-items">
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default MenuItems;