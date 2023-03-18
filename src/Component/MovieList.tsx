import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useState, MouseEvent, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import IMovie from '../Model/MovieList';
import { addToFavMovie,deleteFavoriteMovies, getMovieByTitle } from '../Service/Movie';
import { useNavigate } from 'react-router-dom';



type Props ={
    movie:IMovie[],
    activeState:string
}

const MovieList = (props:Props) => {
    const {movie, activeState}= props;
    let s:string|null='';
    let moviesInstance:IMovie|void = undefined;
    
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const[error,setError] = useState<Error|null>(null);
    const navigate = useNavigate();
 
    useEffect(()=>{
        const buttonDecide = () => {
            s = localStorage.getItem('db');
            if(s ==='favorite')
            {
                setIsFavorite(true);
            }
            //localStorage.removeItem('db');
        };
        buttonDecide();      
    },)

    const clickHandler= async(event:MouseEvent<HTMLButtonElement>)=>{   
        try{ 
            const data:IMovie|void = await getMovieByTitle(s,event.currentTarget.id);
            moviesInstance=data;

            if(moviesInstance === undefined){
                alert("Movie is not added to Favorites, Try again!")
            }else{
                addToFavMovie(moviesInstance);
                alert("Yay! Movie is added to favorites. Visit Favorites tab to see movie");
            }
        }catch(error:any){
            setError(error);
            console.log(error);
        }   
    }

    const removeClick= async(event:MouseEvent<HTMLButtonElement>)=>{   
          deleteFavoriteMovies(event.currentTarget.id);
          alert("Movie is successfully removed from Favorites!")
          //navigate("/");
          window.location.reload(false);
          
    }

    const selectMovie =(event:MouseEvent<HTMLImageElement>)=>{
        localStorage.setItem('database',s);
        localStorage.setItem('title',event.currentTarget.id);
        navigate(`${event.currentTarget.id}`)
    }

    return(
                <Row xs={1} md={2} lg={4} >
                    {
                        movie.map((upComing) => 
                        <Col className="d-flex align-items-stretch my-3">
                            <Card style={{ width: '18rem'}} id={upComing.title} className='mx-4 my-2'>
                                <Card.Img alt="example" variant="top" src={upComing.posterurl} id={upComing.title} onClick={selectMovie} itemType='link'/>
                                    <Card.Body className='d-flex flex-column'>
                                        <Card.Title>{upComing.title}</Card.Title>
                                            <Card.Text>
                                            <FontAwesomeIcon icon={faPizzaSlice} className='me-2 my-'/>
                                                    {upComing.genres.map((genre)=>genre).join(' | ')}
                                                    <hr/>
                                                    <b>Release:</b>
                                                    {` ${upComing.year}`}
                                                    <br/>
                                                    <b>Starring: </b>
                                                    {upComing.actors.map((actor)=>actor).join(", ")}
                                                    <br/>
                                                    <b>IMDB:</b>
                                                    {` ${upComing.imdbRating}`}
        
                                            </Card.Text>
                                            <Button className='mt-auto' id={isFavorite? upComing.id:upComing.title} variant="primary" onClick={isFavorite? removeClick:clickHandler }>
                                                  {isFavorite ? 'Remove Favorite': 'Add Favorite'}
                                            </Button> 
                                    </Card.Body>
                                    
                            </Card>
                        </Col>
                        )       
                    }       
                </Row>
            )          
}

export default MovieList;

