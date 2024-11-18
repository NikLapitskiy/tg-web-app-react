import React from 'react';

const OrderButton = ({ onMakeOrder, totalPrice }) => {
    return (
      <div className="order-button">
        <button onClick={onMakeOrder}>
          Сделать заказ ({totalPrice} ₽)
        </button>
      </div>
    );
  };

export default OrderButton;