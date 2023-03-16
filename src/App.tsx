import React from 'react';
import HomeHeader from './Component/HomeHeader';
import UpcomingMovieList from './Component/MovieList';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelectMovie from './Component/MovieDetail';


const App = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/:title" element={<SelectMovie/>} />
            <Route path="/" element={<HomeHeader/>} />
            
        </Routes>
        </BrowserRouter>
         
    );
};

export default App;