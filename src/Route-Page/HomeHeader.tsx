import {MouseEvent, useEffect, useState} from 'react';
import { Alert, Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import { getMovieList} from '../Service/Movie';
import IMovie from '../Model/MovieList';
import { LoadingStatus } from '../Utility/LoadingStatus';
import LoadingIndicator from '../Utility/LoadingIndicator';
import MovieList from '../Component/MovieList';

const HomeHeader = () => {
    let s:string='';
    //const[activeTab, setActiveTab] = useState<string>('movies-coming');
    const[movies,setMovies] = useState<IMovie[]>([]);
    const[status,setStatus] = useState<LoadingStatus>('LOADING');
    const[error,setError] = useState<Error|null>(null);

    useEffect(
        ()=>{
            const fetchMovie= async(data:string)=>{
                try{
                    const data = await getMovieList('favorite')
                    setMovies(data);
                }catch(error:any){
                    setStatus('ERROR_LOADING')
                    setError(error)
                }finally{
                    setStatus('LOADED');
                } 
                
        };
        fetchMovie('favorite');
        },
        []
    )

    const handleClick = async (event:MouseEvent<HTMLLinkElement>)=>{
        setStatus('LOADING')
        s=event.currentTarget.id;
        console.log(s);
        //setActiveTab(event.currentTarget.id)
        try{
            const data = await getMovieList(event.currentTarget.id);
            setMovies(data)
        }catch(error:any){
            setStatus('ERROR_LOADING')
            setError(error)
        }finally{
            setStatus('LOADED');
        }
        localStorage.setItem('db',s); 
    }

    
    let el;
    switch(status){
        case 'LOADING':
            el=(
                <LoadingIndicator
                size='large'
                message='Movies on the way...'
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
                {(<Navbar bg="light" expand="lg" id='navbar' sticky='top'>
                        <Container>
                        <Navbar.Brand><FontAwesomeIcon icon={faFilm}/> Movies</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav variant='tabs' className="me-auto">
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
                                    <Nav.Link href=""  id='favorite' onClick={handleClick} className='d-flex me-2'>
                                        <FontAwesomeIcon icon={faPizzaSlice} className='me-2 my-'/>
                                            Favorites
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>)}
                    {(<MovieList movie={movies} activeState={s} />)}             
                </> 
            );
            break;
    }
   return (el);
}

export default HomeHeader;