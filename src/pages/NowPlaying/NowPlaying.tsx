import React, {useEffect, useState} from 'react';
import { IMovieResponse } from '../types';
import { getMovie } from '../../services';
import { data } from 'autoprefixer';
import MovieCardMap from '../../components/MovieMap/MovieMap';

const NowPlaying:React.FC = () => {
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorOnRequest, setErrorOnRequest] = useState<boolean>(false);

    const getNowPlayingMovies = async () =>{
        await getMovie("now_playing").then((data) => {
            if(data && data.data)
                console.log(data.data.results);
                setMovies(data.data.results);
        })
        .catch((err) => {
            console.log(err);
            setErrorOnRequest(true)
        });
    };
    
    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
    
        }, 5000);
        getNowPlayingMovies();
        setIsLoading(false)
    }, []);

    return(
        <>
        <h1 className='text-4xl mt-4 mx-8 font-montserrat text-white'>NOW PLAYING</h1>
        <div className='px-5 mx-4'>
            <p className='mt-4 font-poppins text-white text-lg'>Check what movies are playing on theaters right now!</p>
            {isLoading && <div>Loading...</div>}
            {errorOnRequest && <div>Error...</div>}
            {movies?.length > 0 && 
                <MovieCardMap movies={movies}/>
            }
        </div>
        </>
    );
}

export default NowPlaying;