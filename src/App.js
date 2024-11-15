import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/main/Navbar/Navbar';
import ProductList from './components/main/ProductList/ProductList';
import ProductFilter from './components/main/ProductFilter/ProductFilter';

const App = () => {
    const [products, setProducts] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products'); // Обновите путь к вашему API
                setProducts(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchProducts();
    }, []);

    // Фильтрация и сортировка
    const filteredProducts = products
        .filter(product => product.item_name.toLowerCase().includes(filterText.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'price') {
                return a.price - b.price;
            }
            return a.item_name.localeCompare(b.item_name);
        });

    return (
        <Router>
            <Navbar />
            <ProductFilter filterText={filterText} setFilterText={setFilterText} sortBy={sortBy} setSortBy={setSortBy} />
            <ProductList products={filteredProducts} />
        </Router>
    );
};

export default App;































// import './App.css';
// import {useEffect} from "react";
// import {useTelegram} from "./hooks/useTelegram";
// import Header from "./components/Header/Header";
// import {Route, Routes} from 'react-router-dom'
// import ProductList from "./components/ProductList/ProductList";
// import Form from "./components/Form/Form";

// function App() {
//     const {tg} = useTelegram();

//     useEffect(() => {
//         tg.ready();
//     }, [tg])

//     return (
//         <div className="App">
//             <Header />
//             <Routes>
//                 <Route index element={<ProductList />}/>
//                 <Route path={'form'} element={<Form />}/>
//             </Routes>
//         </div>
//     );
// }

// export default App;