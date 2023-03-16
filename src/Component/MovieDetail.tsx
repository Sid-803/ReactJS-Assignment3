import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import IMovie from '../Model/MovieList';
import { LoadingStatus } from '../Utility/LoadingStatus';

const SelectMovie=()=>{
    
    const[thisMovie,setThisMovie] =useState<IMovie>();
    const[status,setStatus] = useState<LoadingStatus>('LOADING');
    
    useEffect(()=>{
        const loadMovie= async()=>{
            var s:string = localStorage.getItem("title");
            var d:string = localStorage.getItem("db");
           await axios.get<IMovie[]>(`http://localhost:3000/${d}}?title=${s}`)
           .then((res)=>setThisMovie(res.data[0]))
           setStatus('LOADED');
        };loadMovie()  
    },[])

    return(
        <Card style={{ width: '18rem'}} id={thisMovie.title} className='mx-4 my-2'>
                                    <Card.Img variant="top" src={thisMovie.posterurl} id={thisMovie.title} />
                                        <Card.Body>
                                            <Card.Title>{thisMovie.title}</Card.Title>
                                                <Card.Text>
                                                <FontAwesomeIcon icon={faPizzaSlice} className='me-2 my-'/>
                                                        {thisMovie.genres.map((genre)=>
                                                            <span>{`${genre} `}</span>
                                                        )}
                                                        <hr/>
                                                        <b>Release:</b>
                                                        {` ${thisMovie.year}`}
                                                        <br/>
                                                        <b>Starring:</b>
                                                        {thisMovie.actors.map((actor)=>
                                                            <span>{` ${actor} `}</span>
                                                        )}
                                                        <br/>
                                                        <b>IMDB:</b>
                                                        {` ${thisMovie.imdbRating}`}
                                                        <br/>
                                                        {thisMovie.storyline}
            
                                                </Card.Text>
                                        </Card.Body>
                                </Card>
    )
}

export default SelectMovie;