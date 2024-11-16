import React from 'react';
import MenuItem from './MenuItem';

const MenuItems = ({ filteredItems, handleAddToCart }) => {
    return (
      <div className="menu-items">
        {filteredItems.map(item => (
          <MenuItem key={item.id} item={item} handleAddToCart={handleAddToCart} />
        ))}
      </div>
    );
  };
  
  export default MenuItems;