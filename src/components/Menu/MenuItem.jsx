import React, {useEffect, useCallback } from 'react';
import {useTelegram} from '../../hooks/useTelegram'


const MenuItem = ({ item}) => {
    const {tg, user} = useTelegram();

    const handleAddToCart = useCallback((item) => {
        const data = {
          menu_item: item,
          quantity: 1,
          user_id: tg.initDataUnsafe?.user.id || 1,
        };
    
        fetch('http://localhost:8000/menu/toCart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Ошибка при добавлении в корзину');
            }
            return response.json(); // Предполагается, что сервер возвращает JSON
          })
          .then((data) => {
            console.log('Товар добавлен в корзину:', data);
          })
          .catch((error) => {
            console.error('Ошибка:', error);
          });
      }, [tg]); // Убираем item из зависимостей, так как он передается как аргумент
    
      const onAddToCart = (item) => {
        handleAddToCart(item);
      };

  return (
    <div className="menu-item">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <span>{item.price} ₽</span>
      <div className="toCart">
        <button onClick={() => onAddToCart(item)}>Добавить в корзину</button>
      </div>
    </div>
  );
};

export default MenuItem;