import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShowAllCoctails from './components/coctails'
import CoctailSpecificInfo from "./components/coctailSpecificInfo";
import GlobalContextProvider from "./globalFunctions";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <GlobalContextProvider>
        <App />
    </GlobalContextProvider>


);

