import {MouseEvent, useEffect, useState} from 'react';
import { Alert, Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import { getUpcomingMovie } from '../Service/Movie';
import IMovie from '../Model/MovieList';
import { LoadingStatus } from '../Utility/LoadingStatus';
import LoadingIndicator from '../Utility/LoadingIndicator';
import MovieList from './MovieList';
import axios from 'axios';

const HomeHeader = () => {
    let s:string='';
    let p:boolean=false;
    const[active,setActive] = useState<string>('movies-in-theaters');
    const[movieData,setMovieData] = useState<IMovie[]>([]);
    const[status,setStatus] = useState<LoadingStatus>('LOADING');
    const[error,setError] = useState<Error|null>(null);
    
  
    const getMovies = async (data:string)=> {
        try{
            const res = await getUpcomingMovie(data)
            setMovieData(res);
            setStatus('LOADED')
        }catch(error:any){
            setStatus('ERROR_LOADING')
            setError(error)
        }
    }

    const fav = async(str:string)=>{
        await axios.get<IMovie[]>(`http://localhost:3000/${str}`)
        .then((res)=>setMovieData(res.data))
    }

    const handleClick = (event:MouseEvent<HTMLLinkElement>) => {
        //event.preventDefault();
        //setActive(event.currentTarget.id);
        s=event.currentTarget.id;
        console.log(s);
        console.log(event.currentTarget.id);
        if(s==='favorite')
        {
            p=true;
            console.log(p);
            fav(s);
            setStatus('LOADED')
        }else{
            getMovies(s);
        }
        
    }

    useEffect(
        ()=>{
            const fetchMovie= async(data:string)=>{
                
                try{
                    const data = await getUpcomingMovie('movies-in-theaters')
                    setMovieData(data);
                    setStatus('LOADED');
                }catch(error:any){
                    setStatus('ERROR_LOADING')
                    setError(error)
                } 
                
        };
        fetchMovie('movies-in-theaters');
        },
        []
    )
    
    let el;
    switch(status){
        case 'LOADING':
            el=(
                <LoadingIndicator
                size='large'
                message='All movies on the way...'
                />
            );
            break;

        case 'ERROR_LOADING':
                el=(
                  <Alert variant="danger my-5">
                    {error?.message}
                  </Alert>
        
                );
                break;
                
        case 'LOADED':
            el=(
                <>
                <Navbar bg="light" expand="lg">
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav  className="me-auto">
                                    <Nav.Link href=""  id='favorite' onClick={handleClick}>
                                        <FontAwesomeIcon icon={faPizzaSlice} className='me-2 my-'/>
                                            Favorites
                                    </Nav.Link>
                                    <Nav.Link href="" id='movies-coming' onClick={handleClick}>
                                        <FontAwesomeIcon icon={faCalendarCheck} className='me-2 my-'/>
                                             Upcoming
                                     </Nav.Link>
                                    <Nav.Link href="" id='movies-in-theaters' onClick={handleClick}>
                                        <FontAwesomeIcon icon={faCalendarCheck} className='me-2 my-'/>
                                            In Theatres
                                    </Nav.Link>
                                    <Nav.Link href="" id='top-rated-india' onClick={handleClick}>
                                        <FontAwesomeIcon icon={faCalendarCheck} className='me-2 my-'/>
                                            Trending India
                                    </Nav.Link>
                                    <Nav.Link href="" id='top-rated-movies' onClick={handleClick}>
                                        <FontAwesomeIcon icon={faCalendarCheck} className='me-2 my-'/>
                                            Trending World
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                       
                    {(<MovieList movie={movieData} activeState={s}/>)}
                    
                                     
                </> 
            );
            break;
    }
   return (el);
}

export default HomeHeader;