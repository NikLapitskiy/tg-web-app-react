import './App.css';
import { TelegramWebApp } from "react-telegram-webapp";
import React, { useEffect } from 'react';
// import { useTelegram } from 'telegram-web-app';
import {useTelegram} from './hooks/useTelegram'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
// import Navbar from './components/Navbar/Navbar';
import BackButton from './components/BackButton/BackButton';
import Cart from './components/Cart/Cart';
import ProductPage from './components/ProductPage/ProductPage';


// const API_BASE_URL = 'https://effortless-blancmange-d0fc57.netlify.app';
// async function validateHash() {
//   return true;
// }


function App() {
    const {tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [tg])
    return (
      <TelegramWebApp>
            <Routes>
              <Route index element={<Menu />} />
              <Route path="/product/:id" element={<ProductPage  />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
      </TelegramWebApp>    
    );
}

export default App;

              //   <Router>
              //   <div className="app">
              //     <Routes>
              //       <Route index element={<Menu />} />
              //       <Route path="/menu" element={<Menu />} />
              //       <Route path="/profile" element={<Profile />} />
              //       <Route path="/settings" element={<Settings />} />
              //     </Routes>
              //     <Navbar />
              //   </div>
              // </Router>
    // return (
    //     <div className="App">
    //         <Header />
    //         <Routes>
    //             <Route index element={<ProductList />}/>
    //             <Route path={'form'} element={<Form />}/>
    //         </Routes>
    //     </div>
    // );

// import './App.css';
// import {useEffect} from "react";
// import {useTelegram} from "./hooks/useTelegram";
// import Header from "./components/Header/Header";
// import {Route, Routes} from 'react-router-dom'
// import ProductList from "./components/ProductList/ProductList";
// import Form from "./components/Form/Form";



// export default App;