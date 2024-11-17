import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Импортируем стили

const Navbar = () => {
    return (
        <nav>
          <div>
            <Link to="/profile">Профиль</Link>
          </div>
          <div>
            <Link to="/menu">Меню</Link>
          </div>
          <div>
            <Link to="/settings">Настройки</Link>
          </div>
        </nav>
    );
}

export default Navbar;