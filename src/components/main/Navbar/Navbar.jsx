import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Импортируем стили

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/about">О нас</Link></li>
                {/* Добавьте другие ссылки, если необходимо */}
            </ul>
        </nav>
    );
};

export default Navbar;