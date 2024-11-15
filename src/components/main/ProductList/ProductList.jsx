import React from 'react';
import './ProductList.css';

const ProductList = ({ products }) => {
    return (
        <div>
            {products.map((product) => (
                <div key={product.menu_id}>
                    <h2>{product.item_name}</h2>
                    <p>{product.description}</p>
                    <p>Цена: {product.price}₽</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;