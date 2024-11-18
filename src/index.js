import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import './App.css';
import BackButton from './components/BackButton/BackButton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
      <Router>
          <BackButton/>
          <App />
      </Router>
  </React.StrictMode>
);