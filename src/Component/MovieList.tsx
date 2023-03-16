import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useState, MouseEvent } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import IMovie from '../Model/MovieList';
import { addToFavMovie,getFavoriteMovies } from '../Service/Movie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


type Props ={
    movie:IMovie[],
    activeState:string
}

const MovieList = (props:Props) => {


    const navigate = useNavigate();
    const[fav,setFav] = useState<IMovie[]>([]);
    const[getMovie,setGetMovie] = useState<IMovie>();

    const addToFavorite = async (database:string,title:string) => {
        await axios.get<IMovie[]>(`http://localhost:3000/${database}?title=${title}`)
        .then((res)=>setGetMovie(res.data[0]))
        await addToFavMovie(getMovie);
        setFav(await getFavoriteMovies());
        fav.push(getMovie);
        alert("Successfully added to favorites!");
        
    }

    const handleClickFav = async (event:MouseEvent<HTMLButtonElement>)=>{
        var s:string = event.currentTarget.id;
        var d:string = props.activeState;
        //const check = fav.find((favs)=>favs.title === s);
       // if(check===undefined)
        //{
            addToFavorite(d,s);
        //}else{
           // alert("Already added to favorites");
        //}
    }

    const navigateTo= async (event:MouseEvent<HTMLImageElement>)=>{
        var s:string = event.currentTarget.id;
        var d:string = props.activeState;
        navigate(`${s}`)
        localStorage.setItem("title",s);
        localStorage.setItem("db",d);
        
    }
   
   return (
    <Row xs={1} md={2} lg={4} >
                            {
                               props.movie.map((upComing) => 
                                <Col className="d-flex align-items-stretch my-3">
                                <Card style={{ width: '18rem'}} id={upComing.title} className='mx-4 my-2'>
                                    <Card.Img alt="example" variant="top" src={upComing.posterurl} id={upComing.title} onClick={navigateTo}/>
                                        <Card.Body>
                                            <Card.Title>{upComing.title}</Card.Title>
                                                <Card.Text>
                                                <FontAwesomeIcon icon={faPizzaSlice} className='me-2 my-'/>
                                                        {upComing.genres.map((genre)=>
                                                            <span>{`${genre} `}</span>
                                                        )}
                                                        <hr/>
                                                        <b>Release:</b>
                                                        {` ${upComing.year}`}
                                                        <br/>
                                                        <b>Starring:</b>
                                                        {upComing.actors.map((actor)=>
                                                            <span>{` ${actor} `}</span>
                                                        )}
                                                        <br/>
                                                        <b>IMDB:</b>
                                                        {` ${upComing.imdbRating}`}
            
                                                </Card.Text>
                                                <Button id={upComing.title} variant="primary" onClick={handleClickFav}>
                                                    <FontAwesomeIcon icon={faPizzaSlice} className='me-2 my-'/>
                                                        Add to Favorite
                                                </Button>
                                        </Card.Body>
                                </Card>
                            </Col>
                                )
                            }
                        </Row>
   );
}

export default MovieList;