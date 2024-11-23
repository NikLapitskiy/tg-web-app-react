import './App.css';
import { TelegramWebApp } from "react-telegram-webapp";
import { Provider } from "use-http";
import React, { useState, useEffect } from 'react';
// import { useTelegram } from 'telegram-web-app';
import {useTelegram} from './hooks/useTelegram'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
// import Navbar from './components/Navbar/Navbar';
// import BackButton from './components/BackButton/BackButton';
import Cart from './components/Cart/Cart';
import ProductPage from './components/ProductPage/ProductPage';
import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   UserContext as Context,
//   useUserContext as useContext,
// } from "@context/";


// const API_BASE_URL = 'https://effortless-blancmange-d0fc57.netlify.app';


async function validateHash() {
  return true;
}


function App() {
  // const dataUser = useContext();

  // const options = {
  //   cachePolicy: "no-cache",
  //   interceptors: {
  //     request: async ({ options }) => {
  //       options.headers = {
  //         "Content-Type": "application/json",
  //         Authorization: "JWT " + localStorage.getItem("token"),
  //       };
  //       return options;
  //     },
  //     response: (props) => {
  //       if (props.response.status === 401) {
  //         dataUser.data.setIsUser(false);
  //       }
  //       return props.response;
  //     },
  //   },
  // };
    const {tg} = useTelegram();
    let navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      try{

        const handleBackButtonClick = () => {
          navigate(-1);
        };

        if(tg && tg.BackButton){
          tg.BackButton.onClick(handleBackButtonClick);
        }

        if(tg && tg.BackButton){
          tg.BackButton.offClick(handleBackButtonClick);
        }
      } catch (err){
        console.log(err);
      }
    }, [navigate]);
  
    useEffect(() => {
      try{
        if (tg) {
          if (location.pathname === '/') {
            tg.BackButton.hide();
          } else {
            tg.BackButton.show();
          }
        }
      } catch(err){
        console.log(err);
      }
    }, [tg, location.pathname]);

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

    return (
      <TelegramWebApp validateHash={validateHash}>
        <Provider>
            <Routes>
              <Route index element={<Menu />} />
              <Route path="/product/:id" element={<ProductPage  />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
        </Provider>
      </TelegramWebApp>    
    );
}

export default App;