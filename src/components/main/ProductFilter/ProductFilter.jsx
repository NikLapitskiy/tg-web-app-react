import React from 'react';
import './ProductFilter.css';

const ProductFilter = ({ filterText, setFilterText, sortBy, setSortBy }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Поиск..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">По имени</option>
                <option value="price">По цене</option>
            </select>
        </div>
    );
};

export default ProductFilter;