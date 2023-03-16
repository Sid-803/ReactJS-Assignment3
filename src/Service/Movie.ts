import axios from 'axios';
import IMovie from '../Model/MovieList';
import IFavMovie from '../Model/FavoriteMovie';
const baseUrl = 'http://localhost:3000/';
const options = {
	headers: {"content-type": "application/json"}}

const getUpcomingMovie=(data:string)=>{
    return axios.get<IMovie[]>(`${baseUrl}${data}`/*'http://localhost:3000/movies-coming'*/)
    .then(response => response.data)
};

const addToFavMovie = (movie:IMovie) =>{
    return axios.post<IMovie>(`${baseUrl}favorite`, movie)
    .then(response=>response.data)
};
  
const getMovieByTitle = (d:string,s:string)=>{
    return axios.get<IMovie[]>(`${baseUrl}${d}?title=${s}`)
    .then(response=>response.data[0])
}

const getFavoriteMovies = ()=>{
    return axios.get<IMovie[]>(`${baseUrl}favorite`)
    .then(response=>response.data)
}

export {
    getUpcomingMovie,
    addToFavMovie,
    getMovieByTitle,
    getFavoriteMovies
}