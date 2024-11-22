import React from 'react';
import {Link} from 'react-router-dom';
import MenuItem from './MenuItem';

const MenuItems = ({ menuItems, onAddToCart }) => {
  return (
    <div className="menu-items">
      {menuItems.map((item) => (
        <Link to={`/product/${item.menu_id}`} key={item.menu_id}>
            <MenuItem
              item={item}
              onAddToCart={onAddToCart}
            />
        </Link>
      ))}
    </div>
  );
};

export default MenuItems;