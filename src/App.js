import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './components/Menu';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Navigation from './components/Navigation';
import './App.css'

const API_BASE_URL = 'ttps://effortless-blancmange-d0fc57.netlify.app';


function App() {
    const {tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [tg])
    return (
        <Router>
          <div className="app">
            <Switch>
              <Route path="/menu" component={Menu} />
              <Route path="/profile" component={Profile} />
              <Route path="/settings" component={Settings} />
              <Route path="/" component={Menu} />
            </Switch>
            <Navigation />
          </div>
        </Router>
    );
    // return (
    //     <div className="App">
    //         <Header />
    //         <Routes>
    //             <Route index element={<ProductList />}/>
    //             <Route path={'form'} element={<Form />}/>
    //         </Routes>
    //     </div>
    // );
}
  
export default App;































// import './App.css';
// import {useEffect} from "react";
// import {useTelegram} from "./hooks/useTelegram";
// import Header from "./components/Header/Header";
// import {Route, Routes} from 'react-router-dom'
// import ProductList from "./components/ProductList/ProductList";
// import Form from "./components/Form/Form";



// export default App;