import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuCategories from './MenuCategories';
import MenuFilters from './MenuFilters';
import MenuItems from './MenuItems';
import OrderModal from './OrderButton';
import OrderButton from './OrderButton';

const API_BASE_URL = 'https://your-api.com/';

const Menu = () => {
    const [menuCategories, setMenuCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
  
    useEffect(() => {
      const fetchMenuCategories = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/categories`);
          setMenuCategories(response.data);
        } catch (error) {
          console.error('Ошибка при загрузке категорий:', error);
        }
      };
      fetchMenuCategories();
    }, []);
  
    useEffect(() => {
      const fetchMenuItems = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/menu?category=${selectedCategory}`);
          setMenuItems(response.data);
          setFilteredItems(response.data);
        } catch (error) {
          console.error('Ошибка при загрузке меню:', error);
        }
      };
  
      if (selectedCategory) {
        fetchMenuItems();
      }
    }, [selectedCategory]);
  
    useEffect(() => {
      const filteredAndSortedItems = menuItems
        .filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
        .sort((a, b) => (sortBy === 'price' ? a.price - b.price : a.name.localeCompare(b.name)));
      
      setFilteredItems(filteredAndSortedItems);
    }, [searchText, sortBy, menuItems]);
  
    useEffect(() => {
      const total = cart.reduce((acc, item) => acc + item.price, 0);
      setTotalPrice(total);
    }, [cart]);
  
    const handleAddToCart = (item) => {
      setCart([...cart, item]);
    };
  
    return (
      <div className="menu">
        <MenuCategories 
          menuCategories={menuCategories} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
        <MenuFilters 
          searchText={searchText} 
          setSearchText={setSearchText} 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
        />
        <MenuItems filteredItems={filteredItems} handleAddToCart={handleAddToCart} />
        <OrderButton totalPrice={totalPrice} cart={cart} />
      </div>
    );
  };
  
  export default Menu;