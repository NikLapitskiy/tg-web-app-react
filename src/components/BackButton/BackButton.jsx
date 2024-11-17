import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        // Возвращаемся на предыдущую страницу
        navigate(-1);
    };

    return (
        <button className="back-button" onClick={handleBackClick}>
            Назад
        </button>
    );
};

export default BackButton;