import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductPage = ({ onAddToCart }) => {
  const { id } = useParams(); // Получаем id товара из URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/menu/${id}`); // Получаем данные о товаре по id
        setProduct(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке товара:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Загрузка...</div>; // Показать загрузку, пока данные не загружены
  }

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <span>{product.price} ₽</span>
      {product.image && <img src={product.image} alt={product.name} />}
      <button onClick={() => onAddToCart(product)}>Добавить в корзину</button>
    </div>
  );
};

export default ProductPage;