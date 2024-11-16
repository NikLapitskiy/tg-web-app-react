import React from 'react';

const MenuCategories = ({ menuCategories }) => {
  return (
    <div className="menu-categories">
      {menuCategories.map((category) => (
        <button key={category.id} className="category-button">
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default MenuCategories;




// import React from 'react';

// const MenuCategories = ({ menuCategories, selectedCategory, setSelectedCategory }) => {
//     return (
//       <div className="menu-categories">
//         {menuCategories.map(category => (
//           <button
//             key={category.id}
//             className={selectedCategory === category.name ? 'active' : ''}
//             onClick={() => setSelectedCategory(category.name)}
//           >
//             {category.name}
//           </button>
//         ))}
//       </div>
//     );
//   };
  
//   export default MenuCategories;