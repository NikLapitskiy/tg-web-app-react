import React from 'react';

const MenuItems = ({ menuItems }) => {
  return (
    <div className="menu-items">
      {menuItems.map((item) => (
        <div key={item.id} className="menu-item">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <span>{item.price} ₽</span>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;

// import React from 'react';
// import MenuItem from './MenuItem';

// const MenuItems = ({ filteredItems, handleAddToCart }) => {
//     return (
//       <div className="menu-items">
//         {filteredItems.map(item => (
//           <MenuItem key={item.id} item={item} handleAddToCart={handleAddToCart} />
//         ))}
//       </div>
//     );
//   };
  
//   export default MenuItems;