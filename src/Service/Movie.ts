import axios from 'axios';
import { error } from 'console';
import IMovie from '../Model/MovieList';
const baseUrl = 'http://localhost:3000/';
const options = {
	headers: {"content-type": "application/json"}}

const getMovieList=(data:string)=>{
    return axios.get<IMovie[]>(`${baseUrl}${data}`)
    .then(response => response.data)
};

const addToFavMovie = (movie:Omit<IMovie,'id'>) =>{
    return axios.post<IMovie>(`${baseUrl}favorite`, movie)
    .then(response=>response.data)
    .catch((error)=>console.log(error));
};
  
const getMovieByTitle = (d:string|null,s:string|null)=>{
    return axios.get<IMovie[]>(`${baseUrl}${d}?title=${s}`)
    .then(response=>response.data[0])
    .catch((error)=>console.log(error));
}

const getFavoriteMovies = (s:string)=>{
    return axios.get<IMovie[]>(`${baseUrl}favorite?title=${s}`)
    .then(response=>response.data[0])
}

const deleteFavoriteMovies = (s:string)=>{
    return axios.delete<IMovie>(`${baseUrl}favorite/${s}`)
    .then(response=>response.data)
}

export {
    getMovieList,
    addToFavMovie,
    getMovieByTitle,
    getFavoriteMovies,
    deleteFavoriteMovies
}