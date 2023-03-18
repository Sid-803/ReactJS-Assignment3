import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeHeader from './Route-Page/HomeHeader';
import './App.css';
import SelectMovie from './Route-Page/SelectMovie';


const App = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/:title" element={<SelectMovie/>}/>
            <Route path="/" element={<HomeHeader/>} />
        </Routes>
        </BrowserRouter>
         
    );
};

export default App;