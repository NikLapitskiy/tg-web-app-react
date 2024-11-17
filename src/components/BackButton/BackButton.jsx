import React from 'react';

const BackButton = () => {
    const handleBackClick = () => {
        // Закрывает текущее окно мини-приложения
        Telegram.WebApp.close();
    };

    return (
        <button className="back-button" onClick={handleBackClick}>
            Назад
        </button>
    );
};

export default BackButton;