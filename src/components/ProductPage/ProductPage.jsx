import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const ProductPage = ({ onAddToCart }) => {
  const { id } = useParams(); // Получаем id товара из URL
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/menu/${id}`); // Получаем данные о товаре по id
        const data = await response.data;
        setItem(data);
      } catch (error) {
        console.error('Ошибка при загрузке товара:', error);
      }
    };

    fetchItem();
  }, {});

  if (!item) {
    return <div>Загрузка...</div>; // Показать загрузку, пока данные не загружены
  }

  return (
    <div className="product-page">
      <h1>{item.menu_id}</h1>
      <h1>{item.item_name}</h1>
      <span>{item.price} ₽</span>
      <button onClick={() => onAddToCart(item)}>Добавить в корзину</button>
    </div>
  );
};

export default ProductPage;