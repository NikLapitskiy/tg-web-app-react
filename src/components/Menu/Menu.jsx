import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Menu.css';
import MenuCategories from './MenuCategories';
import MenuFilters from './MenuFilters';
import MenuItems from './MenuItems';
import OrderButton from './OrderButton';
import { useTelegram } from '../../hooks/useTelegram';

const API_BASE_URL = 'http://localhost:8000';

const Menu = () => {
  const [menuCategories, setMenuCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const { tg } = useTelegram();

  // Загрузка категорий
  useEffect(() => {
    const fetchMenuCategories = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/categories`);
            const data = await response.data; // Получаем данные из ответа
            setMenuCategories(data); // Обновляем состояние компонента
        } catch (error) {
            console.error('Ошибка при загрузке категорий:', error);
        }
    };
    fetchMenuCategories();
  }, []);

  // Загрузка товаров
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/menu`);
        const data = await response.data;
        setMenuItems(data);
      } catch (error) {
        console.error('Ошибка при загрузке меню:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="menu">
      <MenuCategories menuCategories={menuCategories} />
      <MenuItems menuItems={menuItems} />
    </div>
  );
};

export default Menu;

// const getTotalPrice = (items = []) => {
//   return items.reduce((acc, item) => {
//     return acc += item.price
//   }, 0)
// }

// const Menu = () => {
//   const [addedItems, setAddedItems] = useState([]);
//   const [menuCategories, setMenuCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [menuItems, setMenuItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const [sortBy, setSortBy] = useState('name');
//   const [cart, setCart] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
  
//   const { tg } = useTelegram();

//   // Загрузка категорий
//   useEffect(() => {
//     const fetchMenuCategories = async () => {
//         try {
//             const response = await axios.get(`${API_BASE_URL}/categories`);
//             const data = await response.data; // Получаем данные из ответа
//             setMenuCategories(data); // Обновляем состояние компонента
//         } catch (error) {
//             console.error('Ошибка при загрузке категорий:', error);
//         }
//     };
//     fetchMenuCategories();
//   }, []);

//   // Загрузка товаров в зависимости от выбранной категории
//   useEffect(() => {
//       const fetchMenuItems = async () => {
//           if (!selectedCategory){
//             console.log(selectedCategory);
//             return;
//           }
           
//           try {
//               console.log(selectedCategory)
//               const response = await axios.get(`${API_BASE_URL}/menu/category?category=${selectedCategory}`);
//               setMenuItems(response.data);
//               setFilteredItems(response.data);
//           } catch (error) {
//               console.error('Ошибка при загрузке меню:', error);
//           }
//       };

//       fetchMenuItems();
//   }, [selectedCategory]);

//   // Фильтрация и сортировка товаров
//   useEffect(() => {
//       const filteredAndSortedItems = menuItems
//           .filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
//           .sort((a, b) => (sortBy === 'price' ? a.price - b.price : a.name.localeCompare(b.name)));
      
//       setFilteredItems(filteredAndSortedItems);
//   }, [searchText, sortBy, menuItems]);

//   // Подсчет общей стоимости в корзине
//   useEffect(() => {
//       const total = cart.reduce((acc, item) => acc + item.price, 0);
//       setTotalPrice(total);
//   }, [cart]);

//   // Добавление товара в корзину
//   const handleAddToCart = (item) => {
//       setCart([...cart, item]);
//   };

//   return (
//       <div className="menu">
//           <MenuCategories 
//               menuCategories={menuCategories} 
//               selectedCategory={selectedCategory} 
//               setSelectedCategory={setSelectedCategory} 
//           />
//           <MenuFilters 
//               searchText={searchText} 
//               setSearchText={setSearchText} 
//               sortBy={sortBy} 
//               setSortBy={setSortBy} 
//           />
//           <MenuItems filteredItems={filteredItems} handleAddToCart={handleAddToCart} />
//           <OrderButton totalPrice={totalPrice} cart={cart} />
//       </div>
//   );
// };

// export default Menu;