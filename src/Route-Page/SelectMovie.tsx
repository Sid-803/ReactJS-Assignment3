import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import IMovie from '../Model/MovieList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SelectMovie =()=>{
    const navigate = useNavigate();
    const[moviesL,setMoviesL] = useState<IMovie[]>([]);
    let movies:IMovie|void = undefined;
    const[render,setRender]= useState<boolean>(false);

    useEffect(()=>{
        const getTheMovie = async() =>{
            try{
            const data:IMovie|void = await axios.get<IMovie[]>(`http://localhost:3000/${localStorage.getItem('database')}?title=${localStorage.getItem('title')}`).then((res)=>res.data[0]);
           movies=data;
           moviesL.push(movies);
           console.log(localStorage.getItem('database'));
            }catch(error:any){
                console.log(error);
            }
           setRender(true);
        };getTheMovie()
    });
    
    return( 
       <Row xs={1} md={2} lg={4} >
                    {   
                        moviesL.map((movie)=>
                        <Col className="d-flex align-items-stretch my-3">
                            <Card style={{ width: '18rem'}} id={movie.title} className='mx-4 my-2'>
                                <Card.Img alt="example" variant="top" src={movie.posterurl} id={movie.title}/>
                                    <Card.Body className='d-flex flex-column'>
                                        <Card.Title>{movie.title}</Card.Title>
                                            <Card.Text>
                                            <FontAwesomeIcon icon={faPizzaSlice} className='me-2 my-'/>
                                                    {movie.genres.map((genre)=>
                                                        <span>{`${genre} `}</span>
                                                    )}
                                                    <hr/>
                                                    <b>Release:</b>
                                                    {` ${movie.year}`}
                                                    <br/>
                                                    <b>Starring: </b>
                                                    {movie.actors.map((act)=>act).join(" ,")}
                                                    <br/>
                                                    <b>Duration: </b>
                                                    {movie.duration}
                                                    <br/>
                                                    <b>IMDB:</b>
                                                    {` ${movie.imdbRating}`}
                                                    <br/>
                                                    <b>Description: </b>
                                                    {movie.storyline}
        
                                            </Card.Text>
                                            <Button className='mt-auto' id='home' variant="primary" onClick={()=>navigate('/')}>
                                                  Back to Home
                                            </Button>
                                    </Card.Body>
                            </Card>
                        </Col>
                        )   
                    }       
                </Row>
    )
}

export default SelectMovie;