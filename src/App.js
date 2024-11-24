import './App.css';
import { TelegramWebApp } from "react-telegram-webapp";
import React, { useEffect } from 'react';
import {useTelegram} from './hooks/useTelegram'
import {Route, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import BackButton from './components/BackButton/BackButton';
import Cart from './components/Cart/Cart';
import ProductPage from './components/ProductPage/ProductPage';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';


// const API_BASE_URL = 'https://effortless-blancmange-d0fc57.netlify.app';


async function validateHash() {
  return true;
}


function App() {

  const navigate = useNavigate();
    const {tg} = useTelegram();

    // const backButton = Telegram.WebApp.BackButton;

    // if (window.location.search && window.location.pathname !== '/') {
    //   backButton.show();
    // } else {
    //   backButton.hide(); 
    // }

    // backButton.onClick(() => {
    //   navigate(-1);
    // });

    useEffect(() => {
      if (tg) {
        try {
          tg.ready();
        } catch (error) {
          console.error('Error calling tgwebApp:', error);
        }
    } else {
        console.log('Не в Telegram.');
    }
    }, [tg])

    useEffect(() => {
      if (tg && typeof tg.requestFullscreen === 'function') {
          try {
            tg.requestFullscreen();
          } catch (error) {
            console.error('Error calling requestFullscreen:', error);
          }
      } else {
          console.log('Не в Telegram или метод requestFullscreen не поддерживается.');
      }
  }, [tg]);

  const handleBackClick = () => {
    navigate(-1); 
  }

    return (
      <TelegramWebApp validateHash={validateHash}>
        <BackButton onClick={handleBackClick}/>
          <Routes>
            <Route index element={<Menu />} />
            <Route path="/product/:id" element={<ProductPage  />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Navbar/>
      </TelegramWebApp>    
    );
}

export default App;