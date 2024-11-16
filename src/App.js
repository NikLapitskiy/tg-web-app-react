import './App.css';
import { useEffect } from 'react';
import {useTelegram} from './hooks/useTelegram'
import {Route, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import Navbar from './components/Navbar/Navbar';


// const API_BASE_URL = 'https://effortless-blancmange-d0fc57.netlify.app';


function App() {
    const {tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [tg])
    return (
          <div className="app">
            <Routes>
              <Route index element={<Menu />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
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