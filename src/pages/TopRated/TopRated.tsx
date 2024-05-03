import React, {useEffect, useState} from 'react';
import { IMovieResponse } from '../types';
import { getMovie } from '../../services';
import MovieCardMap from '../../components/MovieMap/MovieMap';

const TopRated:React.FC = () => {
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorOnRequest, setErrorOnRequest] = useState<boolean>(false);

    const getTopRatedMovies = async () => {
        await getMovie("top_rated").then((data) => {
            if(data && data.data)
                console.log(data.data.results);
                setMovies(data.data.results);
        })
        .catch((err) => {
            console.log(err);
            setErrorOnRequest(true)
        })
    };

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
    
        }, 5000);
        getTopRatedMovies();
        setIsLoading(false)
    }, []);

    return(
        <>
        <h1 className='text-3xl px-4 m-4'>TOP RATED</h1>
        <div className='px-5'>
        {isLoading && <div>Loading...</div>}
        {errorOnRequest && <div>Error...</div>}
        {movies?.length > 0 && 
            <MovieCardMap movies={movies}/>
        }
        </div>
        </>
    );
}

export default TopRated;