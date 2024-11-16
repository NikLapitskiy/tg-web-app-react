import React from 'react';

const MenuCategories = ({ menuCategories, selectedCategory, setSelectedCategory }) => {
    return (
      <div className="menu-categories">
        {menuCategories.map(category => (
          <button
            key={category.id}
            className={selectedCategory === category.id ? 'active' : ''}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    );
  };
  
  export default MenuCategories;