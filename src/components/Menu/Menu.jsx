import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './Menu.css';
import MenuCategories from './MenuCategories';
import MenuItems from './MenuItems';
import OrderButton from './OrderButton';
// import { useTelegram } from '../../hooks/useTelegram';
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
  const [cart, setCart] = useState({});

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
        const maxPrice = parseFloat(max) || Infinity; // Убедитесь, что maxPrice — число
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
      <div className='menu-header'>
      <div className="open-modal-button" onClick={openModal}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>
    </div>

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
                                const value = e.target.value ? parseFloat(e.target.value) : 0;
                                setMinPrice(value);
                                filterItems(selectedCategory, value, maxPrice);
                            }}
                        />
                    </label>
                    <label>
                        Максимальная цена:
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => {
                                const value = e.target.value ? parseFloat(e.target.value) : Infinity;
                                setMaxPrice(value);
                                filterItems(selectedCategory, minPrice, value);
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
      </div>
    
      <MenuItems
              menuItems={menuItems}
              cart={cart}
            />
            <Navbar />
      </div>
        );
      };

export default Menu;