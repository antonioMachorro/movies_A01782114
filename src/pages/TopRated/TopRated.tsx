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
        <h1 className='text-4xl mt-4 mx-8 font-montserrat text-white'>TOP RATED</h1>
        <div className='px-5 mx-4'>
            <p className='mt-4 font-poppins text-white text-lg'>These are audience's favorite movies!</p>
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