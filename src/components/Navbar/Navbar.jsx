import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Импортируем стили

const Navbar = () => {
    return (
        <nav>
          <div>
            <Link to="/shop">Магазины</Link>
          </div>
          <div>
            <Link to="/">Меню</Link>
          </div>
          <div>
            <Link to="/settings">Настройки</Link>
          </div>
          <div>
            <Link to="/order">Заказы</Link>
          </div>
          <div>
            <Link to="/profile">Профиль</Link>
          </div>
        </nav>
    );
}

export default Navbar;