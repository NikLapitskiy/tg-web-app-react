import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Menu.css';
import MenuCategories from './MenuCategories';
// import MenuFilters from './MenuFilters';
import MenuItems from './MenuItems';
// import OrderButton from './OrderButton';
import { useTelegram } from '../../hooks/useTelegram';
import Navbar from '../Navbar/Navbar';

const API_BASE_URL = 'http://localhost:8000';

const Menu = () => {
  const [allMenuItems, setAllMenuItems] = useState([]); // Состояние для всех товаров
  const [menuItems, setMenuItems] = useState([]); // Состояние для текущих товаров
  const [menuCategories, setMenuCategories] = useState([]); // Состояние для категорий
  const [selectedCategory, setSelectedCategory] = useState(null); // Состояние для выбранной категории
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' или 'desc'
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/menu`);
        const data = await response.data;
        setAllMenuItems(data);
        setMenuItems(data);
      } catch (error) {
        console.error('Ошибка при загрузке меню:', error);
      }
    };

    const fetchMenuCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        const categories = await response.data;
        setMenuCategories(categories);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    };

    fetchMenuItems();
    fetchMenuCategories();
  }, []);

  const sortItems = (items, order) => {
    return items.sort((a, b) => {
        if (order === 'asc') {
            return a.price - b.price; // Сортировка по возрастанию
        } else {
            return b.price - a.price; // Сортировка по убыванию
        }
    });
};

const filterItems = (category, min, max) => {
  let filteredItems = allMenuItems;

    // Фильтрация по категории
    if (category) {
        filteredItems = filteredItems.filter(item => item.category_id === category.id);
    }

    // Фильтрация по цене
    filteredItems = filteredItems.filter(item => {
        const price = parseFloat(item.price);
        const minPrice = parseFloat(min) || 0; // Убедитесь, что minPrice — число
        const maxPrice = parseFloat(max) || filteredItems.price.max(); // Убедитесь, что maxPrice — число
        return price >= minPrice && price <= maxPrice;
    });

    // Фильтрация по поисковому запросу
    if (searchQuery) {
        filteredItems = filteredItems.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    setMenuItems(sortItems(filteredItems, sortOrder))
};

  const handleCategoryClick = (category) => {
    console.log('Выбранная категория:', category);
    setSelectedCategory(category);
    if (category) {
      const filteredItems = allMenuItems.filter(item => item.category_id === category.category_id);
      setMenuItems(filteredItems); // Фильтруем товары по выбранной категории
    } else {
      setMenuItems(allMenuItems); // Если категория не выбрана, показываем все товары
    }
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    setMenuItems(sortItems([...menuItems], order)); // Сортируем текущие товары
};

const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);

  return (
    <div className="menu">
        <button className="open-modal-button" onClick={openModal}>
            Открыть настройки
        </button>

        {isModalOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Поиск по товарам..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                filterItems(selectedCategory, minPrice, maxPrice);
                            }}
                        />
                    </div>

                    <div className="price-filter">
                        <label>
                            Минимальная цена:
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => {
                                    setMinPrice(e.target.value);
                                    filterItems(selectedCategory, e.target.value, maxPrice);
                                }}
                            />
                        </label>
                        <label>
                            Максимальная цена:
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => {
                                    setMaxPrice(e.target.value);
                                    filterItems(selectedCategory, minPrice, e.target.value);
                                }}
                            />
                        </label>
                    </div>

                    <div className="sort-options">
                        <label>
                            Сортировать по цене:
                            <select onChange={(e) => handleSortOrderChange(e.target.value)} value={sortOrder}>
                                <option value="asc">По возрастанию</option>
                                <option value="desc">По убыванию</option>
                            </select>
                        </label>
                    </div>
                </div>
            </div>
        )}

        <MenuCategories menuCategories={menuCategories} onCategoryClick={handleCategoryClick} />
        <MenuItems menuItems={menuItems} />
        <Navbar />
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