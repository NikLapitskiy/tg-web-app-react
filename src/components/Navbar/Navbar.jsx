import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Импортируем стили

const Navbar = () => {
    return (
        <nav>
          <Link to="/profile">Профиль</Link>
          <Link to="/menu">Меню</Link>
          <Link to="/settings">Настройки</Link>
        </nav>
    );
}

export default Navbar;